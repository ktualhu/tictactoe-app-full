import { Message } from '../../utils/types/chat-message';

export default interface ChatState {
  messages: Message[];
  messagesLog: Message[];
}
