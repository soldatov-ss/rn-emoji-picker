import React from 'react';
import { Emoji } from '../interfaces';
interface Props {
    rowItems: Emoji[];
    colSize: number;
    selectEmoji(emoji: Emoji): void;
}
declare const _default: React.MemoExoticComponent<({ rowItems, colSize, selectEmoji }: Props) => JSX.Element>;
export default _default;
