import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post('/login')
  async login(@Req() req: Request) {
    this.usersService.setCurrentUser(req.body);
    return req.body;
  }

  @Post('/logout')
  async logout(@Res() res) {
    return res.clearCookie('username').send('Successfuly logout!');
  }
}
