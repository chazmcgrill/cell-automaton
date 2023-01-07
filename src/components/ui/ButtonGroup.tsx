import React, { memo } from 'react';
import { ButtonItem, ButtonValue } from './types';

interface ButtonGroupProps<T extends ButtonValue> {
    onClickButton: (value: T) => void;
    buttonItems: ButtonItem<T>[];
    selectedValue: T;
}

const ButtonGroup = <T extends ButtonValue>({ buttonItems, onClickButton, selectedValue }: ButtonGroupProps<T>): JSX.Element => (
    <div className="button-group">
        {buttonItems.map((item) => {
            const isItemActive = selectedValue === item.value;
            return (
                <button
                    key={`${item.value}`}
                    data-testid="button-group-button"
                    onClick={() => onClickButton(item.value)}
                    role={`${item.label}-button${isItemActive ? '-selected' : ''}`}
                    className={`button-group-item${isItemActive ? ' button-group-item-active' : ''}`}
                >
                    {item.label}
                </button>
            );
        })}
    </div>
);

export default memo(ButtonGroup);
