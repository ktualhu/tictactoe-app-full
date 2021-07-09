import { GameActionDTO } from './dto/gameAction.dto';
import { GameService } from './game.service';
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    joinGame(gameActionDto: GameActionDTO): Promise<import("./game.service").Game>;
}
