import React from 'react';
import LifeCell from './LifeCell';
import { Cell } from '../utils/types';
import { chunkArray } from '../utils';

interface LifeBoardProps {
    cells: Cell[];
    clickCell: (id: number) => void;
}

const LifeBoard = (props: LifeBoardProps) => {
    let chunkedCells = [props.cells];

    /* React doesn't like mapping over arrays of over 2000 in length
       we can avoid errors by chunking into smaller amounts */
    if (props.cells.length > 2000) {
        chunkedCells = chunkArray(2000, props.cells);
    }

    return (
        <>
            {chunkedCells.map(chunk => chunk.map((cell) => (
                <LifeCell
                    key={cell.id}
                    id={cell.id}
                    cellStatus={cell.cellStatus}
                    clickCell={props.clickCell}
                />
            )))}
        </>
    );
}

export default LifeBoard;
