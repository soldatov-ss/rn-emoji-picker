/// <reference types="react" />
interface Props {
    placeholder: string;
    value: string;
    darkMode: boolean;
    autoFocus: boolean;
    onChangeText(text: string): void;
}
export declare const Input: ({ placeholder, value, onChangeText, autoFocus, darkMode }: Props) => JSX.Element;
export {};
