import { Row, Col, Button } from 'react-bootstrap';
import { GameUser } from '../../../utils/types/game';

export interface ShowScreenData {
  text: string;
  data: string;
}

type GameShowFigureProps = {
  gameUser?: GameUser;
  handlePickFigure: () => void;
  showData: ShowScreenData;
};

const GameShowFigure = (props: GameShowFigureProps) => (
  <Col>
    <Row className="justify-content-md-center mb-3">
      <h4 className="display-4" style={{ fontSize: '1.5rem' }}>
        {props.showData.text}
        <span className="font-weight-bold">{props.showData.data}</span>
      </h4>
    </Row>
    <Row className="justify-content-md-center">
      <Button
        variant="info"
        className="btn-lg"
        onClick={props.handlePickFigure}
      >
        OK
      </Button>
    </Row>
  </Col>
);

export default GameShowFigure;
