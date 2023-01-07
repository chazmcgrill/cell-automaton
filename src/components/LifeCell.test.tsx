import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LifeCell from './LifeCell';

describe('LifeCell', () => {
    it('renders the correct class name based on the cellStatus prop for a dead cell', () => {
        render(<LifeCell cellStatus={0} id={0} clickCell={jest.fn()} />);
        expect(screen.getByRole('togglable-dead-cell')).toBeTruthy();
    });

    it('renders the correct class name based on the cellStatus prop for a young cell', () => {
        render(<LifeCell cellStatus={1} id={0} clickCell={jest.fn()} />);
        expect(screen.getByRole('togglable-young-cell')).toBeTruthy();
    });

    it('renders the correct class name based on the cellStatus prop for an old cell', () => {
        render(<LifeCell cellStatus={2} id={0} clickCell={jest.fn()} />);
        expect(screen.getByRole('togglable-old-cell')).toBeTruthy();
    });

    it('calls the clickCell prop when clicked', () => {
        const mockClickCell = jest.fn();
        render(<LifeCell cellStatus={0} id={0} clickCell={mockClickCell} />);
        fireEvent.click(screen.getByRole('togglable-dead-cell'));
        expect(mockClickCell).toHaveBeenCalledWith(0);
    });
});
