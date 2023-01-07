import React, { memo } from 'react';
import { BASE_INTERVAL_MS, SPEED_MULTIPLIERS } from '../config';
import Controls from './Controls';
import ButtonGroup from './ui/ButtonGroup';
import Stat from './ui/Stat';
import { ButtonItem } from './ui/types';

interface HeaderProps {
    toggleLifeCycle: () => void;
    onClear: () => void;
    onReset: () => void;
    handleSpeedChange: (value: number) => void;
    intervalMs: number;
    isPaused: boolean;
    lifeCycleCount: number;
}

const SPEED_BUTTON_ITEMS = SPEED_MULTIPLIERS.map((multiplier) => ({
    // interval delay
    value: BASE_INTERVAL_MS / multiplier,
    label: `X${multiplier}`,
})) as ButtonItem<number>[];

const Header = ({ toggleLifeCycle, isPaused, onClear, onReset, handleSpeedChange, intervalMs, lifeCycleCount }: HeaderProps): JSX.Element => (
    <header>
        <h1>Cell Automaton</h1>
        <div className="row">
            <Stat label="Life cycles" value={lifeCycleCount} />

            <Controls onPlay={toggleLifeCycle} onClear={onClear} onReset={onReset} isPaused={isPaused} />
            <ButtonGroup
                buttonItems={SPEED_BUTTON_ITEMS}
                selectedValue={intervalMs}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onClickButton={handleSpeedChange}
            />
        </div>
    </header>
);

export default memo(Header);
