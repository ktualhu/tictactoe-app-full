import React from 'react';
import { Button, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import http from '../../../../http';
import { signout } from '../../../../store/users/usersSlice';

function Info() {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Row className="pr-4 justify-content-end">
        <Button
          variant="info"
          onClick={() => {
            http
              .post('/auth/logout')
              .then(() => {
                dispatch(signout());
              })
              .catch(error => console.error(error));
          }}
        >
          Sign out
        </Button>
      </Row>
    </React.Fragment>
  );
}

export default Info;
