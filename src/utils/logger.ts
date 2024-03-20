import pino, { Level, Logger as PinoLogger, stdSerializers } from 'pino';
import { LoggerConfig, LogLevel } from '../shared';

export class Logger {
  private readonly logger: PinoLogger;

  constructor(
    private readonly options: LoggerConfig = {},
  ) {
    this.logger = pino({
      timestamp: () => `, [Time: ${new Date(Date.now()).toISOString()}]`,
      level: options.logLevel || LogLevel.INFO,
      base: null,
      formatters: {
        level: (l) => ({ level: l.toUpperCase() }),
      },
      redact: options.redact
    });
  }

  log(message: string, data: unknown = {}): void {
    this.printMessage(LogLevel.INFO, message, data)
  }

  info(message: string, data: unknown = {}): void {
    this.printMessage(LogLevel.INFO, message, data)
  }

  error(message: string, data: unknown = {}): void {
    this.printMessage(LogLevel.ERRROR, message, data)
  }

  warn(message: string, data: unknown = {}): void {
    this.printMessage(LogLevel.WARN, message, data)
  }

  fatal(message: string, data: unknown = {}): void {
    this.printMessage(LogLevel.FATAL, message, data)
  }

  trace(message: string, data: unknown = {}): void {
    this.printMessage(LogLevel.TRACE, message, data)
  }

  debug(message: string, data: unknown = {}): void {
    this.printMessage(LogLevel.DEBUG, message, data)
  }

  private printMessage(level: Level, message: string, data: any): void {
    let logData = { log: data };

    if (logData.log instanceof Error) {
      const error = stdSerializers.err(data);
      logData = { log: error };
    }

    this.logger[level](logData, message);
  }
}
