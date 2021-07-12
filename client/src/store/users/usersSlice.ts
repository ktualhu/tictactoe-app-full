import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import RootState from '../state/rootState';
import UsersState from '../state/usersState';
import { User } from '../../utils/types/users';

const initialState: UsersState = {
  isInRoom: '',
  isAuth: false,
  me: {} as User,
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    auth: (state, action: PayloadAction<User>) => {
      state.isAuth = true;
      state.isInRoom = action.payload.roomId || '';
      state.me = action.payload;
      state.users.push(action.payload);
    },
    updateUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    updateMyUser: (state, action: PayloadAction<string>) => {
      state.me.roomId = action.payload;
    },
    signout: state => {
      state.me = {} as User;
      state.isAuth = false;
    },
  },
});

export const { auth, updateUsers, updateMyUser, signout } = usersSlice.actions;

export const selectIsAuth = (state: RootState) => state.users.isAuth;
export const selectIsInRoom = (state: RootState) => state.users.isInRoom;
export const currentUserSelector = (state: RootState) => state.users.me;

export default usersSlice.reducer;
