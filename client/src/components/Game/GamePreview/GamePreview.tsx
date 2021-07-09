import { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useGame } from '../../../hooks/useGame';
import {
  gamePickStateSelector,
  gamePlayersSelector,
  gameReadyStateSelector,
} from '../../../store/game/gameSlice';
import { currentUserSelector } from '../../../store/users/usersSlice';
import getAllPossibleChars from '../../../utils/helpers/possibleChars';
import {
  GameAction,
  GamePickState,
  GamePreviewState,
  GameReadyState,
  GAME_GOFIRST_INFO_NOTIFY,
  GAME_PICKING_FIGURE_NOTIFY,
  GAME_WAITING_FOR_PLAYER_CONNECT,
  GAME_WAITING_FOR_PLAYER_PICK,
  GAME_WAITING_FOR_PLAYER_READY,
} from '../../../utils/types/game';
import GamePickFigure from './GamePickFigure';
import GameShowFigure, { ShowScreenData } from './GameShowFigure';
import GameWait from './GameWait';

type GamePreviewProps = {
  roomId: string;
  handleGameStart: (figure: string) => void;
  players: number;
};

function GamePreview(props: GamePreviewProps) {
  const [figure, setFigure] = useState('');
  const [previewState, setPreviewState] = useState({} as GamePreviewState);

  const currentUser = useSelector(currentUserSelector);
  const gameReadyState = useSelector(gameReadyStateSelector);
  const gamePickState = useSelector(gamePickStateSelector);
  const gameUser = useSelector(gamePlayersSelector)?.find(
    user => user.username === currentUser.username
  );
  const game = useGame({
    roomId: props.roomId,
    username: currentUser.username,
  } as GameAction);

  const waitReasonRef = useRef<string>('');
  const showTextRef = useRef<ShowScreenData>({
    text: '',
    data: '',
  });
  const simulatedRef = useRef<boolean>(false);

  useEffect(() => {
    if (gameReadyState === GameReadyState.READY_ONE) {
      waitReasonRef.current = GAME_WAITING_FOR_PLAYER_READY;
      simulatedRef.current = false;
      setPreviewState(GamePreviewState.WAIT);
    } else if (gameReadyState === GameReadyState.READY_ALL) {
      waitReasonRef.current = 'some loading...';
      props.handleGameStart(figure);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameReadyState]);

  useEffect(() => {
    if (gamePickState === GamePickState.ONE) {
      waitReasonRef.current = GAME_WAITING_FOR_PLAYER_PICK;
      simulatedRef.current = false;
      setPreviewState(GamePreviewState.WAIT);
    } else if (gamePickState === GamePickState.ALL) {
      waitReasonRef.current = GAME_GOFIRST_INFO_NOTIFY;
      simulatedRef.current = true;
      setPreviewState(GamePreviewState.WAIT_PICK);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamePickState]);

  useEffect(() => {
    if (props.players < 2) {
      simulatedRef.current && (simulatedRef.current = false);
      waitReasonRef.current = GAME_WAITING_FOR_PLAYER_CONNECT;
      setPreviewState(GamePreviewState.WAIT);
    }

    if (props.players === 2) {
      setPreviewState(GamePreviewState.PICK);
    }
  }, [props.players]);

  const onTimesOut = (state: GamePreviewState) => {
    switch (state) {
      case GamePreviewState.PICK:
        waitReasonRef.current = GAME_PICKING_FIGURE_NOTIFY;
        simulatedRef.current = true;
        setPreviewState(GamePreviewState.WAIT);
        break;
      case GamePreviewState.WAIT:
      case GamePreviewState.WAIT_PICK:
        waitReasonRef.current = '';
        simulatedRef.current = false;
        state === GamePreviewState.WAIT
          ? pickRandomFigure()
          : setChoosenFigure();
        break;
    }
  };

  // Picking random figure for player who did not choose the figure by himself
  const pickRandomFigure = () => {
    const chars = getAllPossibleChars();
    const randN = Math.round(Math.random() * chars.length);
    setChoosenFigure(chars[randN].toUpperCase());
  };

  // Setting chosen figure(random/by user) and show screen to user with info about his figure and first mover(SHOW state)
  const setChoosenFigure = (figure?: string) => {
    if (figure) {
      setFigure(() => {
        setPreviewState(GamePreviewState.SHOW);
        showTextRef.current.text = 'Your figure is ';
        showTextRef.current.data = figure;
        return figure;
      });
      return;
    }
    showTextRef.current.text = 'You are going ';
    showTextRef.current.data = gameUser?.goFirst ? 'first' : 'second';
    setPreviewState(GamePreviewState.SHOW);
  };

  // When player's clicking OK button with his figure and first move information
  const handlePlayerReady = () => {
    if (gamePickState === GamePickState.ALL) {
      waitReasonRef.current = GAME_WAITING_FOR_PLAYER_READY;
      simulatedRef.current = false;
      setPreviewState(GamePreviewState.WAIT);
      game.gameReady();
    } else {
      waitReasonRef.current = GAME_WAITING_FOR_PLAYER_PICK;
      simulatedRef.current = false;
      setPreviewState(GamePreviewState.WAIT);
      game.gamePicked(figure);
    }
  };

  const renderCurrentGamePreviewState = () => {
    switch (previewState) {
      case GamePreviewState.PICK:
        return (
          <GamePickFigure
            handlePickFigure={setChoosenFigure}
            onTimesOut={state => onTimesOut(state)}
          />
        );

      case GamePreviewState.WAIT:
      case GamePreviewState.WAIT_PICK:
        return (
          <GameWait
            simulated={simulatedRef.current}
            reason={waitReasonRef.current}
            onTimesOut={state => onTimesOut(state)}
            previewState={previewState}
          />
        );
      case GamePreviewState.SHOW:
        return (
          <GameShowFigure
            gameUser={gameUser}
            handlePickFigure={handlePlayerReady}
            showData={showTextRef.current}
          />
        );
    }
  };

  return (
    <Container className="d-flex align-items-center" style={{ height: '100%' }}>
      {renderCurrentGamePreviewState()}
    </Container>
  );
}

export default GamePreview;
