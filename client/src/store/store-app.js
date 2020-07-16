import _ from 'lodash';

export const NAV_EVENTS = {
  TOGGLE_DRAWER: 'wlc.nav.toggle-drawer',
  UPDATE_DIALOG: 'wlc.nav.toggle-dialog',
  DELETE_DIALOG: 'wlc.nav.delete-dialog',
  UPDATE_FORM_VALUE: 'wlc.nav.update-form-value',
  UPDATE_FORM_VALUES: 'wlc.nav.update-form-values',
  CLEAR_FORM_VALUES: 'wlc.nav.clear-form-values',
}

export const update_form_value = (dispatch, data) => {
  const { form_id, field, value } = data;
  dispatch({
    type: NAV_EVENTS.UPDATE_FORM_VALUE,
    payload: { form_id, field, value }
  })
}

export const update_form_values = (dispatch, form_id, data) => {
  dispatch({
    type: NAV_EVENTS.UPDATE_FORM_VALUES,
    payload: { form_id, data }
  })
}

export const clear_form_values = (dispatch, form_id) => {
  dispatch({
    type: NAV_EVENTS.CLEAR_FORM_VALUES,
    payload: form_id
  })
}

export const toggle_drawer = (dispatch, open) => {
  dispatch({
    type: NAV_EVENTS.TOGGLE_DRAWER,
    payload: !open,
  });
}

export const create_dialog = (dispatch, name, data) => {
  dispatch({
    type: NAV_EVENTS.UPDATE_DIALOG,
    payload: { name, data }
  });
}

export const toggle_dialog = (dispatch, name, data) => {
  data.open = !data.open;
  dispatch({
    type: NAV_EVENTS.UPDATE_DIALOG,
    payload: { name, data }
  });
}

export const delete_dialog = (dispatch, name) => {
  dispatch({
    type: NAV_EVENTS.DELETE_DIALOG,
    payload: { name }
  });
}

const INITIAL_STATE = {
  nav: {
    drawer_open: true,
  },
  dialogs: {},
  forms: {},
};

function reduce(state = {}, action = {}) {
  const new_state = arguments.length <= 0 || arguments[0] === undefined ? INITIAL_STATE : { ...arguments[0] };
  let form_id, data;
  switch (action.type) {
    case NAV_EVENTS.TOGGLE_DRAWER:
      new_state.nav = { ...new_state.nav,
        drawer_open: action.payload,
      }
    break;
    case NAV_EVENTS.UPDATE_DIALOG:
      new_state.dialogs = { ...new_state.dialog, [action.payload.name]: action.payload.data };
    break;
    case NAV_EVENTS.DELETE_DIALOG:
      new_state.dialogs = { ...new_state.dialog };
      delete new_state.dialogs[action.payload.name];
    break;
    case NAV_EVENTS.UPDATE_FORM_VALUE:
      form_id = action.payload.form_id;
      new_state.forms = {...new_state.forms,
        [form_id]: { ...new_state.forms[form_id],
          [action.payload.field]: action.payload.value
        }
      }
    break;
    case NAV_EVENTS.UPDATE_FORM_VALUES:
      form_id = action.payload.form_id;
      data = action.payload.data;
      new_state.forms = { ...new_state.forms, [form_id]: data };
    break;
    case NAV_EVENTS.CLEAR_FORM_VALUES:
      delete new_state.forms[action.payload.form_id];
    break;

    default:;
  }
  return new_state;
}

export default function reduceWrapper(state, action) {
    var rv = reduce(state, action);
    return rv === state ? state : _.defaults(rv, state);
}
