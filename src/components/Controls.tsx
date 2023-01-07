import React, { memo } from 'react';
import Button from './ui/Button';

interface ControlsProps {
    onPlay: () => void;
    onClear: () => void;
    onReset: () => void;
    isPaused: boolean;
}

const Controls = (props: ControlsProps) => (
    <div className="control-buttons">
        <Button onClick={props.onPlay} label={props.isPaused ? 'Run' : 'Pause'} priority="primary" />
        <Button onClick={props.onClear} label="Clear" />
        <Button onClick={props.onReset} label="Reset" />
    </div>
);

export default memo(Controls);
