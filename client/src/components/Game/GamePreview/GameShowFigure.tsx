import { GameUser } from '../../../utils/types/game';

import '../styles/styles.css';

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
  <div className="game__container__row loading">
    <div className="loading__content">
      <span style={{ fontSize: '1.3em', marginBottom: '1em' }}>
        {props.showData.text}
        <span style={{ textDecoration: 'underline' }}>
          {props.showData.data}
        </span>
      </span>
      <button
        type="submit"
        className="btn btn__info auth_btn shadow"
        style={{ margin: '0 auto' }}
        onClick={props.handlePickFigure}
      >
        OK
      </button>
    </div>
  </div>
);

export default GameShowFigure;
