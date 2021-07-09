import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { useChat } from './useChat';
import { useGame } from './useGame';
// import { useChat } from './useChat';
import { useLobby } from './useLobby';

export const useRooms = () => {
  const roomSocketRef = useRef({} as Socket);
  const { addUser, removeUser } = useLobby();
  const { showChatLeaveAlert } = useChat();
  const { gameLeave } = useGame();

  useEffect(() => {
    roomSocketRef.current = io('http://localhost:5001/room', {
      withCredentials: true,
    });

    roomSocketRef.current.on('room:leave', (data: any) => {
      console.log(`${data} was left the room`);
    });

    // test event
    roomSocketRef.current.on('room:private', (data: any) => {
      console.log(`${data} made private action`);
    });

    return () => {
      roomSocketRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const joinRoom = (
    roomId: string,
    username: string,
    isHere: boolean = false
  ) => {
    if (!isHere) {
      // update room for all clients(inner and outer)
      addUser(roomId, username);
    }
  };

  const leaveRoom = (roomId: string, username: string) => {
    removeUser(roomId, username);
    showChatLeaveAlert(roomId, username);
    gameLeave({ roomId, username });
    roomSocketRef.current.emit('room:leave', { roomId, username });
  };

  // test event
  const privateRoom = (roomId: string, username: string) => {
    roomSocketRef.current.emit('room:private', { roomId, username });
  };

  return { joinRoom, leaveRoom, privateRoom };
};
