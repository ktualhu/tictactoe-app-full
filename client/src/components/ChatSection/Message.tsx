import React from 'react';
import { Message, MessageType } from '../../utils/types/chat-message';

import './styles/styles.css';

type MessageProps = {
  message: Message;
  currentUser: string | null;
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
        <div className="chat__message">
          <div className="chat__message__infoUsername">
            by
            <span
              style={{
                fontWeight: 'bold',
                fontStyle: 'normal',
                marginLeft: '.4em',
              }}
            >
              {props.message.author === props.currentUser
                ? 'You'
                : props.message.author}
            </span>
          </div>
          {props.message.text}
          {/* <div className="chat__message__info">17:03</div> */}
        </div>
      );
    }
    return (
      <div className="chat__message" style={{ minWidth: '100%' }}>
        <span style={{ fontWeight: 'bold' }}>{props.message.author}</span>{' '}
        {props.message.text}
        {/* <div className="chat__message__info">17:03</div> */}
      </div>
    );
    // else {
    //   return (
    //     <React.Fragment>
    //       <span className="font-weight-bold">{props.message.author}</span>{' '}
    //       {props.message.text}
    //     </React.Fragment>
    //   );
    // }
  };

  return (
    // <span className={`p-2 ${getColorByMessageType()}`}>
    renderMessageContent()
    // </span>
  );
}

export default MessageComponent;
