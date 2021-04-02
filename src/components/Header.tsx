import React, { memo } from 'react';
import Controls from './Controls';
import SpeedControls from './SpeedControls';

interface HeaderProps {
    onPlay: () => void;
    onPause: () => void;
    onClear: () => void;
    onReset: () => void;
    handleSpeedChange: (delay: number) => void;
    intervalMs: number;
}

const Header = ({
    onPlay,
    onPause,
    onClear,
    onReset,
    handleSpeedChange,
    intervalMs,
}: HeaderProps): JSX.Element => {
    console.log('hello');
    return (
        <header>
            <h2>Cell Automaton</h2>
            <div className="row">
                <Controls
                    onPlay={onPlay}
                    onPause={onPause}
                    onClear={onClear}
                    onReset={onReset}
                />
                <SpeedControls handleSpeedChange={handleSpeedChange} currentIntervalMs={intervalMs} />
            </div>
        </header>
    );
};

export default memo(Header);
