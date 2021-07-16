import React from 'react';
import Header from '../UI/Header/Header';
import { Container, Row, Col } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { Room } from '../../utils/types/rooms';

type LayoutProps = {
  child: JSX.Element;
  route: RouteComponentProps;
};

function Layout(props: LayoutProps) {
  return (
    <Container>
      <Row>
        <Col className="pl-2 pr-2 bg-dark text-white rounded-bottom">
          <Header />
          {React.cloneElement(props.child, {
            routes: props.route,
            handleRouting: (path: string, room?: Room) =>
              props.route.history.push(path, room),
          })}
        </Col>
      </Row>
    </Container>
  );
}

export default Layout;
