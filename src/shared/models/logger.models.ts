import { Level } from 'pino';

export enum LogLevel {
  INFO = 'info',
  ERRROR = 'error',
  SUCCESS = 'success',
  FATAL = 'fatal',
  DEBUG = 'debug',
  WARN = 'warn',
  TRACE = 'trace'
}

export interface LoggerConfig {
  logLevel?: Level;
  redact?: string[];
}
