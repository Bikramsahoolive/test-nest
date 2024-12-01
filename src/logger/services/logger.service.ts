import { Injectable } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private requestLogger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] [REQUEST] - ${message}`;
      }),
    ),
    transports: [
      new DailyRotateFile({
        dirname: 'logs/request', // Directory for request logs
        filename: '%DATE%-requests.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      }),
    ],
  });

  private responseLogger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] [RESPONSE] - ${message}`;
      }),
    ),
    transports: [
      new DailyRotateFile({
        dirname: 'logs/response', // Directory for response logs
        filename: '%DATE%-responses.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      }),
    ],
  });

  private errorLogger = createLogger({
    level: 'error',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] [ERROR] - ${message}`;
      }),
    ),
    transports: [
      new DailyRotateFile({
        dirname: 'logs/error', // Directory for error logs
        filename: '%DATE%-errors.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      }),
    ],
  });

  logRequest(message: string) {
    this.requestLogger.info(message);
  }

  logResponse(message: string) {
    this.responseLogger.info(message);
  }

  logError(message: string) {
    this.errorLogger.error(message);
  }
}
