import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

const mockToggleLifeCycle = jest.fn();
const mockOnClear = jest.fn();
const mockOnReset = jest.fn();
const mockHandleSpeedChange = jest.fn();

const CURRENT_INTERVAL_MS = 10;

describe('Header', () => {
    it('renders the correct text in the h1 element', () => {
        render(
            <Header
                toggleLifeCycle={mockToggleLifeCycle}
                onClear={mockOnClear}
                onReset={mockOnReset}
                handleSpeedChange={mockHandleSpeedChange}
                intervalMs={CURRENT_INTERVAL_MS}
                isPaused={false}
                lifeCycleCount={0}
            />,
        );
        expect(screen.getByRole('heading')).toHaveTextContent('Cell Automaton');
    });

    it('calls the toggleLifeCycle prop when the play/pause button is clicked', () => {
        render(
            <Header
                toggleLifeCycle={mockToggleLifeCycle}
                onClear={mockOnClear}
                onReset={mockOnReset}
                handleSpeedChange={mockHandleSpeedChange}
                intervalMs={CURRENT_INTERVAL_MS}
                isPaused={false}
                lifeCycleCount={0}
            />,
        );
        fireEvent.click(screen.getByText('Pause'));
        expect(mockToggleLifeCycle).toHaveBeenCalled();
    });

    it('calls the onClear prop when the clear button is clicked', () => {
        render(
            <Header
                toggleLifeCycle={mockToggleLifeCycle}
                onClear={mockOnClear}
                onReset={mockOnReset}
                handleSpeedChange={mockHandleSpeedChange}
                intervalMs={CURRENT_INTERVAL_MS}
                isPaused={false}
                lifeCycleCount={0}
            />,
        );
        fireEvent.click(screen.getByText('Clear'));
        expect(mockOnClear).toHaveBeenCalled();
    });

    it('calls the onReset prop when the reset button is clicked', () => {
        render(
            <Header
                toggleLifeCycle={mockToggleLifeCycle}
                onClear={mockOnClear}
                onReset={mockOnReset}
                handleSpeedChange={mockHandleSpeedChange}
                intervalMs={CURRENT_INTERVAL_MS}
                isPaused={false}
                lifeCycleCount={0}
            />,
        );
        fireEvent.click(screen.getByText('Reset'));
        expect(mockOnReset).toHaveBeenCalled();
    });

    it('calls the handleSpeedChange prop when a speed button is clicked', () => {
        render(
            <Header
                toggleLifeCycle={mockToggleLifeCycle}
                onClear={mockOnClear}
                onReset={mockOnReset}
                handleSpeedChange={mockHandleSpeedChange}
                intervalMs={CURRENT_INTERVAL_MS}
                isPaused={false}
                lifeCycleCount={0}
            />,
        );
        fireEvent.click(screen.getByText('X2'));
        expect(mockHandleSpeedChange).toHaveBeenCalledWith(200);
    });

    it('correct speed button should be selected with given interval', () => {
        render(
            <Header
                toggleLifeCycle={mockToggleLifeCycle}
                onClear={mockOnClear}
                onReset={mockOnReset}
                handleSpeedChange={mockHandleSpeedChange}
                intervalMs={200}
                isPaused={false}
                lifeCycleCount={0}
            />,
        );
        expect(screen.getByRole('X2-button-selected')).toBeTruthy();
    });

    it('button to run should show when control is paused', () => {
        render(
            <Header
                toggleLifeCycle={mockToggleLifeCycle}
                onClear={mockOnClear}
                onReset={mockOnReset}
                handleSpeedChange={mockHandleSpeedChange}
                intervalMs={CURRENT_INTERVAL_MS}
                isPaused={true}
                lifeCycleCount={0}
            />,
        );
        expect(screen.getByText('Run')).toBeTruthy();
    });

    it('life cycle count should display in the header component', () => {
        render(
            <Header
                toggleLifeCycle={mockToggleLifeCycle}
                onClear={mockOnClear}
                onReset={mockOnReset}
                handleSpeedChange={mockHandleSpeedChange}
                intervalMs={CURRENT_INTERVAL_MS}
                isPaused={true}
                lifeCycleCount={999}
            />,
        );
        expect(screen.getByText('999')).toBeTruthy();
    });
});
