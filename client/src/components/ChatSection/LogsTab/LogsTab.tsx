import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getMessagesLog } from '../../../store/chat/chatSlice';
import MessageSectionLayout from '../MessageSectionLayout';

interface IProps {
  addMessage: () => void;
}

function Logs(props: IProps) {
  const messages = useSelector(getMessagesLog);

  useEffect(() => {
    if (messages.length) props.addMessage();
  }, [messages]);

  return (
    <React.Fragment>
      <MessageSectionLayout messages={messages} isLog={true} />
    </React.Fragment>
  );
}

export default Logs;
