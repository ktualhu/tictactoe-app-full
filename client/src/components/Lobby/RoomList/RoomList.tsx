import React from 'react';
import { Room } from '../../../utils/types/rooms';

import PeopleSVG from '../../../images/people.svg';
import '../styles/styles.css';
import '../../../styles/badges/badges.css';

interface IProps {
  currentUser: string;
  handleCreateRoom: () => void;
  handleJoinRoom: (id: string) => void;
  rooms: Room[];
}

function RoomList(props: IProps) {
  const { rooms } = props;
  return (
    <React.Fragment>
      <div className="row row__title">
        <div className="block">
          <span className="block__title">title</span>
        </div>
        <div className="block">
          <img src={PeopleSVG} alt="People" />
          <span className="block__title">people</span>
        </div>
        <div className="block">
          <button className="btn btn__success" onClick={props.handleCreateRoom}>
            Create Room
          </button>
        </div>
      </div>
      {rooms.map(room => {
        return (
          <div className="row">
            <div className="block">
              <span className="block__title">
                {room.roomTitle.length < 32
                  ? room.roomTitle
                  : room.roomTitle.slice(0, 31).concat('...')}
                {room.roomPrivate ||
                room.roomCreatorId === props.currentUser ? (
                  <span className="badge__block">
                    {room.roomCreatorId === props.currentUser ? (
                      <span className="badge badge__owner">owner</span>
                    ) : null}
                    {room.roomPrivate ? (
                      <span className="badge badge__private">private</span>
                    ) : null}
                  </span>
                ) : null}
              </span>
            </div>
            <div className="block">
              <span className="room__people">{room.roomUsers.length} / 2</span>
            </div>
            <div className="block">
              <button
                className="btn btn__success"
                onClick={() => props.handleJoinRoom(room.roomId)}
                disabled={room.roomUsers.length >= 2}
              >
                Join Room
              </button>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default RoomList;
