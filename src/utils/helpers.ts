import { CELL_STATUS, CONFIG } from '../config';
import { Cell } from './types';

export function generateNewBoard(): Cell[] {
    return Array.apply(null, Array(CONFIG.boardSize)).map((cell, index) => {
        return { id: index, cellStatus: CELL_STATUS.DEAD }
    })
}

export function initializeCellStatus(cells: Cell[]): Cell[] {
    return cells.map(cell => ({ ...cell, cellStatus: Math.floor(Math.random() * 2) }));
}

export function getNewCellStatus(index: number, currentState: number, prevCells: Cell[]): number {
    const width = 40;
    const leftEdge = index % width === 0;
    const rightEdge = (index + 1) % width === 0;
    let indexs = [];

    // check either sides
    if (!leftEdge) indexs.push(index - 1);
    if (!rightEdge) indexs.push(index + 1);

    // check three cells above
    if (index > width - 1) {
        indexs.push(index - width);
        if (!leftEdge) indexs.push((index - width) - 1);
        if (!rightEdge) indexs.push((index - width) + 1);
    }

    // check three cells below
    if (index < (prevCells.length - width) - 1) {
        indexs.push(index + width);
        if (!leftEdge) indexs.push((index + width) - 1);
        if (!rightEdge) indexs.push((index + width) + 1);
    }

    // find the amount of neigbours
    const neighbours = indexs.filter(i => (prevCells[i].cellStatus !== CELL_STATUS.DEAD)).length;

    // return new state depending on amount of neighbours
    if ((currentState !== CELL_STATUS.DEAD && neighbours > 3) || neighbours < 2) {
        return CELL_STATUS.DEAD;
    } else if (currentState === CELL_STATUS.DEAD && neighbours === 3) {
        return CELL_STATUS.YOUNG;
    } else if (currentState !== CELL_STATUS.DEAD) {
        return CELL_STATUS.OLD;
    } else {
        return CELL_STATUS.DEAD;
    }
}
