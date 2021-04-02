import React, { useCallback, useEffect, useRef, useState } from 'react';
import LifeBoard from './LifeBoard';
import { generateNewBoard, initializeCellStatus, getNextCellsLifeCycle } from '../utils';
import { BASE_INTERVAL_MS, CELL_STATUS } from '../config';
import { Cell } from '../utils/types';
import Header from './Header';

const App = () => {
    const [cells, setCells] = useState<Cell[]>([]);
    const [counter, setCounter] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [intervalMs, setIntervalMs] = useState(BASE_INTERVAL_MS);

    const intervalRef = useRef<NodeJS.Timeout>();

    const cellsLifeCycle = useCallback((): void => {
        setCells(getNextCellsLifeCycle);
    }, []);

    const handleResetCells = useCallback((isInitial?: boolean): void => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        const cells = generateNewBoard();

        if (!isInitial) {
            setCounter(0);
            setIntervalMs(BASE_INTERVAL_MS);
            setIsPaused(false);
        }

        setCells(initializeCellStatus(cells));
        intervalRef.current = setInterval(cellsLifeCycle, BASE_INTERVAL_MS);
    }, [cellsLifeCycle]);

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

    const handleResume = useCallback((): void => {
        if (isPaused) {
            intervalRef.current = setInterval(cellsLifeCycle, intervalMs);
            setIsPaused(false);
        }
    }, [isPaused, intervalMs, cellsLifeCycle]);
    
    const handlePause = useCallback((): void => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsPaused(true);
    }, []);

    const handleClear = useCallback((): void => {
        handlePause();
        setCells(generateNewBoard());
    }, [handlePause]);

    useEffect(() => {
        setCounter(currentCount => currentCount + 1);
    }, [cells]);

    useEffect(() => {
        handleResetCells(true);
    }, [cellsLifeCycle, handleResetCells]);

    return (
        <div>
            <Header
                onPlay={handleResume}
                onPause={handlePause}
                onClear={handleClear}
                onReset={handleResetCells}
                handleSpeedChange={handleSpeedChange}
                intervalMs={intervalMs}
            />

            {cells.length > 0 && <LifeBoard cells={cells} clickCell={handleCellClick} />}

            <p>Cell Lifecycles: {counter}</p>

            <p className="footer">coded by <a href="https://www.charlietaylorcoder.com">charlie taylor</a></p>
        </div>
    )

}

export default App;
