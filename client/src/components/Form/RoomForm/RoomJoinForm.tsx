import React from 'react';
import { useFormField } from '../../../utils/helpers/form';
import { joinRoom } from '../../../utils/helpers/joinRoomRequest';

import './styles/styles.css';
import '../../../styles/error/error.css';

type RoomProps = {
  roomId: string;
  onHide: () => void;
  onSuccess: () => void;
};

function RoomJoinForm(props: RoomProps) {
  const passwordField = useFormField('password');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!passwordField.onLocalErrors()) {
      try {
        await joinRoom(props.roomId, passwordField.props.value);
        props.onSuccess();
      } catch (err) {
        const { message } = err.response.data;
        passwordField.changeInvalidValue(true, message);
      }
    } else {
      passwordField.changeInvalidValue(true);
    }
  };

  return (
    <React.Fragment>
      <form className="modal__content" onSubmit={event => handleSubmit(event)}>
        <div className="input__box" style={{ margin: '0 0 1em 0' }}>
          <input
            type="password"
            placeholder="Room Password"
            className="modalInput"
            {...passwordField.props}
          />
        </div>
        <span className="error__msg">{passwordField.errorMsg}</span>
        <button type="submit" className="btn btn__info">
          Join
        </button>
      </form>
    </React.Fragment>
  );
}

export default RoomJoinForm;
