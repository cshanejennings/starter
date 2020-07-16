const NAMESPACE = {
  STORE_USER: false,
  SERVER_CONNECTION: false,
}


export const get_logger = (ns) => {
  return {
    log: (msg) => (NAMESPACE[ns]) ? console.log(msg) : '',
    warn: (msg) => (NAMESPACE[ns]) ? console.warn(msg) : '',
    error: (msg) => (NAMESPACE[ns]) ? console.error(msg) : '',
  }
}
