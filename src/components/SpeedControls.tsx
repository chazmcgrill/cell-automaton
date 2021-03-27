import React, { memo, useState } from 'react';

interface SpeedControlProps {
    handleSpeedChange: (delay: number) => void;
}

const SpeedControls = ({
    handleSpeedChange,
}: SpeedControlProps) => {
    const [activeButton, setActiveButton] = useState('400');

    const toggleSpeedChange = (speed: string): void => {
        if (activeButton !== speed) {
            setActiveButton(speed)
            handleSpeedChange(parseInt(speed, 10))
        }
    }

    const bgStyle = (value: string) => (value === activeButton ? "#6C49B8" : "#29cacf");

    return (
        <div className="control-buttons">
            <button onClick={() => toggleSpeedChange('400')} style={{ backgroundColor: bgStyle("400") }}>X1</button>
            <button onClick={() => toggleSpeedChange('200')} style={{ backgroundColor: bgStyle("200") }}>X2</button>
            <button onClick={() => toggleSpeedChange('40')} style={{ backgroundColor: bgStyle("40") }}>X5</button>
        </div>
    )
}

export default memo(SpeedControls);
