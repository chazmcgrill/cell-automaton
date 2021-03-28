import React, { useCallback, useEffect, useState } from 'react';
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

    const cellsLifecycle = useCallback((): void => {
        setCells(currentCells => currentCells.map((cell) => ({
            ...cell,
            cellStatus: getNewCellStatus(cell.id, cell.cellStatus, currentCells),
        })));
        setCounter(currentCount => currentCount + 1);
    }, []);

    useEffect(() => {
        if (!paused && counter !== undefined) setTimeout(cellsLifecycle, delay);
    }, [counter, cellsLifecycle, paused, delay]);

    useEffect(() => {
        const cells = generateNewBoard();
        setCells(initializeCellStatus(cells));
        cellsLifecycle();
    }, [cellsLifecycle]);

    const handleSpeedChange = (newDelay: number) => {
        if (!paused) {
            setPaused(true);
            setTimeout(() => {
                setPaused(false);
                setDelay(newDelay);
            }, 400);
        } else {
            setDelay(newDelay);
        }
    }

    const handleCellClick = (id: number): void => {
        const currentCells = cells.slice();
        currentCells[id].cellStatus = cells[id].cellStatus === CELL_STATUS.YOUNG ? CELL_STATUS.DEAD : CELL_STATUS.YOUNG;
        setCells(currentCells);
    }

    const handleResume = (): void => {
        if (paused) setPaused(false);
    }

    const handleClear = (): void => {
        setCells(generateNewBoard());
        setPaused(true);
        setCounter(0);
    }

    const handlePause = (): void => setPaused(true);

    const handleReset = (): void => {
        const resetFunc = () =>{
            setCells(initializeCellStatus(cells));
            setCounter(0);
        }

        if (!paused) {
            setPaused(true);
            setTimeout(() => resetFunc(), 400);
        } else {
            resetFunc();
        }
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
