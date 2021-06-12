enum LOGLEVEL {
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

const configuredLevel = parseInt(`${process.env.NEXTAPM_LOG_LEVEL}`, 10) || 1;

const log = (level: LOGLEVEL, msg: string, obj: any) => {
  if (configuredLevel <= level) {
    const logMsg = `[${LOGLEVEL[level]}] ${msg}`;
    const data = obj instanceof Error ? obj : JSON.stringify(obj) || '';
    // tslint:disable-next-line:no-console
    console.log(logMsg, data);
  }
};

const debug = (msg: string, data?: any) => {
  log(LOGLEVEL.DEBUG, msg, data);
};

const info = (msg: string, data?: any) => {
  log(LOGLEVEL.INFO, msg, data);
};

const warn = (msg: string, data?: any) => {
  log(LOGLEVEL.WARN, msg, data);
};

const error = (msg: string, e?: Error) => {
  log(LOGLEVEL.ERROR, msg, e);
};

export default {
  debug,
  info,
  warn,
  error,
};
