"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameLogic = exports.FIELD_LENGTH = void 0;
const common_1 = require("@nestjs/common");
exports.FIELD_LENGTH = 9;
let GameLogic = class GameLogic {
    constructor() {
        this.fieldTemplate = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];
        this.winStrickFigures = [];
    }
    createGameField() {
        const field = [];
        const gameData = {};
        for (let i = 0; i < exports.FIELD_LENGTH; i++) {
            field[i] = '';
        }
        gameData.field = field;
        gameData.won = false;
        return gameData;
    }
    fillCell(fillCellData) {
        const field = fillCellData.field;
        if (!field[fillCellData.cellId])
            field[fillCellData.cellId] = fillCellData.figure;
        return this.checkWinner(field, fillCellData.figure);
    }
    checkWinner(field, figure) {
        const checkResultData = { field, won: false };
        if (this.checkHorVert(field, figure) || this.checkDiag(field, figure)) {
            checkResultData.field = field;
            checkResultData.won = true;
            checkResultData.winStrickCells = this.winStrickFigures;
        }
        else {
            checkResultData.field = field;
            checkResultData.won = false;
        }
        return checkResultData;
    }
    checkHorVert(field, figure) {
        let vertStrick = 0;
        let horStrick = 0;
        let horWinStrickFigures = [];
        let vertWinStrickFigures = [];
        for (let i = 0; i < 3; i++) {
            vertStrick = 0;
            for (let j = 0; j < 3; j++) {
                if (field[this.fieldTemplate[i][j] - 1] === figure) {
                    horStrick++;
                    horWinStrickFigures.push(this.fieldTemplate[i][j] - 1);
                }
                else {
                    horStrick = 0;
                    horWinStrickFigures = [];
                }
                if (field[this.fieldTemplate[j][i] - 1] === figure) {
                    vertStrick++;
                    vertWinStrickFigures.push(this.fieldTemplate[j][i] - 1);
                }
                else {
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
    checkDiag(field, figure) {
        let diagStrick = 0;
        let diagWinStrickFigures = [];
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
                    }
                    else {
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
};
GameLogic = __decorate([
    common_1.Injectable()
], GameLogic);
exports.GameLogic = GameLogic;
//# sourceMappingURL=gamelogic.service.js.map