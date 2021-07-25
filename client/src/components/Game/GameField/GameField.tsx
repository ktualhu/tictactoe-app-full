import React from 'react';
import { Table, Button } from 'react-bootstrap';
import '../styles/styles.css';

type GameFieldProps = {
  field: string[];
  handleCellClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

function GameField(props: GameFieldProps) {
  const renderTrBlock = (startId: number) => {
    return (
      // <tr>
      //   {props.field.slice(startId, startId + 3).map((_, i) => {
      //     return renderTdCell(i + startId);
      //   })}
      // </tr>
      <div className={`game__container__row ${startId + 3 > 6 ? 'last' : ''}`}>
        {props.field.slice(startId, startId + 3).map((_, i) => {
          return renderTdCell(i + startId);
        })}
      </div>
    );
  };

  const renderTdCell = (id: number) => {
    return (
      // <td className={styles.td}>
      //   <Button
      //     variant="light"
      //     className={`${styles.cell} cell`}
      //     id={id.toString()}
      //   ></Button>
      // </td>
      <button
        className="row__cell"
        id={id.toString()}
        onClick={props.handleCellClick}
      ></button>
    );
  };

  return (
    <React.Fragment>
      {props.field.map((_, i) => {
        return i % 3 === 0 ? renderTrBlock(i) : null;
      })}
    </React.Fragment>
    // <Table
    //   className={`${styles.table} table-borderless table-sm`}
    //   onClick={props.handleCellClick}
    // >
    //   <tbody>
    //     {props.field.map((_, i) => {
    //       return i % 3 === 0 ? renderTrBlock(i) : null;
    //     })}
    //   </tbody>
    // </Table>
  );
}

export default GameField;
