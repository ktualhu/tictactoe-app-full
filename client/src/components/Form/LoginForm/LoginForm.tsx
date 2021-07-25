import React from 'react';
import { useFormField } from '../../../utils/helpers/form';
import { RouteComponentProps } from 'react-router-dom';

// redux
import { useDispatch } from 'react-redux';
import { auth } from '../../../store/users/usersSlice';
import { User } from '../../../utils/types/users';
import http from '../../../http';

import './styles/styles.css';
import '../../../styles/forms/forms.css';
import '../../../styles/error/error.css';

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
    <div className="auth__block">
      <form className="auth" onSubmit={event => handleSubmit(event)}>
        <span className="auth__title">Sign In</span>
        <div className="input__box">
          <span className="prefix">@</span>
          <input
            type="text"
            style={{ padding: '.8em' }}
            placeholder="Username"
            {...userField.props}
          />
        </div>
        <span className="error__msg">{userField.errorMsg}</span>
        <button className="btn btn__info auth_btn shadow">Sign In</button>
      </form>
    </div>
    // <Container
    //   classNameName={'h-100 d-flex justify-content-center container-sm'}
    //   style={{ maxWidth: '320px' }}
    // >
    //   <Row classNameName="justify-content-center align-items-center">
    //     <Col classNameName="p-5 rounded">
    //       <Title text="Sign In" />
    //       <Form noValidate onSubmit={event => handleSubmit(event)}>
    //         <FormGroup>
    //           <InputGroup classNameName="mb-3">
    //             <InputGroup.Prepend>
    //               <InputGroup.Text>@</InputGroup.Text>
    //             </InputGroup.Prepend>
    //             <FormControl
    //               placeholder="Username"
    //               type="text"
    //               {...userField.props}
    //             />
    //             <Form.Control.Feedback type="invalid">
    //               {userField.errorMsg}
    //             </Form.Control.Feedback>
    //           </InputGroup>
    //         </FormGroup>
    //         <Button
    //           type="submit"
    //           classNameName="w-100 btn btn-info btn-lgbtn-block"
    //         >
    //           Enter
    //         </Button>
    //       </Form>
    //     </Col>
    //   </Row>
    // </Container>
  );
}

export default LoginForm;
