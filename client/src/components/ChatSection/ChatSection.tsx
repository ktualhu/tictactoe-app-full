import React, { useEffect, useState } from 'react';
import { Badge, Col, Tab, Tabs } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useChat } from '../../hooks/useChat';
import { currentUserSelector } from '../../store/users/usersSlice';
import { constructChatMessage } from '../../utils/helpers/constructChatMessage';
import { MessageType } from '../../utils/types/chat-message';
import Chat from './Chat/Chat';
import Logs from './Logs/Logs';

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

  const renderMsgCounter = (counter: number) => {
    if (counter) {
      if (counter > 5) return '+5';
      else return counter;
    }
    return null;
  };

  return (
    <Tabs>
      <Tab
        eventKey="chat"
        title={
          <React.Fragment>
            <Col className="h-100 d-flex justify-content-center align-items-center fs-6">
              <span className="fs-6">Chat</span>
              <Badge
                variant="primary"
                style={{
                  position: 'absolute',
                  right: '-13px',
                  top: '-5px',
                }}
              >
                {renderMsgCounter(msgCounter.chatMsgCounter)}
              </Badge>
            </Col>
          </React.Fragment>
        }
        tabClassName="bg-dark text-light"
        onEntered={() => setTabType(TabType.CHAT)}
      >
        <Chat
          roomId={props.roomId}
          addMessage={() => incMsgCounter(TabType.CHAT)}
        />
      </Tab>
      <Tab
        eventKey="logs"
        title={
          <React.Fragment>
            <Col className="h-100 d-flex justify-content-center align-items-center ">
              <span>Logs</span>
              <Badge
                variant="primary"
                style={{
                  position: 'absolute',
                  right: '-13px',
                  top: '-5px',
                }}
              >
                {renderMsgCounter(msgCounter.logsMsgCounter)}
              </Badge>
            </Col>
          </React.Fragment>
        }
        tabClassName="bg-dark text-light"
        onEntered={() => setTabType(TabType.LOGS)}
      >
        <Logs addMessage={() => incMsgCounter(TabType.LOGS)} />
      </Tab>
    </Tabs>
  );
}

export default ChatSection;
