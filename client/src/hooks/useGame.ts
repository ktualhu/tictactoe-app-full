import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { updateGame } from '../store/game/gameSlice';
import { Game, GameAction } from '../utils/types/game';

export const useGame = (gameData?: GameAction) => {
  const gameSocketRef = useRef({} as Socket);
  const dispatch = useDispatch();

  useEffect(() => {
    gameSocketRef.current = io('http://localhost:5001/game', {
      withCredentials: true,
    });

    gameSocketRef.current.on('game:join', (data: Game) => {
      dispatch(updateGame(data));
    });

    gameSocketRef.current.on('game:pick', (data: Game) => {
      dispatch(updateGame(data));
    });

    gameSocketRef.current.on('game:ready', (data: Game) => {
      data && dispatch(updateGame(data));
    });

    gameSocketRef.current.on('game:move', (data: Game) => {
      dispatch(updateGame(data));
    });

    gameSocketRef.current.on('game:restart', (data: Game) => {
      dispatch(updateGame(data));
    });

    gameSocketRef.current.on('game:over', (data: Game) => {
      dispatch(updateGame(data));
    });

    gameSocketRef.current.on('game:leave', (data: Game) => {
      dispatch(updateGame(data));
    });

    return () => {
      gameSocketRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gameJoin = () => {
    gameSocketRef.current.emit('game:join', gameData);
  };

  const gamePicked = (figure: string) => {
    gameSocketRef.current.emit('game:pick', {
      ...gameData,
      figure: figure.toLocaleUpperCase(),
    });
  };

  const gameReady = () => {
    gameSocketRef.current.emit('game:ready', gameData);
  };

  const gameMove = (gameFullData: GameAction) => {
    gameSocketRef.current.emit('game:move', gameFullData);
  };

  const gameRestart = () => {
    gameSocketRef.current.emit('game:restart', gameData);
  };

  const gameOver = () => {
    gameSocketRef.current.emit('game:over', gameData);
  };

  const gameLeave = (gameData: GameAction) => {
    gameSocketRef.current.emit('game:leave', gameData);
  };

  return {
    gameJoin,
    gamePicked,
    gameReady,
    gameLeave,
    gameMove,
    gameRestart,
    gameOver,
  };
};
