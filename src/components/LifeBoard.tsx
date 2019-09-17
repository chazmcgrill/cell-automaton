import React from 'react';
import LifeCell from './LifeCell';

interface Cell {
  id: number;
  cellStatus: number;
}

interface Props {
  cells: Cell[];
  clickCell: any;
  
}

const LifeBoard = (props: Props) => (
  <div className="life-board">
    {props.cells.map((cell, i) => (
      <LifeCell key={i} cell={cell} clickCell={props.clickCell} />
    ))}
  </div>
);

export default LifeBoard;
