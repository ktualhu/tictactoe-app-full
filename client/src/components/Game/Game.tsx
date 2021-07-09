import { useEffect, useRef } from 'react';
import styles from './Game.module.css';
import GamePreview from './GamePreview/GamePreview';
import GameField from './GameField/GameField';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeGameStateType,
  gameDataSelector,
  gameStateSelector,
} from '../../store/game/gameSlice';
import { GameAction, GameData, GameStateType } from '../../utils/types/game';
import { currentUserSelector } from '../../store/users/usersSlice';
import { useGame } from '../../hooks/useGame';
import RootState from '../../store/state/rootState';
import { getCurrentPlayer } from '../../utils/helpers/currentPlayer';

type GameProps = {
  roomId: string;
  playersCounter: number;
};

function Game(props: GameProps) {
  const currentUser = useSelector(currentUserSelector);
  const currentPlayer = useSelector((state: RootState) =>
    getCurrentPlayer(state, currentUser.username)
  ); // can use it only after game is ready to play
  const gameState = useSelector(gameStateSelector);
  const gameData = useSelector(gameDataSelector) || ({} as GameData);
  const dispatch = useDispatch();

  const cellsRef = useRef({} as NodeListOf<Element>);
  const game = useGame({
    roomId: props.roomId,
    username: currentUser.username,
  });

  useEffect(() => {
    game.gameJoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    switch (gameState) {
      case GameStateType.PLAY:
        if (currentPlayer && currentPlayer.figure) {
          cellsRef.current = document.querySelectorAll('.cell');
          currentPlayer.goFirst ? blockField(false) : blockField(true);
          initGameField();
        }
        break;
      case GameStateType.RESTART:
        handleGameRestart();
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  useEffect(() => {
    if (currentPlayer?.move && gameState === GameStateType.PLAY) {
      blockField(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer?.move]);

  useEffect(() => {
    if (gameState === GameStateType.PLAY) {
      const field = gameData.field;
      cellsRef.current.forEach((cell, i) => {
        cell.textContent = field[i];
        renderButtonText(cell);
      });
      if (gameData.winStrickCells) {
        paintWinner(gameData.winStrickCells);
        handleGameOver();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData.field, gameData.winStrickCells]);

  const initGameField = () => {
    cellsRef.current.forEach((cell, i) => {
      cell.textContent = gameData.field[i];
      cell.classList.remove('cannotuse');
    });
  };

  const handleCellClick: React.MouseEventHandler<HTMLTableElement> = event => {
    if (!(event.target instanceof Element)) return;
    if (!event.target.classList.contains('cell')) return;
    if (!currentPlayer) return;
    const cellId = +event.target.id;
    const gameData: GameAction = {
      roomId: props.roomId,
      username: currentUser.username,
      figure: currentPlayer.figure,
      move: currentPlayer.move,
      moveCellId: cellId,
    };
    game.gameMove(gameData);
    blockField(true);
  };

  const handleGameStart = () => {
    dispatch(changeGameStateType(GameStateType.PLAY));
  };

  const handleGameRestart = () => {
    cellsRef.current.forEach(cell => cell.classList.remove(styles.cannotuse));
    handleGameStart();
  };

  const handleGameOver = () => {
    cellsRef.current.forEach(cell => cell.classList.add(styles.cannotuse));
  };

  const paintWinner = (winCells: number[]) => {
    winCells.forEach(cellNum => {
      cellsRef.current[cellNum].firstElementChild?.classList.add(styles.winner);
    });
  };

  /**
   *
   * @param toggle - on/off field blocking
   * true - block, false - unblock
   */
  const blockField = (toggle: boolean) => {
    cellsRef.current.forEach(cell => {
      toggle
        ? cell.classList.add(styles.cannotmove)
        : cell.classList.remove(styles.cannotmove);
    });
  };

  const renderButtonText = (el: Element) => {
    const h1 = document.createElement('h1');
    h1.setAttribute('className', 'display-3');
    h1.textContent = el.textContent;
    el.textContent = '';
    document
      .getElementById(`${el.id}`)
      ?.insertAdjacentElement('afterbegin', h1);
  };

  switch (gameState) {
    case GameStateType.RESTART:
    case GameStateType.PLAY:
    case GameStateType.OVER:
      return (
        <GameField field={gameData.field} handleCellClick={handleCellClick} />
      );
    default:
      return (
        <GamePreview
          roomId={props.roomId}
          handleGameStart={handleGameStart}
          players={props.playersCounter}
        />
      );
  }
}

export default Game;
