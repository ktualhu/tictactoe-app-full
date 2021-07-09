import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class IsAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
