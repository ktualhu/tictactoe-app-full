import { Message, MessageType } from '../types/chat-message';
import { v4 as uuidv4 } from 'uuid';

const generateAlertMessage = (username: string, type: MessageType) => {
  return ` ${
    type === MessageType.JOIN ? MessageType.JOIN : MessageType.LEAVE
  } the room.`;
};

export const constructChatMessage = (
  username: string,
  type: MessageType,
  text: string = ''
) => {
  const msg: Message = {
    id: uuidv4(),
    text:
      type !== MessageType.MESSAGE
        ? generateAlertMessage(username, type)
        : text,
    type: type || MessageType.MESSAGE,
    author: username,
  };
  return msg;
};
