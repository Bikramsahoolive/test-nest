import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from 'src/typeORM/entities/log.entity';
import { Writable } from 'stream';
import { Repository } from 'typeorm';
import { createLogger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  errLogger:any;
  infoLogger:any;
  constructor(@InjectRepository(Log)private readonly logRepo:Repository<Log>, ){
    //Database Stream
    const dbStream = new Writable({
        write:async (chunk:any, encoding:string,cb:Function) =>{
          try {
          const logEntry = JSON.parse(chunk.toString());
          const log = new Log();
          log.level = logEntry.level;
          log.message = logEntry.message;
          log.context = logEntry.context;

          await this.logRepo.save(log);
          cb();
          } catch (error) {
            cb(error);
          }
        
      }
    });

     this.errLogger = createLogger({
      level: 'error',
      format:format.combine(
        format.timestamp(),
        format.json()
      ),
      transports: [ 
        // new transports.Console(),
        new transports.Stream({stream:dbStream})
      ],
    });

    this.infoLogger = createLogger({
      level: 'info',
      format:format.combine(
        format.timestamp(),
        format.json()
      ),
      transports: [ 
        // new transports.Console(),
        new transports.Stream({stream:dbStream})
      ],
    });
  }
  
requestDB(message:string,context:string){
    this.infoLogger.info({message,context});
  }
responseDB(message:string,context:string){
    this.infoLogger.info({message,context});
  }
errorDB(message:string,context:string){
  this.errLogger.error({message,context});
}
//file logger
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
        dirname: 'logs/request',
        filename: '%DATE%-requests.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      }),
      new transports.Console(),
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
        dirname: 'logs/response',
        filename: '%DATE%-responses.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      }),
      new transports.Console(),
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
        dirname: 'logs/error',
        filename: '%DATE%-errors.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      }),
      new transports.Console(),
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
