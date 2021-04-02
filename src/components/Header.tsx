import React, { memo } from 'react';
import { BASE_INTERVAL_MS, SPEED_MULTIPLIERS } from '../config';
import Controls from './Controls';
import ButtonGroup, { ButtonItem } from './ui/ButtonGroup';

interface HeaderProps {
    onPlay: () => void;
    onPause: () => void;
    onClear: () => void;
    onReset: () => void;
    handleSpeedChange: (value: number) => void;
    intervalMs: number;
}

const SPEED_BUTTON_ITEMS = SPEED_MULTIPLIERS.map(multiplier => ({
    value: BASE_INTERVAL_MS / multiplier,
    label: `X${multiplier}`,
})) as ButtonItem<number>[];

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
                <ButtonGroup
                    buttonItems={SPEED_BUTTON_ITEMS}
                    selectedValue={intervalMs}
                    // @ts-ignore
                    onClickButton={handleSpeedChange} 
                />
                {/* <SpeedControls handleSpeedChange={handleSpeedChange} currentIntervalMs={intervalMs} /> */}
            </div>
        </header>
    );
};

export default memo(Header);
