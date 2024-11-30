import { Injectable } from '@nestjs/common';
import {createLogger , format , transports, Logger} from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
@Injectable()
export class LoggerService {
    
        private logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ level, message, timestamp }) => {
          return `[${timestamp}] [${level.toUpperCase()}] - ${message}`;
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
        new DailyRotateFile({
          dirname: 'logs/response', // Directory for response logs
          filename: '%DATE%-responses.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
        new DailyRotateFile({
          dirname: 'logs/error', // Directory for error logs
          filename: '%DATE%-errors.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'error', // Only errors will be logged here
        }),
        new transports.Console(), // Optional: Logs to console as well
      ],
    });
  }

  logRequest(message: string) {
    this.logger.info(message, { file: 'request' });
  }

  logResponse(message: string) {
    this.logger.info(message, { file: 'response' });
  }

  logError(message: string) {
    this.logger.error(message);
  }
}