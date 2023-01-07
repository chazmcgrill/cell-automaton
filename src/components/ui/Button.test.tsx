import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from './Button';

const mockOnClick = jest.fn();

describe('Button', () => {
    it('renders the correct text', () => {
        render(<Button label="Click me" onClick={mockOnClick} />);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('calls the onClick prop when clicked', () => {
        render(<Button label="Click me" onClick={mockOnClick} />);
        fireEvent.click(screen.getByRole('button'));
        expect(mockOnClick).toHaveBeenCalled();
    });

    it('passes the value prop to the onClick prop when clicked', () => {
        render(<Button label="Click me" value={42} onClick={mockOnClick} />);
        fireEvent.click(screen.getByRole('button'));
        expect(mockOnClick).toHaveBeenCalledWith(42);
    });

    it('disables the button when the disabled prop is true', () => {
        render(<Button label="Click me" onClick={mockOnClick} disabled={true} />);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('applies the correct class based on the priority prop', () => {
        render(<Button label="Click me" onClick={mockOnClick} priority="primary" />);
        expect(screen.getByRole('button')).toHaveClass('primary');
    });
});
