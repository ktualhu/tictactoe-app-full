import { Injectable } from '@nestjs/common';

export class User {
  username: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  private currentUser: User | null = null;

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async getCurrentUser(): Promise<User> | null {
    return this.currentUser;
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }
}
