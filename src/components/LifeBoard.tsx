import React from 'react';
import LifeCell from './LifeCell';
import { Cell } from '../utils/types';

interface LifeBoardProps {
    cells: Cell[];
    clickCell: (id: number) => void;
}

const LifeBoard = (props: LifeBoardProps) => (
    <div className="life-board">
        {props.cells.map((cell, i) => (
            <LifeCell
                key={i}
                id={cell.id}
                cellStatus={cell.cellStatus} 
                clickCell={props.clickCell}
            />
        ))}
    </div>
);

export default LifeBoard;
