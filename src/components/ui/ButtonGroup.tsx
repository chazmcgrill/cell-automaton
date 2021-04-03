import React, { memo } from 'react';
import { darken, lighten } from 'polished';
import styled from 'styled-components';
import { ButtonItem, ButtonValue } from './types';

const GroupButton = styled.button<{ isActive: boolean }>`
    color: black;
    border-style: none;
    padding: calc(0.5rem - 2px) calc(1rem - 2px);
    cursor: pointer;
    outline: none;
    transition: background-color 0.3s;
    border-top: 1px solid #BDBBB9;
    border-bottom: 1px solid #BDBBB9;
    border-right: 1px solid #BDBBB9;
    background-color: ${props => props.isActive ? '#CCE5E7' : '#fff'};

    &:hover {
        background-color: ${props => props.isActive ? darken(0.05, '#CCE5E7') : lighten(0.10, '#CCE5E7')}
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

interface ButtonGroupProps<T extends ButtonValue> {
    onClickButton: (value: T) => void;
    buttonItems: ButtonItem<T>[];
    selectedValue: T;
}

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
