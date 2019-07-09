//@flow
import * as JsLogger from 'js-logger';

export type LogLevelObject = {value: number, name: string};
export type LogLevelType = {[level: string]: LogLevelObject};

const LogLevel: LogLevelType = {
  DEBUG: JsLogger.DEBUG,
  INFO: JsLogger.INFO,
  TIME: JsLogger.TIME,
  WARN: JsLogger.WARN,
  ERROR: JsLogger.ERROR,
  OFF: JsLogger.OFF
};

// TODO sakal check why not using playkit-js logger
JsLogger.useDefaults({defaultLevel: JsLogger.ERROR});

/**
 * sets the logger handler
 * @param {LogHandlerType} handler - the log level
 * @returns {void}
 */
function setLogHandler(handler: LogHandlerType): void {
  JsLogger.setHandler((messages, context) => handler(messages, context));
}
/**
 * get a logger
 * @param {?string} name - the logger name
 * @returns {Object} - the logger class
 */
function getLogger(name?: string): Object {
  if (!name) {
    return JsLogger;
  }
  return JsLogger.get(name);
}

/**
 * get the log level
 * @param {?string} name - the logger name
 * @returns {LogLevelObject} - the log level
 */
function getLogLevel(name?: string): LogLevelObject {
  return getLogger(name).getLevel();
}

/**
 * sets the logger level
 * @param {LogLevelObject} level - the log level
 * @param {?string} name - the logger name
 * @returns {void}
 */
function setLogLevel(level: LogLevelObject, name?: string): void {
  getLogger(name).setLevel(level);
}

export default getLogger;
export {LogLevel, getLogLevel, setLogLevel, setLogHandler};
