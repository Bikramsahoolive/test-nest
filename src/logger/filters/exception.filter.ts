import { ArgumentsHost, Catch, ExceptionFilter,HttpException } from '@nestjs/common';
import { LoggerService } from '../services/logger.service';
import { Request, Response } from 'express';
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : 500;

    const message = exception.message || 'Internal server error';
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };

    this.loggerService.logError(
      `Error: ${message} - Path: ${request.url} - Status: ${status}`,
    );

    this.loggerService.errorDB(`Error: ${message} `,` Path: ${request.url} - Status: ${status}`);
    response.status(status).json(errorResponse);
  }
}
