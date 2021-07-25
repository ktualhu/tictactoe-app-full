import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import '../styles/styles.css';

interface IProps {
  handleCreateRoom: () => void;
}

function EmptyRoomList(props: IProps) {
  return (
    <React.Fragment>
      <div className="row row__title empty">Room list is empty</div>
      <div className="row row__title empty">
        <button className="btn btn__success" onClick={props.handleCreateRoom}>
          Create Room
        </button>
      </div>
    </React.Fragment>
  );
}

export default EmptyRoomList;
