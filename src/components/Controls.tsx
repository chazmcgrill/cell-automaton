import React, { memo } from 'react';
import Button from './ui/Button';

interface ControlsProps {
    onPlay: () => void;
    onClear: () => void;
    onReset: () => void;
    isPaused: boolean;
}

const Controls = ({ onPlay, onClear, onReset, isPaused }: ControlsProps) => (
    <div className="control-buttons">
        <Button onClick={onPlay} label={isPaused ? 'Run' : 'Pause'} priority="primary" />
        <Button onClick={onClear} label="Clear" />
        <Button onClick={onReset} label="Reset" />
    </div>
);

export default memo(Controls);
