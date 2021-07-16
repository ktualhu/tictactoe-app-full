import RootState from '../../store/state/rootState';
import { GameStateType } from '../types/game';
import { getRoomById } from './selectRoom';

export const playerCount = (state: RootState): GameStateType => {
  const room = getRoomById(state, state.users.me.roomId!);
  return room?.roomUsers.length === 2
    ? GameStateType.CHOOSE
    : GameStateType.WAIT;
};
