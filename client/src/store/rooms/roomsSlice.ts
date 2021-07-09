import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import RoomState from '../state/roomState';
import { Room } from '../../utils/types/rooms';
import RootState from '../state/rootState';

const initialState: RoomState = {
  rooms: [],
};

export const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    roomAdd: (state, action: PayloadAction<Room>) => {
      state.rooms.push(action.payload);
    },
    updateRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    },
    updateRoom: (state, action: PayloadAction<Room>) => {
      const index = state.rooms.findIndex(
        room => room.roomId === action.payload.roomId
      );
      if (index !== -1) {
        state.rooms[index] = action.payload;
      }
    },
  },
});

export const { roomAdd, updateRooms, updateRoom } = roomSlice.actions;

export const roomsAllSelector = (state: RootState) => state.rooms.rooms;

export default roomSlice.reducer;
