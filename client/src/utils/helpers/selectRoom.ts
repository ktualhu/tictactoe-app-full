import RootState from '../../store/state/rootState';

export const getRoomById = (state: RootState, roomId: string) => {
  return state.rooms.rooms.find(room => room.roomId === roomId) || null;
};
