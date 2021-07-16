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
  // const { gameLeave } = useGame();

  useEffect(() => {
    roomSocketRef.current = io(
      `${process.env.REACT_APP_API_URL as string}room`,
      {
        withCredentials: true,
      }
    );

    roomSocketRef.current.on('room:leave', (data: any) => {
      console.log(`${data} was left the room`);
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
    // showChatLeaveAlert(roomId, username);
    removeUser(roomId, username);
    // roomSocketRef.current.emit('room:leave');
  };

  return { joinRoom, leaveRoom };
};
