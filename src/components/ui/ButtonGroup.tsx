import React, { memo } from 'react';
import { ButtonItem, ButtonValue } from './types';

interface ButtonGroupProps<T extends ButtonValue> {
    onClickButton: (value: T) => void;
    buttonItems: ButtonItem<T>[];
    selectedValue: T;
}

const ButtonGroup = <T extends ButtonValue>({ buttonItems, onClickButton, selectedValue }: ButtonGroupProps<T>): JSX.Element => (
    <div className="button-group">
        {buttonItems.map((item) => (
            <span
                key={`${item.value}`}
                onClick={() => onClickButton(item.value)}
                className={`button-group-item${selectedValue === item.value ? ' button-group-item-active' : ''}`}
            >
                {item.label}
            </span>
        ))}
    </div>
);

export default memo(ButtonGroup);
