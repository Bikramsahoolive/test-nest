import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class UserDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any[]>): Observable<any> {
    // const httpContext = context.switchToHttp();
    // const request = httpContext.getRequest();
    // const response = httpContext.getResponse();
    
    return next.handle().pipe(map((data) => data.map(({id,name, ...user})=>{return {id,name}})));
  }
}
