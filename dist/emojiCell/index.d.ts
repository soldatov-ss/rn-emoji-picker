/// <reference types="react" />
import { Emoji } from '../interfaces';
interface Props {
    emoji: Emoji;
    colSize: number;
    onPress(): void;
}
export declare const EmojiCell: ({ emoji, colSize, onPress }: Props) => JSX.Element;
export {};
