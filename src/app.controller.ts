import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';
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
  async getIndex(@Res() res: Response): Promise<any> {
    res.sendFile(join(__dirname, '..', 'client/build/index.html'));
    // if (req.cookies.username) {
    //   res.send(req.cookies.username);
    // }
    // return 'bbbbbzzzzxxxx';
    // return req.cookies.username || null;
  }

  @Get('/isAuth')
  async getIsAuth(@Req() req: Request): Promise<any> {
    return req.cookies.username || null;
  }
}
