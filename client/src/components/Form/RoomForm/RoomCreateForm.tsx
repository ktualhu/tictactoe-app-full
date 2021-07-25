import React, { useState } from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
} from 'react-bootstrap';
import { useFormField } from '../../../utils/helpers/form';
import { Room } from '../../../utils/types/rooms';
import http from '../../../http';
import { useLobby } from '../../../hooks/useLobby';

import './styles/styles.css';
import '../../../styles/error/error.css';

type RoomProps = {
  currentUser: string;
  onHide: () => void;
};

function RoomCreateForm(props: RoomProps) {
  const [showPassword, setShowPassword] = useState(false);
  const roomTitle = useFormField('title');
  const roomPassword = useFormField('password');
  const { createRoom } = useLobby();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      (!roomTitle.onLocalErrors() && !showPassword) ||
      (!roomTitle.onLocalErrors() &&
        showPassword &&
        !roomPassword.onLocalErrors())
    ) {
      http
        .post('/rooms/new', {
          roomTitle: roomTitle.props.value,
          roomPassword: roomPassword.props.value || '',
          roomPrivate: showPassword,
          roomCreatorId: props.currentUser,
        })
        .then(resp => {
          if (resp.data) {
            createRoom(resp.data as Room);
            props.onHide();
          }
        })
        .catch(error => console.error(error));
    } else {
      if (roomTitle.onLocalErrors()) roomTitle.changeInvalidValue(true);
      if (roomPassword.onLocalErrors() && showPassword)
        roomPassword.changeInvalidValue(true);
    }
  };

  return (
    <React.Fragment>
      <form className="modal__content" onSubmit={event => handleSubmit(event)}>
        <div className="input__box" style={{ margin: '0 0 1em 0' }}>
          <input
            type="text"
            placeholder="Room Title"
            className="modalInput"
            {...roomTitle.props}
          />
        </div>
        <span className="error__msg">{roomTitle.errorMsg}</span>
        <input
          type="checkbox"
          id="roomCheck"
          className="checkbox"
          onClick={() => setShowPassword(!showPassword)}
        />
        <label className="checkboxLabel" htmlFor="roomCheck">
          Make room private
        </label>
        {showPassword ? (
          <div className="input__box" style={{ margin: '0 0 1em 0' }}>
            <input
              type="password"
              placeholder="Room Password"
              className="modalInput"
              {...roomPassword.props}
            />
          </div>
        ) : null}
        <span className="error__msg">{roomPassword.errorMsg}</span>
        <button className="btn btn__info">Create</button>
      </form>
    </React.Fragment>
    // <Form noValidate onSubmit={event => handleSubmit(event)}>
    //   <FormGroup>
    //     <InputGroup className="mb-3">
    //       <FormControl placeholder="Title" type="text" {...roomTitle.props} />
    //       <Form.Control.Feedback type="invalid">
    //         {roomTitle.errorMsg}
    //       </Form.Control.Feedback>
    //     </InputGroup>
    //     {showPassword ? (
    //       <InputGroup className={showPassword ? 'mb-3' : ''}>
    //         <FormControl
    //           placeholder="Password"
    //           type="password"
    //           {...roomPassword.props}
    //         />
    //         <Form.Control.Feedback type="invalid">
    //           {roomPassword.errorMsg}
    //         </Form.Control.Feedback>
    //       </InputGroup>
    //     ) : null}
    //   </FormGroup>
    //   <FormGroup>
    //     <Form.Check
    //       type="checkbox"
    //       label="Make room private"
    //       onClick={() => setShowPassword(!showPassword)}
    //     />
    //   </FormGroup>
    //   <FormGroup>
    //     <Button type="submit" className="w-100 btn btn-info btn-lgbtn-block">
    //       Create
    //     </Button>
    //   </FormGroup>
    // </Form>
  );
}

export default RoomCreateForm;
