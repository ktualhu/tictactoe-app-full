import { Modal } from 'react-bootstrap';

export interface IModal {
  title: string;
  show: boolean;
  content: JSX.Element;
}

type MyModalProps = {
  onHide: () => void;
  data: IModal;
};

function MyModal(props: MyModalProps) {
  return (
    <Modal
      show={props.data.show}
      onHide={props.onHide}
      centered
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.data.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.data.content}</Modal.Body>
    </Modal>
  );
}

export default MyModal;
