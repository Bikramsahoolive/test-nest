import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'src/logger/services/logger.service';
// import * as fs from 'fs';
// import { log } from 'console';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

      this.loggerService.logRequest(`Method: ${method} - Path: ${originalUrl}`);
      this.loggerService.requestDB('Request',`Method: ${method} - Path: ${originalUrl}`);
    
    
    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - startTime;
      this.loggerService.logResponse(
        `Method: ${method} - Path: ${originalUrl} - Status: ${statusCode} - Time: ${responseTime}ms`,
      );
      this.loggerService.responseDB('Response',`Method: ${method} - Path: ${originalUrl} - Status: ${statusCode} - Time: ${responseTime}ms`);
    });

    next();
  }
}
