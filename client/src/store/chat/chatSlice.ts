import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../utils/types/chat-message';
import ChatState from '../state/chatState';
import RootState from '../state/rootState';

const initialState: ChatState = {
  // roomId: '',
  messages: [],
  messagesLog: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    chatAlert: (state, action: PayloadAction<Message>) => {
      state.messagesLog.push(action.payload);
    },

    leaveChatAlert: state => {
      state.messages = [];
      state.messagesLog = [];
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },

    addMessageLog: (state, action: PayloadAction<Message>) => {
      state.messagesLog.push(action.payload);
    },
  },
});

export const { chatAlert, leaveChatAlert, addMessage, addMessageLog } =
  chatSlice.actions;

export const getMessages = (state: RootState) => state.chat.messages;

export const getMessagesLog = (state: RootState) => state.chat.messagesLog;

export default chatSlice.reducer;
