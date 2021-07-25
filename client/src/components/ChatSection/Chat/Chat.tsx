import React, { useEffect, useState } from 'react';
import { Message, MessageType } from '../../../utils/types/chat-message';

import { useChat } from '../../../hooks/useChat';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../../store/users/usersSlice';
import { getMessages } from '../../../store/chat/chatSlice';
import { constructChatMessage } from '../../../utils/helpers/constructChatMessage';
import MessageSectionLayout from '../MessageSectionLayout';

import '../styles/styles.css';
import LogsSVG from '../../../images/logs.svg';
import SendSVG from '../../../images/send.svg';

interface IProps {
  roomId: string;
  addMessage: () => void;
  isOpen: boolean;
  logsMsgCounter: number;
  onChangeTab: () => void;
}

function Chat(props: IProps) {
  const messages = useSelector(getMessages);
  const currentUser = useSelector(currentUserSelector);
  const [message, setMessage] = useState({
    text: '',
    type: MessageType.MESSAGE,
  } as Message);

  const { sendMessage } = useChat();

  useEffect(() => {
    if (messages.length) props.addMessage();
  }, [messages]);

  const handleMessageSend = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!message.text) return;
    sendMessage(props.roomId, createNewMessage());
  };

  const createNewMessage = (type: MessageType = MessageType.MESSAGE) => {
    const msg = constructChatMessage(currentUser.username, type, message.text);
    setMessage({ text: '', type: MessageType.MESSAGE, author: '' });
    return msg;
  };

  const renderUnreadMsgCounter = () => {
    if (props.logsMsgCounter) {
      return (
        <div className="chat__msgNotify">
          {props.logsMsgCounter > 5 ? '+5' : props.logsMsgCounter}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={props.isOpen ? { display: 'block' } : { display: 'none' }}>
      <MessageSectionLayout
        currentUser={currentUser.username}
        messages={messages}
        isLog={false}
        isOpen={props.isOpen}
      />
      <div className="chat__formBlock">
        <form
          className="chat__formBlock__form"
          onSubmit={event => handleMessageSend(event)}
        >
          <button
            className="chatBtn"
            style={{ position: 'relative' }}
            onClick={props.onChangeTab}
          >
            <img src={LogsSVG} className="chatBtn__img" />
            {renderUnreadMsgCounter()}
          </button>
          <input
            type="text"
            className="input"
            placeholder="Your message..."
            value={message.text}
            onChange={event =>
              setMessage({
                text: event.target.value,
                type: MessageType.MESSAGE,
              } as Message)
            }
          />
          <button className="chatBtn">
            <img src={SendSVG} className="chatBtn__img" />
          </button>
        </form>
      </div>
    </div>
    // <React.Fragment>
    //   <MessageSectionLayout
    //     messages={messages}
    //     isLog={false}
    //     isOpen={props.isOpen}
    //   />
    //   <Form onSubmit={event => handleMessageSend(event)}>
    //     <InputGroup>
    //       <FormControl
    //         placeholder="Your message"
    //         aria-label="Your message"
    //         value={message.text}
    //         onChange={event =>
    //           setMessage({
    //             text: event.target.value,
    //             type: MessageType.MESSAGE,
    //           } as Message)
    //         }
    //       />
    //       <Button type="submit" variant="info" id="button-addon2">
    //         Send
    //       </Button>
    //     </InputGroup>
    //   </Form>
    // </React.Fragment>
  );
}

export default Chat;
