export enum MessageType {
  MESSAGE = 'message',
  JOIN = 'join',
  LEAVE = 'leave',
}

export type Message = {
  id?: string;
  text: string;
  type: MessageType;
  author: string;
};
