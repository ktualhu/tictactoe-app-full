import { Row, Col } from 'react-bootstrap';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <Col>
      <Row className="justify-content-md-center">
        <Loader />
      </Row>
      <Row className="justify-content-md-center">
        <h4 className="display-4" style={{ fontSize: '1.5rem' }}>
          {props.reason}
        </h4>
      </Row>
    </Col>
  );
}

export default GameWait;
