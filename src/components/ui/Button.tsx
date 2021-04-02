import React, { memo, useCallback } from 'react';
import { ButtonValue } from './types';

interface ButtonProps<T extends ButtonValue> {
    label: string;
    value?: T;
    onClick: (value?: T) => void;
    disabled?: boolean;
    priority?: 'default' | 'important' | 'primary' | 'danger';
}

const Button = <T extends ButtonValue, >({
    onClick,
    value,
    label,
    disabled,
    priority = 'default',
}: ButtonProps<T>): JSX.Element => {
    const handleClick = useCallback(() => {
        onClick(value)
    }, [value, onClick]);

    return (
        <button
            disabled={disabled}
            onClick={handleClick}
            className={`button-${priority}`}
        >
            {label}
        </button>
    );
};

export default memo(Button);
