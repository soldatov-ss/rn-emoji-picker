/// <reference types="react" />
import { categories } from './constants';
import { Emoji } from './interfaces';
export declare const emojiFromUtf16: (utf16: string) => string;
declare type CategoryKey = `${typeof categories[number]['key']}`;
interface Props {
    recent?: Emoji[];
    emojis: Emoji[];
    loading: boolean;
    autoFocus: boolean;
    darkMode: boolean;
    perLine: number;
    backgroundColor?: string;
    defaultCategory?: CategoryKey;
    enabledCategories?: CategoryKey[];
    onSelect(emoji: Emoji): void;
    onChangeRecent?(recent: Emoji[]): void;
}
declare const EmojiPicker: ({ recent, emojis, loading, autoFocus, darkMode, backgroundColor, perLine, onSelect, onChangeRecent, defaultCategory, enabledCategories, }: Props) => JSX.Element;
export default EmojiPicker;
