import React from 'react';

interface ControlsProps {
    onPlay: () => void;
    onPause: () => void;
    onClear: () => void;
    onReset: () => void;
}

const Controls = (props: ControlsProps) => (
    <div className="control-buttons">
        <button onClick={props.onPlay}>Resume</button>
        <button onClick={props.onPause}>Pause</button>
        <button onClick={props.onClear}>Clear</button>
        <button onClick={props.onReset}>Reset</button>
    </div>
)

export default Controls;
