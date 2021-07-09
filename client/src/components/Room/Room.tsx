import React, { useEffect } from 'react';
import { Button, Col, Row, Tabs, Tab, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { useGame } from '../../hooks/useGame';
import { useRooms } from '../../hooks/useRooms';
import http from '../../http';
import RootState from '../../store/state/rootState';
import {
  currentUserSelector,
  updateMyUser,
} from '../../store/users/usersSlice';
import { getRoomById } from '../../utils/helpers/selectRoom';
import Chat from '../ChatSection/Chat/Chat';
import ChatSection from '../ChatSection/ChatSection';
import Game from '../Game/Game';

type MatchParams = {
  id: string;
};

type RoomProps = {
  handleRouting?: (path: string) => void;
  routes?: RouteComponentProps<MatchParams>;
};

function RoomComponent(props: RoomProps) {
  const { joinRoom, leaveRoom } = useRooms();
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const roomId = props.routes?.match.params.id;
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
        props.routes?.history.replace('/404', e.response.data.message);
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
      props.handleRouting && props.handleRouting('/');
      leaveRoom(props.routes?.match.params.id!, currentUser.username);
    });
  };

  if (room) {
    return (
      <React.Fragment>
        <Row className="p-3">
          <Col>
            <Row className="pl-3">
              <h3>{room.roomTitle}</h3>
            </Row>
          </Col>
          <Col>
            <Row className="pr-4 justify-content-end">
              <Button
                variant="info"
                className="mr-3"
                onClick={handleRestartGame}
              >
                Restart
              </Button>
              <Button variant="info" onClick={handleLeaveRoom}>
                Back To Lobby
              </Button>
            </Row>
          </Col>
        </Row>
        <Row className="pl-3 pr-4 pb-4">
          <Col>
            <Game roomId={roomId!} playersCounter={room.roomUsers.length} />
          </Col>
          <Col>{roomId ? <ChatSection roomId={roomId} /> : null}</Col>
        </Row>
      </React.Fragment>
    );
  }
  return null;
}

export default RoomComponent;
