import React, { useCallback, useEffect, useRef, useState } from 'react';
import Controls from './Controls';
import LifeBoard from './LifeBoard';
import SpeedControls from './SpeedControls';
import { generateNewBoard, initializeCellStatus, getNewCellStatus } from '../utils/helpers';
import { CELL_STATUS } from '../config';
import { Cell } from '../utils/types';

const App = () => {
    const [cells, setCells] = useState<Cell[]>([]);
    const [counter, setCounter] = useState(0);
    const [paused, setPaused] = useState(false);
    const [delay, setDelay] = useState(400);

    const lifecycleInterval = useRef<NodeJS.Timeout>();

    const cellsLifecycle = useCallback((): void => {
        setCells(currentCells => currentCells.map((cell) => ({
            ...cell,
            cellStatus: getNewCellStatus(cell.id, cell.cellStatus, currentCells),
        })));
        setCounter(currentCount => currentCount + 1);
    }, []);

    useEffect(() => {
        const cells = generateNewBoard();
        setCells(initializeCellStatus(cells));
        lifecycleInterval.current = setInterval(cellsLifecycle, 400);
    }, [cellsLifecycle]);

    const handleSpeedChange = (newDelay: number) => {
        if (!paused) {
            if (lifecycleInterval.current) clearInterval(lifecycleInterval.current);
            lifecycleInterval.current = setInterval(cellsLifecycle, newDelay);
        }
        setDelay(newDelay);
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
        if (paused) {
            lifecycleInterval.current = setInterval(cellsLifecycle, delay);
            setPaused(false);
        }
    }
    
    const handlePause = (): void => {
        if (lifecycleInterval.current) clearInterval(lifecycleInterval.current);
        setPaused(true);
    }

    const handleClear = (): void => {
        handlePause();
        setCells(generateNewBoard());
    }

    const handleReset = (): void => {
        if (lifecycleInterval.current) clearInterval(lifecycleInterval.current);
        setCounter(0);
        const cells = generateNewBoard();
        setCells(initializeCellStatus(cells));
        lifecycleInterval.current = setInterval(cellsLifecycle, 400);
    }

    return (
        <div>
            <header>
                <h1>Life</h1>
            </header>

            <Controls
                onPlay={handleResume}
                onPause={handlePause}
                onClear={handleClear}
                onReset={handleReset}
            />

            {cells.length > 0 && <LifeBoard cells={cells} clickCell={handleCellClick} />}

            <p>Cell Lifecycles: {counter}</p>

            <SpeedControls handleSpeedChange={handleSpeedChange} />

            <p className="footer">coded by <a href="https://www.charlietaylorcoder.com">charlie taylor</a></p>
        </div>
    )

}

export default App;
