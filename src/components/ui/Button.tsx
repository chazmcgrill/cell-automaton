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
    background-color: ${({ priority, theme }) => (priority === 'primary' ? theme.colors.primary : theme.colors.default)};
    color: ${({ priority, theme }) => (priority === 'primary' ? theme.colors.white : theme.colors.black)};

    &:hover {
        background-color: ${({ priority, theme }) => darken(0.1, priority === 'primary' ? theme.colors.primary : theme.colors.default)};
    }
`;

const Button = <T extends ButtonValue>({ onClick, value, label, disabled, priority = 'default' }: ButtonProps<T>): JSX.Element => {
    const handleClick = useCallback(() => {
        onClick(value);
    }, [value, onClick]);

    return (
        <StyledButton disabled={disabled} onClick={handleClick} priority={priority}>
            {label}
        </StyledButton>
    );
};

export default memo(Button);
