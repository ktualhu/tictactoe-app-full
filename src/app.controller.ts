import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';
import { IsAuthGuard } from './auth/guards/isauth.guard';
import { Room, RoomsService } from './rooms/rooms.service';
import { User } from './users/users.service';

export class LobbyDto {
  currentUser: User;
  rooms: Room[];
}

interface IOnConnectData {
  username: string;
  roomId: string;
}

@UseGuards(IsAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly roomService: RoomsService) {}

  @Get('/')
  async getIndex(): Promise<any> {
    return 'index';
  }

  @Get('/isAuth')
  async getIsAuth(@Req() req: Request, @Res() res: Response): Promise<any> {
    let data: IOnConnectData = {
      username: null,
      roomId: null,
    };
    if (req.cookies.username) {
      const room = await this.roomService.getRoomById(req.cookies.room_id);
      if (req.cookies.room_id && !room) {
        data = {
          username: req.cookies.username,
          roomId: null,
        };
        res.clearCookie('room_id').json(data);
        return data;
      }
      data = {
        username: req.cookies.username,
        roomId: req.cookies.room_id,
      };
    }
    return res.json(data);
  }
}
