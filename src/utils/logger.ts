import chalk from 'chalk';

export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export const log = (message: string, level: LogLevel = LogLevel.INFO) => {
  const timestamp = new Date().toISOString();
  let formattedMessage = `[${timestamp}] ${message}`;

  switch (level) {
    case LogLevel.INFO:
      formattedMessage = chalk.blue(formattedMessage);
      break;
    case LogLevel.WARN:
      formattedMessage = chalk.yellow(formattedMessage);
      break;
    case LogLevel.ERROR:
      formattedMessage = chalk.red(formattedMessage);
      break;
    default:
      break;
  }

  if ([LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR].includes(level)) {
    console[level](formattedMessage);
  }
};
