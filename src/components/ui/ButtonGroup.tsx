import React, { memo } from 'react';
import { ButtonItem, ButtonValue } from './types';

interface ButtonProps<T extends ButtonValue> {
    label: string;
    isActive: boolean;
    value: T;
    onClick: (value: T) => void;
}

function GroupButton<T extends ButtonValue>({
    onClick,
    label,
    isActive,
    value,
}: ButtonProps<T>) {
    // const backgroundColor = isActive ? "#6C49B8" : "#29cacf";
    return (
        <button
            disabled={isActive}
            onClick={() => onClick(value)}
            // style={{ backgroundColor }}
            className={`group-button ${isActive ? 'active' : 'inactive'}`}
        >
            {label}
        </button>
    );
}

interface ButtonGroupProps<T extends ButtonValue> {
    onClickButton: (value: T) => void;
    buttonItems: ButtonItem<T>[];
    selectedValue: T;
}

function ButtonGroup<T extends ButtonValue>({ buttonItems, onClickButton, selectedValue }: ButtonGroupProps<T>): JSX.Element {
    console.log('selectedValue', selectedValue);
    return (
        <div className="button-group">
            {buttonItems.map(item => (
                <GroupButton
                    key={`${item.value}`}
                    label={item.label}
                    value={item.value}
                    onClick={onClickButton}
                    isActive={selectedValue === item.value}
                />
            ))}
        </div>
    );
}

export default memo(ButtonGroup);
