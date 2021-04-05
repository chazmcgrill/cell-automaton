import React, { ReactNode } from 'react';
import { ThemeProvider as SCThemeProvider } from "styled-components";

export const defaultTheme = {
    colors: {
        primary: '#29CACF',
        default: '#EFEEEA',
        white: '#FFFFFF',
        black: '#241C15',
    },
};

export type Theme = typeof defaultTheme;

interface ThemeProviderProps {
    children: ReactNode;
    theme?: typeof defaultTheme;
}

export const ThemeProvider = ({ children, theme = defaultTheme }: ThemeProviderProps) => (
    <SCThemeProvider theme={theme}>
        {children}
    </SCThemeProvider>
);
