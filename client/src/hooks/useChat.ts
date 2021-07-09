import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import {
  chatAlert,
  leaveChatAlert,
  addMessage,
  addMessageLog,
} from '../store/chat/chatSlice';
import { constructChatMessage } from '../utils/helpers/constructChatMessage';
import { Message, MessageType } from '../utils/types/chat-message';

export const useChat = () => {
  const chatSocketRef = useRef({} as Socket);
  const dispatch = useDispatch();

  useEffect(() => {
    chatSocketRef.current = io('http://localhost:5001/chat', {
      withCredentials: true,
    });

    chatSocketRef.current.on('chat:join', (data: Message) => {
      dispatch(chatAlert(data));
    });

    chatSocketRef.current.on('chat:leave', (data: Message) => {
      dispatch(chatAlert(data));
    });

    chatSocketRef.current.on('chat:message', (data: Message) => {
      dispatch(addMessage(data));
    });

    chatSocketRef.current.on('chat:message_log', (data: Message) => {
      dispatch(addMessageLog(data));
    });

    return () => {
      chatSocketRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showChatJoinAlert = (roomId: string, message: Message) => {
    chatSocketRef.current.emit('chat:join', { roomId, message });
  };

  const showChatLeaveAlert = (roomId: string, username: string) => {
    const message: Message = constructChatMessage(username, MessageType.LEAVE);
    chatSocketRef.current.emit('chat:leave', { roomId, message });
    dispatch(leaveChatAlert());
  };

  const sendMessage = (roomId: string, message: Message) => {
    chatSocketRef.current.emit('chat:message', { roomId, message });
  };

  const sendMessageLog = (roomId: string, message: Message) => {
    chatSocketRef.current.emit('chat:message_log', { roomId, message });
  };

  return { showChatJoinAlert, showChatLeaveAlert, sendMessage, sendMessageLog };
};
