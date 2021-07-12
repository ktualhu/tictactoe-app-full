import { ServeStaticModule } from '@nestjs/serve-static';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { GameModule } from './games/game.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomsService } from './rooms/rooms.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [AuthModule, UsersModule, RoomsModule, EventsModule, GameModule],
  controllers: [AppController],
  providers: [UsersService],
})
export class AppModule {}
