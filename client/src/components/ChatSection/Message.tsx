import { Message, MessageType } from '../../utils/types/chat-message';

import './styles/styles.css';

type MessageProps = {
  message: Message;
  currentUser: string | null;
};

function MessageComponent(props: MessageProps) {
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
        <span style={{ fontWeight: 'bold', marginRight: '.4em' }}>
          {props.message.author}
        </span>
        {props.message.text}
      </div>
    );
  };

  return renderMessageContent();
}

export default MessageComponent;
