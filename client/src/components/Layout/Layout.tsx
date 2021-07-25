import React from 'react';
import Header from '../UI/Header/Header';
// import { Container, Row, Col } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { Room } from '../../utils/types/rooms';

import './styles/styles.css';

type LayoutProps = {
  child: JSX.Element;
  route: RouteComponentProps;
};

function Layout(props: LayoutProps) {
  return (
    <div className="container">
      <Header />
      <div className="content">
        {React.cloneElement(props.child, {
          routes: props.route,
          handleRouting: (path: string, room?: Room) =>
            props.route.history.push(path, room),
        })}
      </div>
    </div>
  );
}

export default Layout;
