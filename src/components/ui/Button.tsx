import React, { memo, useCallback } from 'react';
import { ButtonValue } from './types';
import styled from 'styled-components';
import { darken } from 'polished';

type ButtonPriority = 'default' | 'important' | 'primary' | 'danger';

interface ButtonProps<T extends ButtonValue> {
    label: string;
    value?: T;
    onClick: (value?: T) => void;
    disabled?: boolean;
    priority?: 'default' | 'important' | 'primary' | 'danger';
}

const StyledButton = styled.button<{ priority: ButtonPriority }>`
    outline: none;
    border-style: none;
    border-radius: 3px;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    transition: background-color 0.3s;
    cursor: pointer;
    background-color: ${props => props.priority === 'primary' ? '#29cacf' : '#EFEEEA'};
    color: ${props => props.priority === 'primary' ? '#fff' : '#241C15'};

    &:hover {
        background-color: ${props => darken(0.1, props.priority === 'primary' ? '#29cacf' : '#EFEEEA')}
    }
`;

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
        <StyledButton
            disabled={disabled}
            onClick={handleClick}
            priority={priority}
        >
            {label}
        </StyledButton>
    );
};

export default memo(Button);
