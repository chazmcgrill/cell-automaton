import { Theme } from "./theme";

type CustomTheme = Theme

declare module 'styled-components' {
    export interface DefaultTheme extends CustomTheme { }
}