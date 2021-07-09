import React from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Row,
} from 'react-bootstrap';
import Title from '../../UI/Title/Title';
import { useFormField } from '../../../utils/helpers/form';
import { RouteComponentProps } from 'react-router-dom';

// redux
import { useDispatch } from 'react-redux';
import { auth } from '../../../store/users/usersSlice';
import { User } from '../../../utils/types/users';
import http from '../../../http';

function LoginForm({ history }: RouteComponentProps) {
  const userField = useFormField('username');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userField.onLocalErrors()) {
      http
        .post('/auth/login', { username: userField.props.value })
        .then(resp => {
          dispatch(auth(resp.data as User));
          history.replace('/');
        })
        .catch(error => console.error(error));
    } else {
      userField.changeInvalidValue(true);
    }
  };

  return (
    <Container
      className={'h-100 d-flex justify-content-center container-sm'}
      style={{ maxWidth: '320px' }}
    >
      <Row className="justify-content-center align-items-center">
        <Col className="p-5 rounded">
          <Title text="Sign In" />
          <Form noValidate onSubmit={event => handleSubmit(event)}>
            <FormGroup>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Username"
                  type="text"
                  {...userField.props}
                />
                <Form.Control.Feedback type="invalid">
                  {userField.errorMsg}
                </Form.Control.Feedback>
              </InputGroup>
            </FormGroup>
            <Button
              type="submit"
              className="w-100 btn btn-info btn-lgbtn-block"
            >
              Enter
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
