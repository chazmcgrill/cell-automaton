import React, { memo } from 'react';

interface SpeedButtonProps extends Pick<SpeedControlProps, 'handleSpeedChange'> {
    label: string;
    isCurrentSpeed: boolean;
    speed: number;
}

const SpeedButton = memo(({
    handleSpeedChange,
    label,
    isCurrentSpeed,
    speed,
}: SpeedButtonProps) => {
    const backgroundColor = isCurrentSpeed ? "#6C49B8" : "#29cacf";
    return (
        <button onClick={() => handleSpeedChange(speed)} style={{ backgroundColor }}>{label}</button>
    );
})

interface SpeedControlProps {
    handleSpeedChange: (delay: number) => void;
    currentSpeed: number;
}

const SpeedControls = ({
    handleSpeedChange,
    currentSpeed,
}: SpeedControlProps) => {
    return (
        <div className="control-buttons">
            <SpeedButton label="X1" speed={400} handleSpeedChange={handleSpeedChange} isCurrentSpeed={currentSpeed === 400} />
            <SpeedButton label="X2" speed={200} handleSpeedChange={handleSpeedChange} isCurrentSpeed={currentSpeed === 200} />
            <SpeedButton label="X5" speed={40} handleSpeedChange={handleSpeedChange} isCurrentSpeed={currentSpeed === 40} />
        </div>
    )
}

export default memo(SpeedControls);
