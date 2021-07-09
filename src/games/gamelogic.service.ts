import { Injectable } from '@nestjs/common';
import { GameData } from './game.service';

export const FIELD_LENGTH = 9;

export interface FillCellGameData {
  cellId: number;
  figure: string;
  field: string[];
}

@Injectable()
export class GameLogic {
  private readonly fieldTemplate = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  private winStrickFigures: number[] = [];

  createGameField() {
    const field: string[] = [];
    const gameData: GameData = {} as GameData;
    for (let i = 0; i < FIELD_LENGTH; i++) {
      field[i] = '';
    }
    gameData.field = field;
    gameData.won = false;
    return gameData;
  }

  fillCell(fillCellData: FillCellGameData) {
    const field = fillCellData.field;
    if (!field[fillCellData.cellId])
      field[fillCellData.cellId] = fillCellData.figure;
    return this.checkWinner(field, fillCellData.figure);
  }

  private checkWinner(field: string[], figure: string) {
    const checkResultData: GameData = { field, won: false };
    if (this.checkHorVert(field, figure) || this.checkDiag(field, figure)) {
      checkResultData.field = field;
      checkResultData.won = true;
      checkResultData.winStrickCells = this.winStrickFigures;
    } else {
      checkResultData.field = field;
      checkResultData.won = false;
    }
    return checkResultData;
  }

  private checkHorVert(field: string[], figure: string) {
    let vertStrick = 0;
    let horStrick = 0;
    let horWinStrickFigures: number[] = [];
    let vertWinStrickFigures: number[] = [];
    for (let i = 0; i < 3; i++) {
      vertStrick = 0;
      for (let j = 0; j < 3; j++) {
        if (field[this.fieldTemplate[i][j] - 1] === figure) {
          horStrick++;
          horWinStrickFigures.push(this.fieldTemplate[i][j] - 1);
        } else {
          horStrick = 0;
          horWinStrickFigures = [];
        }
        if (field[this.fieldTemplate[j][i] - 1] === figure) {
          vertStrick++;
          vertWinStrickFigures.push(this.fieldTemplate[j][i] - 1);
        } else {
          vertStrick = 0;
          vertWinStrickFigures = [];
        }
      }
      if (vertStrick === 3 || horStrick === 3) {
        horWinStrickFigures.length === 3
          ? (this.winStrickFigures = horWinStrickFigures)
          : (this.winStrickFigures = vertWinStrickFigures);
        break;
      }
    }
    return vertStrick === 3 || horStrick === 3;
  }

  private checkDiag(field: string[], figure: string) {
    let diagStrick = 0;
    let diagWinStrickFigures: number[] = [];
    for (let i = 0; i < 3; i++) {
      if (field[this.fieldTemplate[i][i] - 1] === figure) {
        diagWinStrickFigures.push(this.fieldTemplate[i][i] - 1);
        diagStrick++;
        continue;
      }
      if (i === 0) {
        for (let j = 2; j >= 0; j--) {
          if (field[this.fieldTemplate[i][j] - 1] === figure) {
            diagWinStrickFigures.push(this.fieldTemplate[i][j] - 1);
            i++;
            diagStrick++;
          } else {
            diagStrick = 0;
            diagWinStrickFigures = [];
            break;
          }
        }
      }
    }
    if (diagWinStrickFigures.length === 3)
      this.winStrickFigures = diagWinStrickFigures;
    return diagStrick === 3;
  }
}
