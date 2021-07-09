import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { IsAuthGuard } from './auth/guards/isauth.guard';
import { Room } from './rooms/rooms.service';
import { User } from './users/users.service';

export class LobbyDto {
  currentUser: User;
  rooms: Room[];
}

@UseGuards(IsAuthGuard)
@Controller()
export class AppController {
  @Get('/')
  async getIndex(@Req() req: Request): Promise<User> {
    return req.cookies.username || null;
  }
}
