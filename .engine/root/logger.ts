import * as log4js from 'log4js';
import type { Level, Logger } from 'log4js';

log4js.configure({
  appenders: {
    out: { type: 'stdout' }
  },
  categories: {
    default: { appenders: ['out'], level: 'error' }
  }
});

export class LoggerConstructor {
  private readonly logger: Logger;

  constructor(readonly category?: string, level?: string) {
    this.logger = log4js.getLogger(category);

    if (level) this.logger.level = level;
  }

  trace(message: any, ...args: any[]): void {
    this.logger.trace(message, ...args);
  }

  debug(message: any, ...args: any[]): void {
    this.logger.debug(message, ...args);
  }

  info(message: any, ...args: any[]): void {
    this.logger.info(message, ...args);
  }

  warn(message: any, ...args: any[]): void {
    this.logger.warn(message, ...args);
  }

  error(message: any, ...args: any[]): void {
    this.logger.error(message, ...args);
  }

  fatal(message: any, ...args: any[]): void {
    this.logger.fatal(message, ...args);
  }

  mark(message: any, ...args: any[]): void {
    this.logger.mark(message, ...args);
  }

  log(level: Level | string, ...args: any[]): void {
    this.logger.log(level, ...args);
  }
}
