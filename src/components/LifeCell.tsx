import React, { memo } from 'react';
import { Cell } from '../utils/types';

const cellStatusMap: { [key: number]: string } = {
    0: 'dead-cell',
    1: 'young-cell',
    2: 'old-cell',
};

interface LifeCellProps extends Cell {
    clickCell: (id: number) => void;
}

const LifeCell = ({ cellStatus, id, clickCell }: LifeCellProps) => {
    const cellStyle = cellStatusMap[cellStatus];
    return <div data-testid="life-cell" className={`life-cell ${cellStyle}`} onClick={() => clickCell(id)} />;
};

export default memo(LifeCell);
