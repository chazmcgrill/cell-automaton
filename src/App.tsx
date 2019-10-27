import React, { Component } from 'react';
import Controls from './components/Controls';
import LifeBoard from './components/LifeBoard';
import SpeedControls from './components/SpeedControls';
import { generateNewBoard, initializeCellStatus, getNewCellStatus } from './helpers';
import { CELL_STATUS } from './globals';
import { Cell } from './types';

interface AppState {
    cells: Cell[],
    paused: boolean,
    counter: number,
    delay: number
}

class App extends Component<{}, AppState> {
    public state: AppState = {
        cells: [],
        paused: false,
        counter: 0,
        delay: 400,
    }

    componentDidMount() {
        const cells = generateNewBoard();
        this.setState({ cells: initializeCellStatus(cells) });
    }

    lifecycleTimer = (delay: number): void => {
        if (!this.state.paused) setTimeout(this.cellsLifecycle, delay);
    }

    cellsLifecycle = (): void => {
        const currentCells = this.state.cells.slice();
        const { counter, cells } = this.state;
        const newCells = cells.map((cell) => ({
            ...cell,
            cellStatus: getNewCellStatus(cell.id, cell.cellStatus, currentCells),
        }));

        this.setState({ cells: newCells, counter: counter + 1 });
    }

    handleSpeedChange = (delay: number) => {
        if (!this.state.paused) {
            this.setState({ paused: true });
            setTimeout(() => {
                this.setState({ paused: false, delay });
            }, 400);
        } else {
            this.setState({ delay });
        }
    }

    handleCellClick = (id: number): void => {
        const cells = this.state.cells.slice();
        cells[id].cellStatus = cells[id].cellStatus === CELL_STATUS.YOUNG ? CELL_STATUS.DEAD : CELL_STATUS.YOUNG;
        this.setState({ cells });
    }

    handleResume = (): void => {
        if (this.state.paused) this.setState({ paused: false });
    }

    handleClear = (): void => this.setState({ cells: generateNewBoard(), paused: true, counter: 0 });

    handlePause = (): void => this.setState({ paused: true });

    handleReset = (): void => {
        const resetFunc = () => this.setState({ cells: initializeCellStatus(this.state.cells), counter: 0 });

        if (!this.state.paused) {
            this.setState({ paused: true });
            setTimeout(() => resetFunc(), 400);
        } else {
            resetFunc();
        }
    }

    render() {
        const { cells, counter, delay } = this.state;

        this.lifecycleTimer(delay);

        return (
            <div>
                <header>
                    <h1>Life</h1>
                </header>

                <Controls
                    onPlay={this.handleResume}
                    onPause={this.handlePause}
                    onClear={this.handleClear}
                    onReset={this.handleReset}
                />

                {cells.length > 0 && <LifeBoard cells={cells} clickCell={this.handleCellClick} />}

                <p>Cell Lifecycles: {counter}</p>

                <SpeedControls handleSpeedChange={this.handleSpeedChange} />
                
                <p className="footer">coded by <a href="https://www.charlietaylorcoder.com">charlie taylor</a></p>
            </div>
        )
    }
}

export default App;
