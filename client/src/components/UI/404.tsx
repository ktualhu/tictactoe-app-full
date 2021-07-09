import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import Title from './Title/Title';

function NotFound({ history }: RouteComponentProps) {
  const [msg, setMsg] = useState('');
  useEffect(() => {
    if (history.location.state) {
      setMsg(history.location.state as string);
    } else {
      history.replace('/');
    }
  }, []);
  return (
    <Container className="h-100 d-flex justify-content-center">
      <Row className="justify-content-center align-items-center">
        <Col>
          <Title text="404 Error" />
          <p className="font-weight-light">{msg}</p>
          <Link to="/">
            <p className="font-weight">Back to main</p>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
