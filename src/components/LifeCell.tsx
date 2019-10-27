import React from 'react';
import { Cell } from '../types';

enum CellKey {
    'dead-cell',
    'young-cell',
    'old-cell'
}

interface LifeCellProps {
    cell: Cell;
    clickCell: (id: number) => void;
}

const LifeCell = (props: LifeCellProps) => {
    const { cellStatus, id } = props.cell;
    const cellStyle = CellKey[cellStatus];

    return <div className={`life-cell ${cellStyle}`} onClick={() => props.clickCell(id)} />
}

export default LifeCell
