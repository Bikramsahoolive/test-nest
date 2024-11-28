import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // if(req.headers['auth-token']){
      next();
    // }else{
    //   throw new HttpException('Please provide auth-token in request header.',HttpStatus.FORBIDDEN);

    // }
  }
}
