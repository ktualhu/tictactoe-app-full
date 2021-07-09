import { Module } from '@nestjs/common';
import { GameModule } from 'src/games/game.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { ChatGateway } from './chat.gateway';
import { GameGateway } from './game.gateway';
import { LobbyGateway } from './lobby.gateway';
import { RoomGateway } from './room.gateway';

@Module({
  imports: [RoomsModule, GameModule],
  providers: [LobbyGateway, RoomGateway, ChatGateway, GameGateway],
})
export class EventsModule {}
