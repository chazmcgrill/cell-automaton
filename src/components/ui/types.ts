export type ButtonValue = number | string;

export interface ButtonItem<T extends ButtonValue> {
    value: T;
    label: string;
}