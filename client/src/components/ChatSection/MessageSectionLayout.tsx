import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Message } from '../../utils/types/chat-message';
import MessageComponent from './Message';

interface IProps {
  messages: Message[];
  isLog: boolean;
}

function MessageSectionLayout(props: IProps) {
  return (
    <Container
      className="p-1 bg-light text-dark overflow-auto"
      style={{ height: !props.isLog ? '400px' : '438px' }}
    >
      {props.messages.length ? (
        props.messages.map((message: Message) => {
          return (
            <Row
              key={message.id!}
              className="m-1 mb-2 d-flex justify-content-start"
            >
              <MessageComponent message={message} />
            </Row>
          );
        })
      ) : (
        <span className="col-10 p-2 rounded shadow-sm p-3 bg-white rounded">
          No messages yet
        </span>
      )}
    </Container>
  );
}

export default MessageSectionLayout;
