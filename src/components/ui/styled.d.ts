import { Theme } from './theme';

type CustomTheme = Theme;

// TODO: remove this file when replaced with sass
declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends CustomTheme {}
}
