import { CreateRoomDTO } from './dto/createRoom.dto';
import { User } from 'src/users/users.service';
import { GameService } from 'src/games/game.service';
export declare class Room {
    roomId: string;
    roomTitle: string;
    roomPrivate: boolean;
    roomUsers: User[];
    roomPassword?: string;
}
export declare enum RoomUpdatePrefix {
    INC = "inc",
    DEC = "dec"
}
export declare class RoomsService {
    private readonly gameService;
    private rooms;
    constructor(gameService: GameService);
    createRoom(createRoomDto: CreateRoomDTO): Promise<Room>;
    getRoomById(id: string): Promise<Room | null>;
    addUser(roomId: string, username: string): Promise<Room>;
    removeUser(roomId: string, username: string): Promise<Room>;
    getRooms(): Promise<Room[]>;
    findUserInRoom: (room: Room, username: string) => number;
}
