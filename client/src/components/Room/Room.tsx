import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { useGame } from '../../hooks/useGame';
import { useRooms } from '../../hooks/useRooms';
import http from '../../http';
import { leaveChatAlert } from '../../store/chat/chatSlice';
import RootState from '../../store/state/rootState';
import {
  currentUserSelector,
  updateMyUser,
} from '../../store/users/usersSlice';
import { getRoomById } from '../../utils/helpers/selectRoom';
import ChatSection from '../ChatSection/ChatSection';
import Game from '../Game/Game';

import './styles/styles.css';

type MatchParams = {
  id: string;
};

type RoomProps = {
  handleRouting?: (path: string) => void;
  routes?: RouteComponentProps<MatchParams>;
  roomId?: string;
};

function RoomComponent(props: RoomProps) {
  const [restartBtnActive, setRestartBtnActive] = useState(false);
  const { joinRoom, leaveRoom } = useRooms();
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const roomId = props.roomId || props.routes?.match.params.id;
  const room = useSelector((state: RootState) =>
    roomId ? getRoomById(state, roomId) : null
  );
  const game = useGame({
    roomId: roomId!,
    username: currentUser.username,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        await http.get(`/rooms/${roomId}`);
        dispatch(updateMyUser(roomId!));
        roomId && joinRoom(roomId, currentUser.username);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRestartGame = () => {
    // dispatch(changeGameStateType(GameStateType.RESTART));
    game.gameRestart();
  };

  const handleLeaveRoom = () => {
    http.post('/rooms/leave').then(() => {
      dispatch(updateMyUser(''));
      dispatch(leaveChatAlert());
      props.handleRouting && props.handleRouting('/');
      leaveRoom(props.routes?.match.params.id!, currentUser.username);
    });
  };

  if (room) {
    return (
      <React.Fragment>
        <div className="header__content">
          <span className="header__logo">{room.roomTitle}</span>
          <span className="header__middle"></span>
          <span className="header__info">
            <button
              className="btn btn__info"
              onClick={handleRestartGame}
              disabled={!restartBtnActive}
            >
              Restart
            </button>
            <button
              className="btn btn__info"
              style={{ marginLeft: '.3em' }}
              onClick={handleLeaveRoom}
            >
              Back To Lobby
            </button>
          </span>
        </div>
        <div className="content__grid">
          <Game
            roomId={roomId!}
            playersCounter={room.roomUsers.length}
            onGameReady={(val: boolean) => setRestartBtnActive(val)}
          />
          <ChatSection roomId={roomId!} />
        </div>
        <footer className="pagination">
          <div className="pagination__content"></div>
        </footer>
      </React.Fragment>
    );
  }
  return null;
}

export default RoomComponent;
