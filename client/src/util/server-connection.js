import axios from 'axios';
import moment from 'moment';
import ls from 'local-storage';

import { get_logger } from './logger';

const trace = get_logger('SERVER_CONNECTION');

export const local_time = (str) => {
  return new Date(moment.utc(str).local().toDate().getTime());
};

export const URI_BASE = process.env.REACT_APP_TEXT_LOBBY_SERVER;

const srvr = axios.create({
  baseURL: URI_BASE,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

const CONNECTION = {
  csrf: false,
  user: ls.get('user'),
};

const get_stored_user = () => CONNECTION.user;
const set_stored_user = (user) => { trace.log('set_stored_user called');
  if (!user) return false;
  ls.set('user', user);
  CONNECTION.user = user;
  return user;
}
export const clear_user = (data) => { trace.log('clean_user called');
  ls.set('user', null);
  CONNECTION.user = null;
  return data;
};

const API = {
  csrf: () => `${URI_BASE}/sanctum/csrf-cookie`,
  register: () => `${URI_BASE}/api/register`,
  forgot_password: () => `${URI_BASE}/api/forgot-password`,
  reset_password: (token) => `${URI_BASE}/api/reset-password/${token}`,
  login: () => `${URI_BASE}/api/login`,
  auth_google_url: () => `${URI_BASE}/api/auth/google/url`,
  auth_google_callback: (params) => `${URI_BASE}/api/auth/google/callback${params}`,
  logout: () => `${URI_BASE}/api/logout`,
  user: () => `${URI_BASE}/api/user`,
  update_profile: () => `${URI_BASE}/api/user`,
};

export const get_csrf_token = () => { trace.log('get_csrf_token called');
  return srvr.get(API.csrf())
    .then(r => {
      CONNECTION.csrf = true;
      return get_stored_user();
    })
    .catch((e) => { console.error(e); CONNECTION.csrf = false; });
}

export const register_user = (data) => { trace.log('register_user called');
  return srvr.post(API.register(), data).then(response => {
    return set_stored_user(response.data);
  });
}

export const forgot_password = (data) => srvr.post(API.forgot_password(), data);
export const validate_password_reset_token = (token) => srvr.get(API.reset_password(token));

export const reset_password = (data) => { trace.log('reset_password called');
  return srvr.post(API.reset_password(data.token), data).then(response => {
    return set_stored_user(response.data);
  });
}

export const login = (email, password) => { trace.log('login called');
  return srvr.post(API.login(), {email, password}).then(response => {
    return set_stored_user(response.data);
  });
}

export const auth_google_url = () => srvr.get(API.auth_google_url());
export const auth_google_callback = (params) => { trace.log('login called');
  return srvr.get(API.auth_google_callback(params)).then(response => {
    return set_stored_user(response.data.user);
  });
}

export const logout = (data) => { trace.log('logout called');
  return srvr.post(API.logout(), data)
    .then(response => clear_user(response.data))
    .catch(e=> clear_user(e));
}

// currently unused
export const get_user_data = () => srvr.get(API.user()).then(response => {
  return set_stored_user(response.data);
});

export const update_profile = (data) => {
  return srvr.post(API.update_profile(), data).then(response => {
    return set_stored_user(response.data);
  });
}
