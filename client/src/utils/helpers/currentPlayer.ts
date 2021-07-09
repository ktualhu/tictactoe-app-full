import RootState from '../../store/state/rootState';

export const getCurrentPlayer = (state: RootState, username: string) => {
  return (
    state.game.game.players?.find(player => player.username === username) ||
    null
  );
};
