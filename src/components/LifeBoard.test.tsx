import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LifeBoard from './LifeBoard';

const mockClickCell = jest.fn();
const cells = [
    { id: 0, cellStatus: 0 },
    { id: 1, cellStatus: 1 },
    { id: 2, cellStatus: 2 },
];

describe('LifeBoard', () => {
    it('renders the correct number of LifeCell components', () => {
        render(<LifeBoard cells={cells} clickCell={mockClickCell} />);
        expect(screen.getAllByTestId('life-cell').length).toBe(3);
    });

    it('calls the clickCell prop when a LifeCell component is clicked', () => {
        render(<LifeBoard cells={cells} clickCell={mockClickCell} />);
        fireEvent.click(screen.getByRole('togglable-dead-cell'));
        expect(mockClickCell).toHaveBeenCalled();
    });

    it('chunks the cells into smaller arrays when the cells array is over 2000 elements', () => {
        const largeCellsArray = new Array(2500).fill({ id: 0, cellStatus: 0 }).map((cell, index) => ({ ...cell, id: index }));
        render(<LifeBoard cells={largeCellsArray} clickCell={mockClickCell} />);
        expect(screen.getAllByTestId('life-cell').length).toBe(2500);
    });
});
