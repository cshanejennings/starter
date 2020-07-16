import _ from 'lodash';
import {
  get_csrf_token,
  login,
  auth_google_url,
  auth_google_callback,
  logout,
  clear_user,
  register_user,
  update_profile,
  forgot_password,
  validate_password_reset_token,
  reset_password,
} from '../util/server-connection';

import { get_logger } from '../util/logger';

import {
  create_user_model,
  user_store_initial_state,
} from '../models/User';

import {
  user_connection_store_initial_state,
} from '../models/Connection';

const trace = get_logger('STORE_USER');

const USER_EVENTS = {
  SERVER_CONNECTED: 'textlobby.user_events.server_connected',
  LOGGED_IN: 'textlobby.user_events.logged_in',
  LOGGED_OUT: 'textlobby.user_events.logged_out',
  USER_LOGGING_IN: 'textlobby.user_events.user_logging_in',
  USER_UPDATING: 'textlobby.user_events.user_updating',
  USER_UPDATED: 'textlobby.user_events.user_updated',
  LOGIN_FAILURE: 'textlobby.user_events.user_login_failure',
  REGISTRATION_FAILURE: 'textlobby.user_events.user_login_failure',
  CLEAR_UPDATE: 'textlobby.user_events.clear_update',
};

const OATH_EVENTS = {
  GOOGLE_REDIRECTING: 'textlobby.oath_events.google-redirecting',
}

const PASSWORD_EVENT = {
  RESET_REQUEST_SENDING: 'textlobby.password_event.reset-request-sending',
  RESET_REQUEST_SENT: 'textlobby.password_event.reset-request-sent',
  RESET_REQUEST_FAILED: 'textlobby.password_event.reset-request-sent',
  TOKEN_VALIDATING: 'textlobby.password_event.token-validating',
  TOKEN_INVALID: 'textlobby.password_event.token-invalid',
  TOKEN_VALIDATED: 'textlobby.password_event.token-validated',
  RESETTING_PASSWORD: 'textlobby.password_event.resetting-password',
  PASSWORD_RESET_FAILED: 'textlobby.password_event.password-reset-failed',
}

export const clear_update = (dispatch) => {
  setTimeout(()=> dispatch({ type: USER_EVENTS.CLEAR_UPDATE } ), 0);
}

export const initialize = (store) => {
  trace.log('initialize called');
  get_csrf_token().then((user)=> (user)
    ? store.dispatch(create_login_action(user))
    : store.dispatch({ type: USER_EVENTS.SERVER_CONNECTED })
  ).catch(e => console.error(e));
}

//TODO: Add types of registration failures
export const register_new_user = (dispatch, data) => {
  trace.log('register_new_user called');
  register_user(data).then(new_user => {
      dispatch(create_login_action(new_user));
  }).catch(e => {
    clear_user();
    dispatch({
      type: USER_EVENTS.REGISTRATION_FAILURE,
      payload: {
        msg: 'TODO: Create customized registration error'
      }
    });
  });
}

export const submit_forgot_password = (dispatch, email) => {
  trace.log('submit_forgot_password called');
  setTimeout(()=> dispatch({ type: PASSWORD_EVENT.RESET_REQUEST_SENDING } ), 0);
  forgot_password({email}).then(response => dispatch({
    type: PASSWORD_EVENT.RESET_REQUEST_SENT,
    payload: response.data.message
  })).catch(e => dispatch({
    type: PASSWORD_EVENT.RESET_REQUEST_FAILED,
    payload: e.response.data.error
  }));
}

export const check_pw_validation_token = (dispatch, data) => {
  trace.log('check_pw_validation_token called');
  setTimeout(()=> dispatch({ type: PASSWORD_EVENT.TOKEN_VALIDATING } ), 0);
  validate_password_reset_token(data).then(response => {
    const minutes = Math.round(response.data.remaining / 60);
    dispatch({ type: PASSWORD_EVENT.TOKEN_VALIDATED,
      payload: {
        remaining: `You have ${minutes} minutes to reset your password`,
        email: response.data.email,
      }
    });
  }).catch(e => dispatch({
    type: PASSWORD_EVENT.TOKEN_INVALID,
    payload: e.response.data.error
  }));
}

