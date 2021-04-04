import React, { useCallback, useEffect, useRef, useState } from 'react';
import LifeBoard from './LifeBoard';
import { generateNewBoard, initializeCellStatus, getNextCellsLifeCycle } from '../utils';
import { BASE_INTERVAL_MS, CELL_STATUS } from '../config';
import { Cell } from '../utils/types';
import Header from './Header';
import { ThemeProvider } from './ui/theme';

function getCellCount() {
    const { innerWidth: width, innerHeight: height } = window;
    const horizontalCellCount = Math.floor((width - 2 * 32)  / 10);
    const verticalCellCount = Math.floor((height - 100) / 10);
    const totalCellCount = horizontalCellCount * verticalCellCount;
    return {
        horizontalCellCount,
        totalCellCount,
    };
}

const App = () => {
    const [cells, setCells] = useState<Cell[]>([]);
    const [cellCount] = useState(getCellCount());
    const [counter, setCounter] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [intervalMs, setIntervalMs] = useState(BASE_INTERVAL_MS);

    const intervalRef = useRef<NodeJS.Timeout>();

    const cellsLifeCycle = useCallback((): void => {
        setCells(currentCells => getNextCellsLifeCycle(currentCells, cellCount.horizontalCellCount));
    }, [cellCount]);

    const handleResetCells = useCallback((isInitial?: boolean): void => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        const cells = generateNewBoard(cellCount.totalCellCount);

        if (!isInitial) {
            setCounter(0);
            setIntervalMs(BASE_INTERVAL_MS);
            setIsPaused(false);
        }

        setCells(initializeCellStatus(cells));
        intervalRef.current = setInterval(cellsLifeCycle, BASE_INTERVAL_MS);
    }, [cellsLifeCycle, cellCount]);

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
        setCells(generateNewBoard(cellCount.totalCellCount));
    }, [handlePause, cellCount]);

    useEffect(() => {
        setCounter(currentCount => currentCount + 1);
    }, [cells]);

    useEffect(() => {
        handleResetCells(true);
    }, [cellsLifeCycle, handleResetCells]);

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

            <div className="board-wrapper">
                {cells.length > 0 && <LifeBoard cells={cells} clickCell={handleCellClick} />}
            </div>
        </ThemeProvider>
    )

}

export default App;
