import { useEffect, useState, useRef } from 'react';
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import useTimer from '../../../hooks/useTimer';
import { GamePreviewState } from '../../../utils/types/game';
import { PICK_FIGURE_TIMER } from '../../../utils/constants';

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
    <Col>
      <Row className="justify-content-md-center mb-3">
        <h1 className="display-4" style={{ fontSize: '1.5rem' }}>
          Type desired "figure" before time is going out:{' '}
          <span className="font-weight-bold">{timer.getTimer()}</span>
        </h1>
      </Row>
      <Form
        onSubmit={event => {
          event.preventDefault();
          props.handlePickFigure(figure);
        }}
      >
        <Row className="justify-content-md-center mb-3">
          <FormGroup>
            <InputGroup>
              <FormControl
                className="form-control-lg pr-3 pl-3"
                type="text"
                maxLength={1}
                ref={inputRef}
                style={{
                  width: '50px',
                  height: '55px',
                  fontSize: '1.5rem',
                }}
                value={figure}
                onChange={event =>
                  setFigure(event.target.value.toLocaleUpperCase())
                }
              />
            </InputGroup>
          </FormGroup>
        </Row>
        <Row className="justify-content-md-center">
          <Button
            type="submit"
            variant="info"
            className="btn-lg"
            disabled={!!!figure || false}
          >
            Pick
          </Button>
        </Row>
      </Form>
    </Col>
  );
};

export default GamePickFigure;
