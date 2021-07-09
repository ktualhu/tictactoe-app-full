// components
import Logo from './Logo/Logo';
import Info from './Info/Info';

import { Row, Col } from 'react-bootstrap';

function Header() {
  return (
    <Row className="p-3 border-bottom border-white">
      <Col>
        <Logo />
      </Col>
      <Col xs lg="2">
        <Info />
      </Col>
    </Row>
  );
}

export default Header;
