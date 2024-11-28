import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if(req.headers['auth-token']){
      if(req.headers['auth-token'] === 'sibgsisgsgyshshusua'){
        next();
      }else{
        throw new HttpException('Invalid token',HttpStatus.FORBIDDEN);
      }
    }else{
      throw new HttpException('Please provide token.',HttpStatus.FORBIDDEN);

    }
  }
}
