import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Row,
  Form,
} from 'react-bootstrap';
import { Message, MessageType } from '../../../utils/types/chat-message';

import { useChat } from '../../../hooks/useChat';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../../store/users/usersSlice';
import { getMessages } from '../../../store/chat/chatSlice';
import { constructChatMessage } from '../../../utils/helpers/constructChatMessage';
import MessageSectionLayout from '../MessageSectionLayout';

interface IProps {
  roomId: string;
  addMessage: () => void;
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

  return (
    <React.Fragment>
      <MessageSectionLayout messages={messages} isLog={false} />
      <Form onSubmit={event => handleMessageSend(event)}>
        <InputGroup>
          <FormControl
            placeholder="Your message"
            aria-label="Your message"
            value={message.text}
            onChange={event =>
              setMessage({
                text: event.target.value,
                type: MessageType.MESSAGE,
              } as Message)
            }
          />
          <Button type="submit" variant="info" id="button-addon2">
            Send
          </Button>
        </InputGroup>
      </Form>
    </React.Fragment>
  );
}

export default Chat;
