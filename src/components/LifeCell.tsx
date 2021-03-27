import React, { memo } from 'react';
import { Cell } from '../utils/types';

enum CellKey {
    'dead-cell',
    'young-cell',
    'old-cell'
}

interface LifeCellProps extends Cell {
    clickCell: (id: number) => void;
}

const LifeCell = ({ cellStatus, id, clickCell } : LifeCellProps) => {
    const cellStyle = CellKey[cellStatus];
    return <div className={`life-cell ${cellStyle}`} onClick={() => clickCell(id)} />
}

export default memo(LifeCell)
