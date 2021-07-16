import React from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import http from '../../../http';
import { useFormField } from '../../../utils/helpers/form';
import { joinRoom } from '../../../utils/helpers/joinRoomRequest';

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
    <Form noValidate onSubmit={event => handleSubmit(event)}>
      <Form.Group>
        <Form.Control
          placeholder="Password"
          type="password"
          {...passwordField.props}
        />
        <Form.Control.Feedback type="invalid">
          {passwordField.errorMsg}
        </Form.Control.Feedback>
      </Form.Group>
      <FormGroup>
        <Button type="submit" className="w-100 btn btn-info btn-lgbtn-block">
          Enter
        </Button>
      </FormGroup>
    </Form>
  );
}

export default RoomJoinForm;
