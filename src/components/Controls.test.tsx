import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Controls from './Controls';

const mockOnPlay = jest.fn();
const mockOnClear = jest.fn();
const mockOnReset = jest.fn();

describe('Controls', () => {
    it('renders the correct text in the play/pause button when isPaused is true', () => {
        render(<Controls onPlay={mockOnPlay} onClear={mockOnClear} onReset={mockOnReset} isPaused={true} />);
        expect(screen.getByText('Run')).toBeTruthy();
    });

    it('renders the correct text in the play/pause button when isPaused is false', () => {
        render(<Controls onPlay={mockOnPlay} onClear={mockOnClear} onReset={mockOnReset} isPaused={false} />);
        expect(screen.getByText('Pause')).toBeTruthy();
    });

    it('calls the onPlay prop when the play/pause button is clicked', () => {
        render(<Controls onPlay={mockOnPlay} onClear={mockOnClear} onReset={mockOnReset} isPaused={true} />);
        fireEvent.click(screen.getByText('Run'));
        expect(mockOnPlay).toHaveBeenCalled();
    });

    it('calls the onClear prop when the clear button is clicked', () => {
        render(<Controls onPlay={mockOnPlay} onClear={mockOnClear} onReset={mockOnReset} isPaused={true} />);
        fireEvent.click(screen.getByText('Clear'));
        expect(mockOnClear).toHaveBeenCalled();
    });

    it('calls the onReset prop when the reset button is clicked', () => {
        render(<Controls onPlay={mockOnPlay} onClear={mockOnClear} onReset={mockOnReset} isPaused={true} />);
        fireEvent.click(screen.getByText('Reset'));
        expect(mockOnReset).toHaveBeenCalled();
    });
});
