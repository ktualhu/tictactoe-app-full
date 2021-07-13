import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { Room } from '../utils/types/rooms';
import {
  roomAdd,
  updateRoom as sliceUpdateRoom,
} from '../store/rooms/roomsSlice';
import { updateGame } from '../store/game/gameSlice';

export const useLobby = () => {
  const [rooms, setRooms] = useState([] as Room[]);
  const dispatch = useDispatch();
  const socketRef = useRef({} as Socket);

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_API_URL as string, {
      withCredentials: true,
    });

    socketRef.current.on('room:create', data => {
      const newRooms = [...rooms];
      newRooms.push(data);
      setRooms(newRooms);
      dispatch(roomAdd(data));
    });

    socketRef.current.on('room:add_user', room => {
      if (!room) return;
      dispatch(sliceUpdateRoom(room));
    });

    socketRef.current.on('room:remove_user', data => {
      dispatch(sliceUpdateRoom(data.room));
      dispatch(updateGame(data.game));
    });

    return () => {
      socketRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userJoin = (username: string) => {
    console.log(`user ${username} connected to socket.`);
  };

  const createRoom = (room: Room) => {
    socketRef.current.emit('room:create', room);
  };

  const addUser = (id: string, username: string) => {
    socketRef.current.emit('room:add_user', { id, username });
  };

  const removeUser = (id: string, username: string) => {
    socketRef.current.emit('room:remove_user', { id, username });
  };

  return { rooms, userJoin, createRoom, addUser, removeUser };
};
