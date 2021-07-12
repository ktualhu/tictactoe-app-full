import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';
import { IsAuthGuard } from 'src/auth/guards/isauth.guard';
import { CreateRoomDTO } from './dto/createRoom.dto';
import { JoinRoomDTO } from './dto/joinRoom.dto';
import { RoomsService } from './rooms.service';

@UseGuards(IsAuthGuard)
@Controller('/rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async getAllRooms(@Req() req: Request) {
    if (req.cookies.room_id && (await this.roomsService.getRooms()).length) {
      try {
        const room_id = req.cookies.room_id;
        return await {
          rooms: await this.roomsService.getRooms(),
          room_id,
        };
      } catch (error) {
        console.error(error);
      }
    }
    return { rooms: await this.roomsService.getRooms() };
  }

  @Post('/new')
  async createRoom(@Body() createRoom: CreateRoomDTO) {
    return await this.roomsService.createRoom(createRoom);
  }

  @Get('/:id')
  async getRoomById(@Param('id') id: string, @Res() res: Response) {
    const room = await this.roomsService.getRoomById(id);
    if (!room) {
      throw new NotFoundException();
    }
    res.sendFile(join(__dirname, '..', 'client/build/index.html'));
  }

  @Post('/join')
  async joinRoom(@Body() joinRoom: JoinRoomDTO, @Res() res: Response) {
    const room = await this.roomsService.getRoomById(joinRoom.roomId);
    if (!room) return;
    if (room.roomPassword) {
      if (room.roomPassword === joinRoom.password) {
        return await res.cookie('room_id', joinRoom.roomId).json(room);
      } else {
        throw new HttpException('Wrong password!', HttpStatus.NOT_ACCEPTABLE);
      }
    } else {
      return await res.cookie('room_id', joinRoom.roomId).json(room);
    }
  }

  @Post('/leave')
  async leaveRoom(@Res() res: Response) {
    return res.clearCookie('room_id').send();
  }
}
