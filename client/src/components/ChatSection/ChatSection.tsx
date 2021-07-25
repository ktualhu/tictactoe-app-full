import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChat } from '../../hooks/useChat';
import { currentUserSelector } from '../../store/users/usersSlice';
import { constructChatMessage } from '../../utils/helpers/constructChatMessage';
import { MessageType } from '../../utils/types/chat-message';
import Chat from './Chat/Chat';
import Logs from './LogsTab/LogsTab';

import './styles/styles.css';

enum TabType {
  CHAT,
  LOGS,
}

interface IProps {
  roomId: string;
}

function ChatSection(props: IProps) {
  const [msgCounter, setMsgCounter] = React.useState({
    chatMsgCounter: 0,
    logsMsgCounter: 0,
  });
  const [tabType, setTabType] = React.useState(TabType.CHAT);
  const currentUser = useSelector(currentUserSelector);
  const { showChatJoinAlert } = useChat();

  useEffect(() => {
    showChatJoinAlert(
      props.roomId,
      constructChatMessage(currentUser.username, MessageType.JOIN)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMsgCounter(prevState => {
      if (tabType === TabType.CHAT) {
        return {
          chatMsgCounter: 0,
          logsMsgCounter: prevState.logsMsgCounter,
        };
      }
      return {
        chatMsgCounter: prevState.chatMsgCounter,
        logsMsgCounter: 0,
      };
    });
  }, [tabType]);

  const incMsgCounter = (type: TabType) => {
    if (tabType !== type) {
      setMsgCounter(prevState => {
        if (type === TabType.CHAT) {
          return {
            chatMsgCounter: prevState.chatMsgCounter + 1,
            logsMsgCounter: prevState.logsMsgCounter,
          };
        }
        return {
          chatMsgCounter: prevState.chatMsgCounter,
          logsMsgCounter: prevState.logsMsgCounter + 1,
        };
      });
    }
  };

  return (
    <div className="chatBlock">
      <div className="chat__container">
        <Chat
          roomId={props.roomId}
          addMessage={() => incMsgCounter(TabType.CHAT)}
          isOpen={tabType === TabType.CHAT || false}
          logsMsgCounter={msgCounter.logsMsgCounter}
          onChangeTab={() => setTabType(TabType.LOGS)}
        />
        <Logs
          addMessage={() => incMsgCounter(TabType.LOGS)}
          isOpen={tabType === TabType.LOGS || false}
          chatMsgCounter={msgCounter.chatMsgCounter}
          onChangeTab={() => setTabType(TabType.CHAT)}
        />
      </div>
    </div>
  );
}

export default ChatSection;
