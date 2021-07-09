import { Server, Socket } from 'socket.io';
export declare class ChatGateway {
    server: Server;
    handleJoinChat(data: any, socket: Socket): void;
    handleChatLeave(data: any, socket: Socket): void;
    handleChatMessage(data: any): void;
    handleChatMessageLog(data: any): void;
}
