import ChatState from './chatState';
import GameState from './gameState';
import RoomsState from './roomState';
import UsersState from './usersState';

export default interface RootState {
  users: UsersState;
  rooms: RoomsState;
  chat: ChatState;
  game: GameState;
}
