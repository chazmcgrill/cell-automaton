import React, { memo } from 'react';
import { lighten } from 'polished';
import styled from 'styled-components';
import { ButtonItem, ButtonValue } from './types';

interface ButtonGroupProps<T extends ButtonValue> {
    onClickButton: (value: T) => void;
    buttonItems: ButtonItem<T>[];
    selectedValue: T;
}

const GroupButton = styled.button<{ isActive: boolean }>`
    color: ${({ theme }) => theme.colors.black};
    border-style: none;
    padding: calc(0.5rem - 2px) calc(1rem - 2px);
    cursor: pointer;
    outline: none;
    transition: background-color 0.3s;
    border-top: 1px solid #BDBBB9;
    border-bottom: 1px solid #BDBBB9;
    border-right: 1px solid #BDBBB9;
    background-color: ${({ theme, isActive }) => isActive ? lighten(0.3, theme.colors.primary) : theme.colors.white};

    &:hover {
        background-color: ${({ theme, isActive }) => isActive ? lighten(0.2, theme.colors.primary) : lighten(0.45, theme.colors.primary) }
    }

    &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-left: 1px solid #BDBBB9;
    }

    &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-right: 1px solid #BDBBB9;
    }
`

const ButtonGroup = <T extends ButtonValue, >({ 
    buttonItems, 
    onClickButton, 
    selectedValue, 
}: ButtonGroupProps<T>): JSX.Element => (
    <div>
        {buttonItems.map(item => (
            <GroupButton
                key={`${item.value}`}
                onClick={() => onClickButton(item.value)}
                isActive={selectedValue === item.value}
            >
                {item.label}
            </GroupButton>
        ))}
    </div>
);

export default memo(ButtonGroup);
