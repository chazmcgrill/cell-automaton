import { CELL_STATUS } from '../config';
import { Cell } from './types';
import { chunkArray, generateNewBoard, getCellCount, getNewCellStatus, getNextCellsLifeCycle, initializeCellStatus } from './utils';

describe('generateNewBoard', () => {
    it('should generate an array of cells with the correct length', () => {
        const cellCount = 10;
        const newBoard = generateNewBoard(cellCount);
        expect(newBoard).toHaveLength(cellCount);
    });

    it('should generate an array of cells with the correct initial cell status', () => {
        const newBoard = generateNewBoard();
        newBoard.forEach((cell) => {
            expect(cell.cellStatus).toBe(CELL_STATUS.DEAD);
        });
    });

    it('should generate an array of cells with unique ids', () => {
        const newBoard = generateNewBoard();
        const idSet = new Set(newBoard.map((cell) => cell.id));
        expect(idSet.size).toBe(newBoard.length);
    });
});

describe('initializeCellStatus', () => {
    it('should initialize the cell status of each cell in the array', () => {
        const cells = [
            { id: 0, cellStatus: null },
            { id: 1, cellStatus: null },
            { id: 2, cellStatus: null },
        ] as unknown as Cell[];
        const initializedCells = initializeCellStatus(cells);
        initializedCells.forEach((cell) => {
            expect(cell.cellStatus).not.toBe(null);
        });
    });

    it('should not modify the original cell array', () => {
        const cells = [
            { id: 0, cellStatus: null },
            { id: 1, cellStatus: null },
            { id: 2, cellStatus: null },
        ] as unknown as Cell[];
        const initializedCells = initializeCellStatus(cells);
        expect(initializedCells).not.toBe(cells);
    });

    it('should initialize each cell to either DEAD (0) or ALIVE (1)', () => {
        const cells = [
            { id: 0, cellStatus: null },
            { id: 1, cellStatus: null },
            { id: 2, cellStatus: null },
        ] as unknown as Cell[];
        const initializedCells = initializeCellStatus(cells);
        initializedCells.forEach((cell) => {
            expect(cell.cellStatus).toBeGreaterThanOrEqual(0);
            expect(cell.cellStatus).toBeLessThanOrEqual(1);
        });
    });
});

describe('getNewCellStatus', () => {
    it('should return dead status if there are more than 3 living neighbours (overcrowding)', () => {
        const currentState = CELL_STATUS.YOUNG;
        const prevCells = [
            { id: 0, cellStatus: CELL_STATUS.OLD },
            { id: 1, cellStatus: CELL_STATUS.OLD },
            { id: 2, cellStatus: CELL_STATUS.OLD },
            { id: 3, cellStatus: CELL_STATUS.OLD },
            { id: 4, cellStatus: CELL_STATUS.YOUNG },
            { id: 5, cellStatus: CELL_STATUS.DEAD },
        ];
        const newStatus = getNewCellStatus(4, currentState, prevCells, 3);
        expect(newStatus).toBe(CELL_STATUS.DEAD);
    });

    it('should return dead status if the cell has less than 2 living neighbours (starvation)', () => {
        const currentState = CELL_STATUS.YOUNG;
        const prevCells = [
            { id: 0, cellStatus: CELL_STATUS.DEAD },
            { id: 1, cellStatus: CELL_STATUS.OLD },
            { id: 2, cellStatus: CELL_STATUS.DEAD },
        ];
        const newStatus = getNewCellStatus(1, currentState, prevCells, 3);
        expect(newStatus).toBe(CELL_STATUS.DEAD);
    });

    it('should return young status if the cell is currently dead and has more exactly 3 living neighbours (birth)', () => {
        const currentState = CELL_STATUS.DEAD;
        const prevCells = [
            { id: 0, cellStatus: CELL_STATUS.OLD },
            { id: 1, cellStatus: CELL_STATUS.DEAD },
            { id: 2, cellStatus: CELL_STATUS.DEAD },
            { id: 3, cellStatus: CELL_STATUS.OLD },
            { id: 4, cellStatus: CELL_STATUS.DEAD },
            { id: 5, cellStatus: CELL_STATUS.OLD },
        ];
        const newStatus = getNewCellStatus(4, currentState, prevCells, 3);
        expect(newStatus).toBe(CELL_STATUS.YOUNG);
    });

    it('should return old if the cell is currently alive and has 2 or 3 living neighbours (ageing)', () => {
        const currentState = CELL_STATUS.YOUNG;
        const prevCells = [
            { id: 0, cellStatus: CELL_STATUS.DEAD },
            { id: 1, cellStatus: CELL_STATUS.DEAD },
            { id: 2, cellStatus: CELL_STATUS.DEAD },
            { id: 3, cellStatus: CELL_STATUS.OLD },
            { id: 4, cellStatus: CELL_STATUS.YOUNG },
            { id: 5, cellStatus: CELL_STATUS.OLD },
        ];
        const newStatus = getNewCellStatus(4, currentState, prevCells, 3);
        expect(newStatus).toBe(CELL_STATUS.OLD);
    });

    it('should return dead status if dead already and there is less than 3 neigbours', () => {
        const currentState = CELL_STATUS.DEAD;
        const prevCells = [
            { id: 0, cellStatus: CELL_STATUS.OLD },
            { id: 1, cellStatus: CELL_STATUS.DEAD },
            { id: 2, cellStatus: CELL_STATUS.DEAD },
        ];
        const newStatus = getNewCellStatus(1, currentState, prevCells, 3);
        expect(newStatus).toBe(CELL_STATUS.DEAD);
    });
});

