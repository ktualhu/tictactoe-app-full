import { Injectable } from '@nestjs/common';
import { CreateRoomDTO } from './dto/createRoom.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/users/users.service';
import { GameService } from 'src/games/game.service';

export class Room {
  roomId: string;
  roomTitle: string;
  roomPrivate: boolean;
  roomUsers: User[];
  roomPassword?: string;
}

export enum RoomUpdatePrefix {
  INC = 'inc',
  DEC = 'dec',
}

@Injectable()
export class RoomsService {
  private rooms: Room[] = [];

  constructor(private readonly gameService: GameService) {}

  async createRoom(createRoomDto: CreateRoomDTO): Promise<Room> {
    const room: Room = {
      roomId: uuidv4(),
      roomTitle: createRoomDto.roomTitle,
      roomPrivate: createRoomDto.roomPrivate,
      roomUsers: [],
    };
    room.roomPrivate && (room.roomPassword = createRoomDto.roomPassword);
    this.rooms.push(room);

    // create empty game
    await this.gameService.createNewGame(room.roomId);
    return room;
  }

  async getRoomById(id: string): Promise<Room | null> {
    const room: Room | null =
      this.rooms.find((room) => room.roomId === id) || null;
    return room;
  }

  async addUser(roomId: string, username: string) {
    try {
      const room = (await this.getRoomById(roomId)) as Room;
      if (this.findUserInRoom(room, username) === -1) {
        room.roomUsers.push({ username } as User);
      }
      return room;
    } catch (error) {
      console.error(error);
    }
  }

  async removeUser(roomId: string, username: string) {
    try {
      const room = (await this.getRoomById(roomId)) as Room;
      const index = this.findUserInRoom(room, username);
      if (index !== -1) {
        room.roomUsers.splice(index, 1);
      }
      return room;
    } catch (error) {
      console.error(error);
    }
  }

  async getRooms(): Promise<Room[]> {
    return this.rooms;
  }

  findUserInRoom = (room: Room, username: string): number => {
    return room.roomUsers.findIndex((user) => user.username === username);
  };
}
