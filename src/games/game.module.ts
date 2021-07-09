import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameLogic } from './gamelogic.service';

@Module({
  providers: [GameService, GameLogic],
  controllers: [GameController],
  exports: [GameService],
})
export class GameModule {}
