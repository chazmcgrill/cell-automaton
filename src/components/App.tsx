import React, { useCallback, useEffect, useRef, useState } from 'react';
import LifeBoard from './LifeBoard';
import { generateNewBoard, initializeCellStatus, getNextCellsLifeCycle } from '../utils';
import { BASE_INTERVAL_MS, CELL_STATUS } from '../config';
import { Cell } from '../utils/types';
import Header from './Header';
import { ThemeProvider } from './ui/theme';

interface BoardDimensions {
    width: number;
    height: number;
}

function getCellCount(boardDimensions: BoardDimensions) {
    const horizontalCellCount = Math.floor(boardDimensions.width / 10);
    const verticalCellCount = Math.floor(boardDimensions.height / 10);
    const totalCellCount = horizontalCellCount * verticalCellCount;
    return {
        horizontalCellCount,
        totalCellCount,
    };
}

const App = () => {
    const [cells, setCells] = useState<Cell[]>([]);
    const [counter, setCounter] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [intervalMs, setIntervalMs] = useState(BASE_INTERVAL_MS);
    const [boardDimensions, setBoardDimensions] = useState<BoardDimensions | undefined>();

    const boardElementRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout>();

    const cellsLifeCycle = useCallback((): void => {
        if (!boardDimensions) return;
        const { horizontalCellCount } = getCellCount(boardDimensions);
        setCells(currentCells => getNextCellsLifeCycle(currentCells, horizontalCellCount));
    }, [boardDimensions]);

    const handleResetCells = useCallback((isInitial?: boolean): void => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (!boardDimensions) return;
        const { totalCellCount } = getCellCount(boardDimensions);
        const cells = generateNewBoard(totalCellCount);

        if (!isInitial) {
            setCounter(0);
            setIntervalMs(BASE_INTERVAL_MS);
            setIsPaused(false);
        }

        setCells(initializeCellStatus(cells));
        intervalRef.current = setInterval(cellsLifeCycle, BASE_INTERVAL_MS);
    }, [cellsLifeCycle, boardDimensions]);

    const handleSpeedChange = useCallback((newDelay: number) => {
        if (!isPaused) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(cellsLifeCycle, newDelay);
        }
        setIntervalMs(newDelay);
    }, [cellsLifeCycle, isPaused]);

    const handleCellClick = useCallback((id: number): void => {
        setCells(currentCells => currentCells.map(cell => (
            cell.id === id ? {
                ...cell,
                cellStatus: cell.cellStatus === CELL_STATUS.YOUNG ? CELL_STATUS.DEAD : CELL_STATUS.YOUNG,
            } : cell
        )));
    }, []);

    const handlePause = useCallback((): void => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsPaused(true);
    }, []);

    const handlePlay = useCallback((): void => {
        intervalRef.current = setInterval(cellsLifeCycle, intervalMs);
        setIsPaused(false);
    }, [intervalMs, cellsLifeCycle]);

    const toggleLifeCycle = useCallback((): void => {
        if (isPaused) {
            handlePlay();
            return;
        } 
        handlePause();
    }, [handlePause, isPaused, handlePlay]);
    
    const handleClear = useCallback((): void => {
        handlePause();
        if (!boardDimensions) return;
        const { totalCellCount } = getCellCount(boardDimensions);
        setCells(generateNewBoard(totalCellCount));
    }, [handlePause, boardDimensions]);

    useEffect(() => {
        setCounter(currentCount => currentCount + 1);
    }, [cells]);

    useEffect(() => {
        if (boardDimensions) handleResetCells(true);
    }, [boardDimensions, cellsLifeCycle, handleResetCells]);

    useEffect(() => {
        if (boardElementRef.current) {
            const { clientWidth: width, clientHeight: height } = boardElementRef.current;
            setBoardDimensions({ width, height });
        }
    }, []);

    return (
        <ThemeProvider>
            <Header
                toggleLifeCycle={toggleLifeCycle}
                onClear={handleClear}
                onReset={handleResetCells}
                handleSpeedChange={handleSpeedChange}
                intervalMs={intervalMs}
                isPaused={isPaused}
                lifeCycleCount={counter}
            />

            <div className="board-wrapper" ref={boardElementRef} style={boardDimensions}>
                {cells.length > 0 && <LifeBoard cells={cells} clickCell={handleCellClick} />}
            </div>
        </ThemeProvider>
    )

}

export default App;
