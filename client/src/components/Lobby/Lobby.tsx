// components
import React, { useEffect } from 'react';
import MyTable from '../UI/Table/Table';

// bootstrap
import Title from '../UI/Title/Title';
import MyModal, { IModal } from '../UI/Modal/MyModal';
import { RouteComponentProps } from 'react-router-dom';
import http from '../../http';
import { useDispatch, useSelector } from 'react-redux';
import { roomsAllSelector } from '../../store/rooms/roomsSlice';
import { useLobby } from '../../hooks/useLobby';
import { currentUserSelector } from '../../store/users/usersSlice';
import { updateRooms } from '../../store/rooms/roomsSlice';
import RoomCreateForm from '../Form/RoomForm/RoomCreateForm';
import RoomJoinForm from '../Form/RoomForm/RoomJoinForm';
import { joinRoom } from '../../utils/helpers/joinRoomRequest';

import './styles/styles.css';
import EmptyRoomList from './EmptyRoomList/EmptyRoomList';
import RoomList from './RoomList/RoomList';

type LobbyProps = {
  routes?: RouteComponentProps;
  handleRouting?: (path: string) => void;
};

function Lobby(props: LobbyProps) {
  const [modal, setModal] = React.useState({
    title: '',
    show: false,
    content: {} as JSX.Element,
  } as IModal);
  const rooms = useSelector(roomsAllSelector);
  const currentUser = useSelector(currentUserSelector);
  const dispatch = useDispatch();
  const { userJoin } = useLobby();

  useEffect(() => {
    http
      .get('/rooms')
      .then(resp => {
        if (resp.data.rooms) {
          dispatch(updateRooms(resp.data.rooms));
        }
        if (resp.data.room_id)
          props.routes?.history.replace(`/rooms/${resp.data.room_id}`);
      })
      .catch(error => console.error(error));
    userJoin(currentUser.username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateRoom = () => {
    setModal({
      title: 'Create Room',
      show: true,
      content: (
        <RoomCreateForm currentUser={currentUser.username} onHide={hideModal} />
      ),
    });
  };

  const hideModal = () => {
    setModal({ title: '', show: false, content: {} as JSX.Element });
  };

  const handleJoinRoom = (id: string) => {
    const isPrivate =
      !!rooms.find(room => room.roomId === id)?.roomPrivate || false;
    if (!isPrivate) goToRoom(id);
    else {
      setModal({
        title: 'Enter Room',
        show: true,
        content: (
          <RoomJoinForm
            roomId={id}
            onHide={hideModal}
            onSuccess={() => goToRoom(id, true)}
          />
        ),
      });
    }
  };

  const goToRoom = async (id: string, fromModal?: boolean) => {
    !fromModal && (await joinRoom(id));
    props.handleRouting && props.handleRouting('/rooms/' + id);
  };

  const renderModal = () => {
    return modal.show ? <MyModal onHide={hideModal} data={modal} /> : null;
  };

  return (
    <React.Fragment>
      {renderModal()}
      {!rooms.length ? (
        <EmptyRoomList handleCreateRoom={handleCreateRoom} />
      ) : (
        <RoomList
          currentUser={currentUser.username}
          handleCreateRoom={handleCreateRoom}
          handleJoinRoom={(id: string) => handleJoinRoom(id)}
          rooms={rooms}
        />
      )}
    </React.Fragment>
  );
}

export default Lobby;
