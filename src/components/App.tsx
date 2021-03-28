import React, { useCallback, useEffect, useRef, useState } from 'react';
import Controls from './Controls';
import LifeBoard from './LifeBoard';
import SpeedControls from './SpeedControls';
import { generateNewBoard, initializeCellStatus, getNextCellsLifeCycle } from '../utils';
import { BASE_INTERVAL_MS, CELL_STATUS } from '../config';
import { Cell } from '../utils/types';

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

    const handleSpeedChange = (newDelay: number) => {
        if (!isPaused) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(cellsLifeCycle, newDelay);
        }
        setIntervalMs(newDelay);
    }

    const handleCellClick = useCallback((id: number): void => {
        setCells(currentCells => currentCells.map(cell => (
            cell.id === id ? {
                ...cell,
                cellStatus: cell.cellStatus === CELL_STATUS.YOUNG ? CELL_STATUS.DEAD : CELL_STATUS.YOUNG,
            } : cell
        )));
    }, []);

    const handleResume = (): void => {
        if (isPaused) {
            intervalRef.current = setInterval(cellsLifeCycle, intervalMs);
            setIsPaused(false);
        }
    }
    
    const handlePause = (): void => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsPaused(true);
    }

    const handleClear = (): void => {
        handlePause();
        setCells(generateNewBoard());
    }

    useEffect(() => {
        setCounter(currentCount => currentCount + 1);
    }, [cells]);

    useEffect(() => {
        handleResetCells(true);
    }, [cellsLifeCycle, handleResetCells]);

    return (
        <div>
            <header>
                <h1>Life</h1>
            </header>

            <Controls
                onPlay={handleResume}
                onPause={handlePause}
                onClear={handleClear}
                onReset={handleResetCells}
            />

            {cells.length > 0 && <LifeBoard cells={cells} clickCell={handleCellClick} />}

            <p>Cell Lifecycles: {counter}</p>

            <SpeedControls handleSpeedChange={handleSpeedChange} currentIntervalMs={intervalMs} />

            <p className="footer">coded by <a href="https://www.charlietaylorcoder.com">charlie taylor</a></p>
        </div>
    )

}

export default App;
