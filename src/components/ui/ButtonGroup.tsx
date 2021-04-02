import React, { memo } from 'react';

export type ButtonValue = number | string;

export interface ButtonItem<T extends ButtonValue> {
    value: T;
    label: string;
}

interface ButtonProps<T extends ButtonValue> {
    label: string;
    isActive: boolean;
    value: T;
    onClick: (value: T) => void;
}

function Button<T extends ButtonValue>({
    onClick,
    label,
    isActive,
    value,
}: ButtonProps<T>) {
    const backgroundColor = isActive ? "#6C49B8" : "#29cacf";
    return (
        <button
            disabled={isActive}
            onClick={() => onClick(value)}
            style={{ backgroundColor }}
            className="group-button"
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
                <Button
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
