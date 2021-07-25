import { useEffect } from 'react';
import CloseSVG from '../../../images/cancel.svg';
import './styles/styles.css';

export interface IModal {
  title: string;
  show: boolean;
  content: JSX.Element;
}

type MyModalProps = {
  onHide: () => void;
  data: IModal;
};

function MyModal(props: MyModalProps) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (event.target === document.querySelector('.modal__background')) {
        props.onHide();
      }
    };
    window.addEventListener('click', listener);
    return () => {
      window.removeEventListener('click', listener);
    };
  }, []);

  return (
    <div className="modal__background">
      <div className="modal__container">
        <div
          className="header__content"
          style={{ padding: '0 0 1em 0', borderBottom: '1px solid #212529' }}
        >
          <span className="header__logo">{props.data.title}</span>
          <span className="header__middle"></span>
          <span className="header__info" onClick={props.onHide}>
            <img src={CloseSVG} className="closeBtn__img" />
          </span>
        </div>
        {props.data.content}
      </div>
    </div>
  );
}

export default MyModal;
