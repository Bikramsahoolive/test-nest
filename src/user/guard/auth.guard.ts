import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
constructor(private authServe : AuthService){}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const authToken = request.headers['auth-token'] || request.cookies.sid;
    if(authToken){
      const authStatus =  this.authServe.checkAuthentication(authToken);
    
    return authStatus;
    }else if(request.session.user){
      return true;
    }else{
      return false;
    }

    
  }
}

