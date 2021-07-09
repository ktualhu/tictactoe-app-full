import { OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Room, RoomsService } from 'src/rooms/rooms.service';
export declare const options: {
    cors: {
        origin: string;
        methods: string[];
        credentials: boolean;
    };
};
export declare class LobbyGateway implements OnGatewayInit {
    private readonly roomsService;
    private logger;
    constructor(roomsService: RoomsService);
    server: Server;
    handleUserJoin(data: string, socket: Socket): void;
    handleCreateRoom(data: Room, socket: Socket): void;
    handleAddUser(data: any): Promise<void>;
    handleRemoveUser(data: any, socket: Socket): Promise<void>;
    afterInit(server: Server): void;
}
