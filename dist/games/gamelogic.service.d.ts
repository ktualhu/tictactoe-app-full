import { GameData } from './game.service';
export declare const FIELD_LENGTH = 9;
export interface FillCellGameData {
    cellId: number;
    figure: string;
    field: string[];
}
export declare class GameLogic {
    private readonly fieldTemplate;
    private winStrickFigures;
    createGameField(): GameData;
    fillCell(fillCellData: FillCellGameData): GameData;
    private checkWinner;
    private checkHorVert;
    private checkDiag;
}
