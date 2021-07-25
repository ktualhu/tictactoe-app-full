import Loader from '../../UI/Loader/Loader';
import { DEFAULT_TIMER, ENDLESS_TIMER } from '../../../utils/constants';
import useTimer from '../../../hooks/useTimer';
import { GamePreviewState } from '../../../utils/types/game';
import { useEffect } from 'react';

type GameWaitProps = {
  simulated: boolean;
  reason: string;
  onTimesOut: (state: GamePreviewState) => void;
  previewState: GamePreviewState;
};

function GameWait(props: GameWaitProps) {
  const timer = useTimer(!props.simulated ? ENDLESS_TIMER : DEFAULT_TIMER, () =>
    props.onTimesOut(props.previewState)
  );

  useEffect(() => {
    if (props.reason) {
      timer.setNewTimer(!props.simulated ? ENDLESS_TIMER : DEFAULT_TIMER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.reason]);

  return (
    <div className="game__container__row loading">
      <div className="loading__content">
        <span>
          <Loader />
        </span>
        <span style={{ fontSize: '1.3em' }}>{props.reason}</span>
      </div>
    </div>
  );
}

export default GameWait;
