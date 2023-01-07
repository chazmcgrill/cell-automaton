import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ButtonGroup from './ButtonGroup';

const mockOnClickButton = jest.fn();
const buttonItems = [
    { value: 1, label: 'X1' },
    { value: 2, label: 'X2' },
    { value: 3, label: 'X3' },
];

describe('ButtonGroup', () => {
    it('renders the correct number of buttons', () => {
        render(<ButtonGroup onClickButton={mockOnClickButton} buttonItems={buttonItems} selectedValue={1} />);
        expect(screen.getAllByTestId('button-group-button').length).toBe(3);
    });

    it('adds the button-group-item-active class to the selected button', () => {
        render(<ButtonGroup onClickButton={mockOnClickButton} buttonItems={buttonItems} selectedValue={2} />);
        expect(screen.getByRole('X2-button-selected')).toHaveClass('button-group-item-active');
    });

    it('calls the onClickButton prop when a button is clicked', () => {
        render(<ButtonGroup onClickButton={mockOnClickButton} buttonItems={buttonItems} selectedValue={0} />);
        fireEvent.click(screen.getByRole('X1-button'));
        expect(mockOnClickButton).toHaveBeenCalledWith(1);
    });
});
