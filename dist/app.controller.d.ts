import { Request } from 'express';
import { Room } from './rooms/rooms.service';
import { User } from './users/users.service';
export declare class LobbyDto {
    currentUser: User;
    rooms: Room[];
}
export declare class AppController {
    getIndex(req: Request): Promise<User>;
}
