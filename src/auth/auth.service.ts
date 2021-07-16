import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(username: string): Promise<any> {
    const user = await this.userService.findOne(username);
    // if (user) {
    //   const { secret } = user;
    //   return secret;
    // }
    return null;
  }
}
