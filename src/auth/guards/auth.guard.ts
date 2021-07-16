import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const user: User = request.body;
    response.cookie('username', user.username);
    return true;
  }
}
