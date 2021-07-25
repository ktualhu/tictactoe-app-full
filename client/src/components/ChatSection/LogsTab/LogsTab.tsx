import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getMessagesLog } from '../../../store/chat/chatSlice';
import MessageSectionLayout from '../MessageSectionLayout';

import '../styles/styles.css';
import ChatSVG from '../../../images/chat.svg';

interface IProps {
  addMessage: () => void;
  isOpen: boolean;
  chatMsgCounter: number;
  onChangeTab: () => void;
}

function Logs(props: IProps) {
  const messages = useSelector(getMessagesLog);

  useEffect(() => {
    if (messages.length) props.addMessage();
  }, [messages]);

  const renderUnreadMsgCounter = () => {
    if (props.chatMsgCounter) {
      return (
        <div className="chat__msgNotify">
          {props.chatMsgCounter > 5 ? '+5' : props.chatMsgCounter}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={props.isOpen ? { display: 'block' } : { display: 'none' }}>
      <MessageSectionLayout
        messages={messages}
        isLog={true}
        isOpen={props.isOpen}
      />
      <div className="chat__formBlock">
        <div className="chat__formBlock__form">
          <button
            className="chatBtn logs"
            style={{ position: 'relative' }}
            onClick={props.onChangeTab}
          >
            {renderUnreadMsgCounter()}
            <img src={ChatSVG} className="chatBtn__img" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logs;
