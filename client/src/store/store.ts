import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/usersSlice';
import roomsReducer from './rooms/roomsSlice';
import chatReducer from './chat/chatSlice';
import gameReducer from './game/gameSlice';

const reducers = {
  users: usersReducer,
  rooms: roomsReducer,
  chat: chatReducer,
  game: gameReducer,
};

export default configureStore({ reducer: reducers });
