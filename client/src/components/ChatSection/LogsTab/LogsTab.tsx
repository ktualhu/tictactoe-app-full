import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getMessagesLog } from '../../../store/chat/chatSlice';
import MessageSectionLayout from '../MessageSectionLayout';

interface IProps {
  addMessage: () => void;
  isOpen: boolean;
}

function Logs(props: IProps) {
  const messages = useSelector(getMessagesLog);

  useEffect(() => {
    if (messages.length) props.addMessage();
  }, [messages]);

  return (
    <React.Fragment>
      <MessageSectionLayout
        messages={messages}
        isLog={true}
        isOpen={props.isOpen}
      />
    </React.Fragment>
  );
}

export default Logs;
