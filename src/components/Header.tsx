import React, { memo } from 'react';
import { BASE_INTERVAL_MS, SPEED_MULTIPLIERS } from '../config';
import Controls from './Controls';
import ButtonGroup from './ui/ButtonGroup';
import { ButtonItem } from './ui/types';

interface HeaderProps {
    toggleLifeCycle: () => void;
    onClear: () => void;
    onReset: () => void;
    handleSpeedChange: (value: number) => void;
    intervalMs: number;
    isPaused: boolean;
}

const SPEED_BUTTON_ITEMS = SPEED_MULTIPLIERS.map(multiplier => ({
    value: BASE_INTERVAL_MS / multiplier,
    label: `X${multiplier}`,
})) as ButtonItem<number>[];

const Header = ({
    toggleLifeCycle,
    isPaused,
    onClear,
    onReset,
    handleSpeedChange,
    intervalMs,
}: HeaderProps): JSX.Element => (
    <header>
        <h2>Cell Automaton</h2>
        <div className="row">
            <Controls
                onPlay={toggleLifeCycle}
                onClear={onClear}
                onReset={onReset}
                isPaused={isPaused}
            />
            <ButtonGroup
                buttonItems={SPEED_BUTTON_ITEMS}
                selectedValue={intervalMs}
                // @ts-ignore
                onClickButton={handleSpeedChange} 
            />
        </div>
    </header>
);


export default memo(Header);
