import { User } from '../../utils/types/users';

export default interface UsersState {
  isInRoom: string;
  isAuth: boolean;
  me: User;
  users: User[];
}
