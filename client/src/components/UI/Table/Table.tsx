import { Badge, Button, Row, Table } from 'react-bootstrap';
import { Room } from '../../../utils/types/rooms';

type MyTableProps = {
  handleCreateRoom: () => void;
  handleJoinRoom: (id: string) => void;
  rooms: Room[];
};

function MyTable(props: MyTableProps) {
  return (
    <Row className="ml-1 mr-1 bg-dark text-white">
      <Table bordered={false} variant="dark">
        <tbody>
          <tr>
            <td>
              <h4 className="display-6">Rooms</h4>
            </td>
            <td>
              <Row className="justify-content-center">
                <h4 className="display-6">People</h4>
              </Row>
            </td>
            <td>
              <Row className="pr-4 justify-content-end">
                <Button variant="info" onClick={props.handleCreateRoom}>
                  Create Room
                </Button>
              </Row>
            </td>
          </tr>
          {props.rooms
            ? props.rooms.map(room => {
                return (
                  <tr key={room.roomId}>
                    <td>
                      {room.roomTitle}
                      {room.roomPrivate ? (
                        <Badge className="ml-1" variant="secondary">
                          private
                        </Badge>
                      ) : null}
                    </td>
                    <td>
                      <Row className="justify-content-center">
                        {room.roomUsers.length} / 2
                      </Row>
                    </td>
                    <td>
                      <Row className="pr-4 justify-content-end">
                        <Button
                          variant="info"
                          disabled={room.roomUsers.length >= 2}
                          onClick={() => props.handleJoinRoom(room.roomId)}
                        >
                          Join Room
                        </Button>
                      </Row>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </Row>
  );
}

export default MyTable;
