import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game, GameStateType, GameUser } from '../../utils/types/game';
import GameState from '../state/gameState';
import RootState from '../state/rootState';

const initialState: GameState = {
  game: {} as Game,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateGame: (state, action: PayloadAction<Game>) => {
      state.game = action.payload;
    },

    updateUser: (state, action: PayloadAction<GameUser>) => {
      const user = state.game.players.find(
        player => player.username === action.payload.username
      );
      if (user) {
        user.figure = action.payload.figure;
        user.move = action.payload.move;
      }
    },

    changeGameStateType: (state, action: PayloadAction<GameStateType>) => {
      state.game.gameState = action.payload;
    },

    clearGame: state => {
      state.game = {} as Game;
    },
  },
});

export const { updateGame, updateUser, changeGameStateType, clearGame } =
  gameSlice.actions;

export const gameStateSelector = (state: RootState) =>
  state.game.game.gameState;

export const gameReadyStateSelector = (state: RootState) =>
  state.game.game.gameReadyState;

export const gamePickStateSelector = (state: RootState) =>
  state.game.game.gamePickState;

export const gamePlayersSelector = (state: RootState) =>
  state.game.game.players;

export const gameDataSelector = (state: RootState) => state.game.game.gameData;

export default gameSlice.reducer;
