import { useEffect, useState, useRef } from 'react';
import useTimer from '../../../hooks/useTimer';
import {
  GamePreviewState,
  GAME_DESIRED_FIGURE,
} from '../../../utils/types/game';
import { PICK_FIGURE_TIMER } from '../../../utils/constants';
import '../styles/styles.css';

type GamePickFigureProps = {
  handlePickFigure: (figure: string) => void;
  onTimesOut: (state: GamePreviewState) => void;
};

const GamePickFigure = (props: GamePickFigureProps) => {
  const [figure, setFigure] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useTimer(PICK_FIGURE_TIMER, () =>
    props.onTimesOut(GamePreviewState.PICK)
  );

  useEffect(() => {
    inputRef && inputRef.current && inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="game__container__row loading">
      <form
        className="loading__content"
        onSubmit={event => {
          event.preventDefault();
          props.handlePickFigure(figure);
        }}
      >
        <span style={{ fontSize: '1.3em' }}>
          {GAME_DESIRED_FIGURE}{' '}
          <span style={{ textDecoration: 'underline' }}>
            {timer.getTimer()}
          </span>
        </span>
        <div className="input__box" style={{ fontSize: '1', width: '40%' }}>
          <input
            type="text"
            placeholder="Figure..."
            maxLength={1}
            style={{ width: '100%', textAlign: 'center' }}
            value={figure}
            onChange={event =>
              setFigure(event.target.value.toLocaleUpperCase())
            }
          />
        </div>
        <button
          type="submit"
          className="btn btn__info auth_btn shadow"
          style={{ margin: '0 auto' }}
          disabled={!!!figure || false}
        >
          Pick
        </button>
      </form>
    </div>
  );
};

export default GamePickFigure;
