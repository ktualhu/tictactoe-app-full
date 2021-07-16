import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { IsAuthGuard } from 'src/auth/guards/isauth.guard';
import { GameActionDTO } from './dto/gameAction.dto';
import { GameService } from './game.service';

@UseGuards(IsAuthGuard)
@Controller('/game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('/ready')
  async joinGame(@Body() gameActionDto: GameActionDTO) {
    return await this.gameService.setPlayerReady(gameActionDto);
  }
}
