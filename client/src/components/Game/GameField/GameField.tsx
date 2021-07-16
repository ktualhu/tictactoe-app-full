import { Table, Button } from 'react-bootstrap';
import styles from '../Game.module.css';

type GameFieldProps = {
  field: string[];
  handleCellClick: (
    event: React.MouseEvent<HTMLTableElement, MouseEvent>
  ) => void;
};

function GameField(props: GameFieldProps) {
  const renderTrBlock = (startId: number) => {
    return (
      <tr>
        {props.field.slice(startId, startId + 3).map((_, i) => {
          return renderTdCell(i + startId);
        })}
      </tr>
    );
  };

  const renderTdCell = (id: number) => {
    return (
      <td className={styles.td}>
        <Button
          variant="light"
          className={`${styles.cell} cell`}
          id={id.toString()}
        ></Button>
      </td>
    );
  };

  return (
    <Table
      className={`${styles.table} table-borderless table-sm`}
      onClick={props.handleCellClick}
    >
      <tbody>
        {props.field.map((_, i) => {
          return i % 3 === 0 ? renderTrBlock(i) : null;
        })}
      </tbody>
    </Table>
  );
}

export default GameField;
