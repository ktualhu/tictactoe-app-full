import { Socket, Server } from 'socket.io';
export declare class RoomGateway {
    server: Server;
    handleJoinRoom(data: any, socket: Socket): void;
    handleLeaveRoom(data: any, socket: Socket): void;
    handlePrivateRoom(data: any): void;
}
