import React from 'react';
import { Message, MessageType } from '../../utils/types/chat-message';

type MessageProps = {
  message: Message;
};

function MessageComponent(props: MessageProps) {
  const getColorByMessageType = () => {
    let color = '';
    switch (props.message.type) {
      case MessageType.MESSAGE:
        color = 'bg-white';
        break;
      case MessageType.JOIN:
        color = 'bg-success';
        break;
      case MessageType.LEAVE:
        color = 'bg-danger';
        break;
      default:
        color = 'bg-white';
        break;
    }
    return color;
  };

  const renderMessageContent = () => {
    if (props.message.type === MessageType.MESSAGE) {
      return (
        <React.Fragment>
          <span className="font-weight-bold">{props.message.author}:</span>{' '}
          {props.message.text}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <span className="font-weight-bold">{props.message.author}</span>{' '}
          {props.message.text}
        </React.Fragment>
      );
    }
  };

  return (
    <span className={`p-2 ${getColorByMessageType()}`}>
      {renderMessageContent()}
    </span>
  );
}

export default MessageComponent;