export const submit_reset_password = (dispatch, data) => {
  trace.log('submit_reset_password called');
  setTimeout(()=> dispatch({ type: PASSWORD_EVENT.RESET_REQUEST_SENDING } ), 0);
  reset_password(data).then(response => dispatch(create_login_action(response.data))
  ).catch(e => {
    console.error(e);
    dispatch({ type: PASSWORD_EVENT.PASSWORD_RESET_FAILED });
  })
}

export const create_login_action = (dto) => {
  trace.log('create_login_action called');
  return {
    type: USER_EVENTS.LOGGED_IN,
    payload: create_user_model(dto),
  }
}

export const login_failure = (dispatch, msg) => {
  trace.log('login_failure called');
  clear_user();
  dispatch({
    type: USER_EVENTS.LOGIN_FAILURE,
    payload: { msg }
  });
}

export const server_login = (dispatch, data) => {
  trace.log('server_login called');
  const {email, password} = data;
  login(email, password).then(response => {
    dispatch(create_login_action(response));
  }).catch(e => {
    clear_user();
    dispatch({
      type: USER_EVENTS.LOGIN_FAILURE,
      payload: {
        msg: 'The user / password combination you used does not exist.'
      }
    });
  });
}

export const api_auth_google_url = (dispatch) => {
  trace.log('api_auth_google_url called');
  auth_google_url().then(response => dispatch({
      type: OATH_EVENTS.GOOGLE_REDIRECTING,
      payload: response.data.url,
  })).catch(e => dispatch({
      type: USER_EVENTS.LOGIN_FAILURE,
      payload: { msg: 'Could not establish connection with server' }
  }));
}

export const api_auth_google_callback = (dispatch, data) => {
  trace.log('api_auth_google_callback called');
  auth_google_callback(data).then(user => dispatch(create_login_action(user))
  ).catch(e => {
    trace.error(e.response.data.message, e);
    dispatch({
      type: USER_EVENTS.LOGIN_FAILURE,
      payload: { msg: 'Could not establish connection with google' }
    });
  });
}

export const server_logout = (dispatch, data) => {
  trace.log('server_logout called');
  logout(data).then(resp => dispatch({
    type: USER_EVENTS.LOGGED_OUT
  })).catch( e => { console.error(e); return dispatch({
    type: USER_EVENTS.LOGGED_OUT
  })});
}

export const update_user_profile = (dispatch, data) => {
  trace.log('update_user_profile called');
  setTimeout(()=> dispatch({ type: USER_EVENTS.USER_UPDATING } ), 0);
  update_profile(data).then(user => dispatch({
      type: USER_EVENTS.USER_UPDATED,
      payload: create_user_model(user)
  })).catch(e => {
    clear_user();
    login_failure(dispatch, "The server disconnected, please log in again.")
  });
}

export const user_loaded = (data, dispatch, queue = []) => {
  trace.log('user_loaded called');
  const { account } = data.user;
  if (!account.email && !queue.length) {
    queue.push('Connecting to Server...');
  }
  return queue;
}

const INITIAL_STATE = {
  connection:{ ...user_connection_store_initial_state },
  account: { ...user_store_initial_state }
};


const response_reducer = (resp) => {
  return (obj, key) => {
    return {...obj, [key]: resp[key] };
  }
}

