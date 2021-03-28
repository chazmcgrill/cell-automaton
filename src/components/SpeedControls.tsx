import React, { memo } from 'react';
import { BASE_INTERVAL_MS, SPEED_MULTIPLIERS } from '../config';

interface SpeedButtonProps extends Pick<SpeedControlProps, 'handleSpeedChange'> {
    label: string;
    isActive: boolean;
    speed: number;
}

const SpeedButton = memo(({
    handleSpeedChange,
    label,
    isActive,
    speed,
}: SpeedButtonProps) => {
    const backgroundColor = isActive ? "#6C49B8" : "#29cacf";
    return (
        <button
            disabled={isActive}
            onClick={() => handleSpeedChange(speed)}
            style={{ backgroundColor }}
        >{label}</button>
    );
})

interface SpeedControlProps {
    handleSpeedChange: (delay: number) => void;
    currentIntervalMs: number;
}

const SpeedControls = ({
    handleSpeedChange,
    currentIntervalMs,
}: SpeedControlProps) => {
    return (
        <div className="control-buttons">
            {SPEED_MULTIPLIERS.map(multiplier => {
                const intervalMs = BASE_INTERVAL_MS / multiplier
                return (
                    <SpeedButton
                        label={`X${multiplier}`}
                        speed={intervalMs}
                        handleSpeedChange={handleSpeedChange}
                        isActive={currentIntervalMs === intervalMs}
                    />
                )
            })}
        </div>
    )
}

export default memo(SpeedControls);
