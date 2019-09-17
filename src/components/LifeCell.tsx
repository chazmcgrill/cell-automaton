import React from 'react';

enum CellKey {
    'dead-cell',
    'young-cell',
    'old-cell'
}

interface Cell {
    cellStatus: number;
    id: number;
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