function reduce(state = {}, action = {}) {
  state = arguments.length <= 0 || arguments[0] === undefined ? INITIAL_STATE : arguments[0];
  const new_state = { ...state };
  switch (action.type) {
    case USER_EVENTS.CLEAR_UPDATE:
    trace.log('USER_EVENTS.CLEAR_UPDATE');
      new_state.connection.updating = false;
      new_state.connection.update_msg = '';
    break;
    case USER_EVENTS.SERVER_CONNECTED:
      trace.log('USER_EVENTS.SERVER_CONNECTED');
      new_state.connection = {...INITIAL_STATE.connection,
        initialized: true,
      };
    break;
    case USER_EVENTS.LOGGING_IN:
      trace.log('USER_EVENTS.LOGGING_IN');
      new_state.connection = {...INITIAL_STATE.connection,
        initialized: true,
        authorizing: true,
      };
    break;
    case USER_EVENTS.LOGIN_FAILURE:
      trace.log('USER_EVENTS.LOGIN_FAILURE');
      clear_user();
      new_state.account = {...INITIAL_STATE.account }
      new_state.connection = {...INITIAL_STATE.connection,
        initialized: true,
        error_msg: action.payload.msg,
      };
    break;
    case USER_EVENTS.LOGGED_IN:
      trace.log('USER_EVENTS.LOGGED_IN', action.payload);
      const account_keys = Object.keys(INITIAL_STATE.account);
      const account_reducer = response_reducer(action.payload);
      new_state.account = account_keys.reduce(account_reducer, {});
      new_state.connection = {...INITIAL_STATE.connection,
        initialized: true,
        signed_in: true,
        email: action.payload.email
      };
    break;
    case USER_EVENTS.USER_UPDATING:
      trace.log('USER_EVENTS.USER_UPDATING');
      new_state.connection.updating = true;
    break;
    case USER_EVENTS.USER_UPDATED:
      trace.log('USER_EVENTS.USER_UPDATED');
      new_state.account = action.payload;
      new_state.connection.updating = false;
    break;
    case USER_EVENTS.LOGGED_OUT:
    trace.log('USER_EVENTS.LOGGED_OUT');
      new_state.connection = {...INITIAL_STATE.connection,
        initialized: true,
      };
      new_state.account = {...INITIAL_STATE.account};
    break;
    case PASSWORD_EVENT.RESET_REQUEST_SENDING:
      trace.log('implement PASSWORD_EVENT.RESET_REQUEST_SENDING');
      new_state.connection.updating = true;
      new_state.connection.update_msg = '';

    break;
    case PASSWORD_EVENT.RESET_REQUEST_SENT:
      trace.log('implement PASSWORD_EVENT.RESET_REQUEST_SENT');
      new_state.connection.updating = false;
      new_state.connection.update_msg = action.payload;

    break;
    case PASSWORD_EVENT.RESET_REQUEST_FAILED:
      trace.log('implement PASSWORD_EVENT.RESET_REQUEST_FAILED');
      new_state.connection.updating = false;
      new_state.connection.error_msg = action.payload;
    break;
    case PASSWORD_EVENT.TOKEN_VALIDATING:
      trace.log('implement PASSWORD_EVENT.TOKEN_VALIDATING');
      new_state.connection.updating = true;
      new_state.connection.update_msg = '';
    break;
    case PASSWORD_EVENT.TOKEN_INVALID:
      trace.log('implement PASSWORD_EVENT.TOKEN_INVALID');
      new_state.connection.updating = false;
      new_state.connection.error_msg = action.payload;
    break;
    case PASSWORD_EVENT.TOKEN_VALIDATED:
      trace.log('implement PASSWORD_EVENT.TOKEN_VALIDATED');
      new_state.connection.updating = false;
      new_state.connection.update_msg = action.payload.remaining;
      new_state.connection.email = action.payload.email;
    break;
    case PASSWORD_EVENT.RESETTING_PASSWORD:
      trace.log('implement PASSWORD_EVENT.RESETTING_PASSWORD');
      new_state.connection.updating = false;
      new_state.connection.update_msg = action.payload.remaining;
    break;
    case PASSWORD_EVENT.PASSWORD_RESET_FAILED:
      trace.warn('implement PASSWORD_EVENT.PASSWORD_RESET_FAILED');
    break;
    case OATH_EVENTS.GOOGLE_REDIRECTING:
      trace.log('OATH_EVENTS.GOOGLE_REDIRECTING');
      new_state.connection.oath.google = action.payload;
    break;
    default:
  }
  return new_state;
}

export default function reduceWrapper(state, action) {
    var rv = reduce(state, action);
    return rv === state ? state : _.defaults(rv, state);
}
