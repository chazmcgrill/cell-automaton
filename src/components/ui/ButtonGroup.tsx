import React, { memo } from 'react';
import { ButtonItem, ButtonValue } from './types';

interface ButtonProps<T extends ButtonValue> {
    label: string;
    isActive: boolean;
    value: T;
    onClick: (value: T) => void;
}

const GroupButton = <T extends ButtonValue, >({
    onClick,
    label,
    isActive,
    value,
}: ButtonProps<T>) => (
    <button
        disabled={isActive}
        onClick={() => onClick(value)}
        className={`group-button ${isActive ? 'active' : 'inactive'}`}
    >
        {label}
    </button>
);

interface ButtonGroupProps<T extends ButtonValue> {
    onClickButton: (value: T) => void;
    buttonItems: ButtonItem<T>[];
    selectedValue: T;
}

const ButtonGroup = <T extends ButtonValue, >({ buttonItems, onClickButton, selectedValue }: ButtonGroupProps<T>): JSX.Element => (
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

export default memo(ButtonGroup);
