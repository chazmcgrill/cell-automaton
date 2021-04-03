import { CELL_STATUS } from '../config';
import { Cell } from './types';

/**
 * Generates a new array of cells
 * @returns new cell array
 */
export function generateNewBoard(cellCount?: number): Cell[] {
    return Array.apply(null, Array(cellCount)).map((cell, index) => {
        return { id: index, cellStatus: CELL_STATUS.DEAD }
    })
}

/**
 * Initializes new cell array with randomised cell status'
 * @param cells new cell array
 */
export function initializeCellStatus(cells: Cell[]): Cell[] {
    return cells.map(cell => ({ ...cell, cellStatus: Math.floor(Math.random() * 2) }));
}

/**
 * Checks cells neighbours and return updated cell status
 * @param index array index
 * @param currentState current cell state
 * @param prevCells current cell array
 * @returns updated cell status
 */
export function getNewCellStatus(index: number, currentState: number, prevCells: Cell[], cellsHorizontalCount: number): number {
    const width = cellsHorizontalCount;
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

/**
 * Gets next cell life cycle 
 * @param cells current cells array
 * @returns array of updated cells if nothing has changed original array is returned to prevent mutation
 */
export const getNextCellsLifeCycle = (cells: Cell[], cellsHorizontalCount: number) => {
    let cellsHaveChanged = false;
    const updatedCells = cells.map((cell) => {
        const newCellStatus = getNewCellStatus(cell.id, cell.cellStatus, cells, cellsHorizontalCount);
        if (newCellStatus !== cell.cellStatus) cellsHaveChanged = true;
        return {
            ...cell,
            cellStatus: newCellStatus,
        }
    });
    return cellsHaveChanged ? updatedCells : cells;
}
