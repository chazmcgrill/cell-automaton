import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LifeCell from './LifeCell';

describe('LifeCell', () => {
    it('renders the correct class name based on the cellStatus prop for a dead cell', () => {
        render(<LifeCell cellStatus={0} id={0} clickCell={() => {}} />);
        expect(screen.getByTestId('life-cell').classList.contains('dead-cell')).toBe(true);
    });

    it('renders the correct class name based on the cellStatus prop for a young cell', () => {
        render(<LifeCell cellStatus={1} id={0} clickCell={() => {}} />);
        expect(screen.getByTestId('life-cell').classList.contains('young-cell')).toBe(true);
    });

    it('renders the correct class name based on the cellStatus prop for an old cell', () => {
        render(<LifeCell cellStatus={2} id={0} clickCell={() => {}} />);
        expect(screen.getByTestId('life-cell').classList.contains('old-cell')).toBe(true);
    });

    it('calls the clickCell prop when clicked', () => {
        const mockClickCell = jest.fn();
        render(<LifeCell cellStatus={0} id={0} clickCell={mockClickCell} />);
        fireEvent.click(screen.getByTestId('life-cell'));
        expect(mockClickCell).toHaveBeenCalledWith(0);
    });
});
