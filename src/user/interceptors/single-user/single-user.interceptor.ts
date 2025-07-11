import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class SingleUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any[]>): Observable<any> {
    return next.handle().pipe(map((data:any) => data.map(({password, ...user})=>user)));
  }
}
