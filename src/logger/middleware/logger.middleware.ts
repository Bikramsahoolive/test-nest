import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'src/logger/services/logger.service';
import * as fs from 'fs';
import { log } from 'console';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

      this.loggerService.logRequest(
      `Req - ${method} ${originalUrl}`
    );
    
    
    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - startTime;
      this.loggerService.logResponse(
        `Res - ${method} ${originalUrl} - Status: ${statusCode} - time: ${responseTime}ms`,
      );
    });

    next();
  }
}
