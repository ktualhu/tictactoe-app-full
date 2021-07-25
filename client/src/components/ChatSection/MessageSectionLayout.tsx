import React, { useEffect } from 'react';
import { Message } from '../../utils/types/chat-message';
import MessageComponent from './Message';

import './styles/styles.css';

interface IProps {
  messages: Message[];
  isLog: boolean;
  isOpen: boolean;
  currentUser?: string;
}

function MessageSectionLayout(props: IProps) {
  const bottomRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    props.isOpen && scrollToBottom();
  }, [props.isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [props.messages.length]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chat__messagesBlock">
      {props.messages.length ? (
        props.messages.map((message: Message) => {
          return (
            <div
              className={`chat__messagesBlock__str chat__messagesBlock__str${
                message.author === props.currentUser || props.isLog
                  ? '__left'
                  : '__right'
              } `}
            >
              <MessageComponent
                message={message}
                currentUser={props.currentUser || null}
              />
            </div>
          );
        })
      ) : (
        <div className="chat__messageBlock__empty">
          <div className="chat__messagesBlock__str">
            <div className="chat__message" style={{ minWidth: '100%' }}>
              No Any Messages Yet
            </div>
          </div>
        </div>
      )}
      <div ref={bottomRef}></div>
    </div>
  );
}

export default MessageSectionLayout;
