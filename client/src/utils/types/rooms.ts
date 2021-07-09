import { Message } from './chat-message';
import { User } from './users';

export interface Room {
  roomId: string;
  roomTitle: string;
  roomPrivate: boolean;
  roomUsers: User[];
  roomMessages: Message[];
  roomPassword?: string;
}
