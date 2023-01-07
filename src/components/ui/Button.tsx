import React, { memo, useCallback } from 'react';
import { ButtonValue } from './types';

type ButtonPriority = 'default' | 'important' | 'primary' | 'danger';

interface ButtonProps<T extends ButtonValue> {
    label: string;
    value?: T;
    onClick: (value?: T) => void;
    disabled?: boolean;
    priority?: ButtonPriority;
}

const Button = <T extends ButtonValue>({ onClick, value, label, disabled, priority = 'default' }: ButtonProps<T>): JSX.Element => {
    const handleClick = useCallback(() => {
        onClick(value);
    }, [value, onClick]);

    return (
        <button disabled={disabled} onClick={handleClick} className={`button ${priority}`}>
            {label}
        </button>
    );
};

export default memo(Button);
