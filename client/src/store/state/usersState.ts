import { User } from '../../utils/types/users';

export default interface UsersState {
  isAuth: boolean;
  me: User;
  users: User[];
}
