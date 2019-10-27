import React from 'react';
import { Cell } from '../App';

enum CellKey {
    'dead-cell',
    'young-cell',
    'old-cell'
}

interface Props {
    cell: Cell;
    clickCell: any;
}

const LifeCell = (props: Props) => {
    const { cellStatus, id } = props.cell;
    const cellStyle = CellKey[cellStatus];

    return <div className={`life-cell ${cellStyle}`} onClick={() => props.clickCell(id)} />
}

export default LifeCell
