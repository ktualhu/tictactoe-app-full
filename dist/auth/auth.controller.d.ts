import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
export declare class AuthController {
    private readonly usersService;
    constructor(usersService: UsersService);
    login(req: Request): Promise<any>;
    logout(res: any): Promise<any>;
}
