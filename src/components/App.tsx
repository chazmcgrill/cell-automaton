import React, { useCallback, useEffect, useRef, useState } from 'react';
import LifeBoard from './LifeBoard';
import { generateNewBoard, initializeCellStatus, getNextCellsLifeCycle, getCellCount } from '../utils';
import { BASE_INTERVAL_MS, CELL_STATUS } from '../config';
import { BoardDimensions, Cell } from '../utils/types';
import Header from './Header';
import Controls from './Controls';

const { innerWidth: screenWidth } = window;
const isMobile = screenWidth <= 800;

const App = () => {
    const [cells, setCells] = useState<Cell[]>([]);
    const [counter, setCounter] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [intervalMs, setIntervalMs] = useState(BASE_INTERVAL_MS);
    const [boardDimensions, setBoardDimensions] = useState<BoardDimensions | undefined>();
    const [boardSize, setBoardSize] = useState<ReturnType<typeof getCellCount> | null>(null);

    const boardElementRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout>();

    const cellsLifeCycle = useCallback((): void => {
        if (!boardSize) return;
        setCells((currentCells) => getNextCellsLifeCycle(currentCells, boardSize.horizontalCellCount));
    }, [boardSize]);

    const handleResetCells = useCallback(
        (isInitial?: boolean): void => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (!boardSize) return;
            const cells = generateNewBoard(boardSize.totalCellCount);

            if (!isInitial) {
                setCounter(0);
                setIntervalMs(BASE_INTERVAL_MS);
                setIsPaused(false);
            }

            setCells(initializeCellStatus(cells));
            intervalRef.current = setInterval(cellsLifeCycle, BASE_INTERVAL_MS);
        },
        [cellsLifeCycle, boardSize],
    );

    const handleSpeedChange = useCallback(
        (newDelay: number) => {
            if (!isPaused) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                intervalRef.current = setInterval(cellsLifeCycle, newDelay);
            }
            setIntervalMs(newDelay);
        },
        [cellsLifeCycle, isPaused],
    );

    const handleCellClick = useCallback((id: number): void => {
        setCells((currentCells) =>
            currentCells.map((cell) =>
                cell.id === id
                    ? {
                          ...cell,
                          cellStatus: cell.cellStatus === CELL_STATUS.YOUNG ? CELL_STATUS.DEAD : CELL_STATUS.YOUNG,
                      }
                    : cell,
            ),
        );
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
        if (!boardSize) return;
        setCells(generateNewBoard(boardSize.totalCellCount));
    }, [handlePause, boardSize]);

    useEffect(() => {
        setCounter((currentCount) => currentCount + 1);
    }, [cells]);

    useEffect(() => {
        if (boardSize) handleResetCells(true);
    }, [boardSize, cellsLifeCycle, handleResetCells]);

    useEffect(() => {
        if (boardElementRef.current) {
            const { clientWidth: width, clientHeight: height } = boardElementRef.current;
            const newBoardDimensions = { width, height };
            setBoardDimensions(newBoardDimensions);
            setBoardSize(getCellCount(newBoardDimensions));
        }
    }, []);

    return (
        <>
            {isMobile ? (
                <div className="mobile-section">
                    <h1>Cell Automaton</h1>
                </div>
            ) : (
                <Header
                    toggleLifeCycle={toggleLifeCycle}
                    onClear={handleClear}
                    onReset={handleResetCells}
                    handleSpeedChange={handleSpeedChange}
                    intervalMs={intervalMs}
                    isPaused={isPaused}
                    lifeCycleCount={counter}
                />
            )}

            <div className="life-board" ref={boardElementRef} style={boardDimensions}>
                {cells.length > 0 && <LifeBoard cells={cells} clickCell={handleCellClick} />}
            </div>

            {isMobile && (
                <footer className="mobile-section">
                    <Controls onPlay={toggleLifeCycle} onClear={handleClear} onReset={handleResetCells} isPaused={isPaused} />
                </footer>
            )}
        </>
    );
};

export default App;