describe('getNextCellsLifeCycle', () => {
    it('should return an updated array of cells if any cell status has changed', () => {
        const cells = [
            { id: 0, cellStatus: 0 },
            { id: 1, cellStatus: 1 },
            { id: 2, cellStatus: 0 },
        ];
        const updatedCells = getNextCellsLifeCycle(cells, 3);
        expect(updatedCells).not.toBe(cells);
    });

    it('should return the original array of cells if no cell status has changed', () => {
        const cells = [
            { id: 0, cellStatus: 0 },
            { id: 1, cellStatus: 0 },
            { id: 2, cellStatus: 0 },
        ];
        const updatedCells = getNextCellsLifeCycle(cells, 3);
        expect(updatedCells).toBe(cells);
    });
});

describe('chunkArray', () => {
    it('should split an array into chunks of the specified size', () => {
        const arr = [1, 2, 3, 4, 5, 6];
        const chunkedArray = chunkArray(2, arr);
        expect(chunkedArray).toHaveLength(3);
        expect(chunkedArray[0]).toEqual([1, 2]);
        expect(chunkedArray[1]).toEqual([3, 4]);
        expect(chunkedArray[2]).toEqual([5, 6]);
    });

    it('should return the original array if the chunk size is larger than the array length', () => {
        const arr = [1, 2, 3];
        const chunkedArray = chunkArray(4, arr);
        expect(chunkedArray).toEqual([arr]);
    });

    it('should handle an empty array', () => {
        const arr: number[] = [];
        const chunkedArray = chunkArray(2, arr);
        expect(chunkedArray).toEqual([]);
    });
});

describe('getCellCount', () => {
    it('should return the correct number of cells that fit horizontally and in total', () => {
        const boardDimensions = { width: 500, height: 500 };
        const cellCount = getCellCount(boardDimensions);
        expect(cellCount.horizontalCellCount).toBe(50);
        expect(cellCount.totalCellCount).toBe(3300);
    });

    it('should return the correct number of cells that fit horizontally and in total for a bigger size', () => {
        const boardDimensions = { width: 5000, height: 5000 };
        const cellCount = getCellCount(boardDimensions);
        expect(cellCount.horizontalCellCount).toBe(500);
        expect(cellCount.totalCellCount).toBe(33000);
    });
});
