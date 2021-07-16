import { Row } from 'react-bootstrap';

type TitleProps = {
  text: string;
};

function Title(props: TitleProps) {
  return (
    <Row className="pt-1 pb-1 justify-content-center">
      <h4 className="display-4">{props.text}</h4>
    </Row>
  );
}

export default Title;
