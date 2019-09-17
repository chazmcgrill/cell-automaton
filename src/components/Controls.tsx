import React from 'react';

interface Props {
  onPlay: any;
  onPause: any;
  onClear: any;
  onReset: any;
}

const Controls = (props: Props) => (
    <div className="control-buttons">
        <button onClick={props.onPlay}>Resume</button>
        <button onClick={props.onPause}>Pause</button>
        <button onClick={props.onClear}>Clear</button>
        <button onClick={props.onReset}>Reset</button>
    </div>
)

export default Controls;
