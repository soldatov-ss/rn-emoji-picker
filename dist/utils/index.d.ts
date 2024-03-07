import { Emoji } from '../interfaces';
export declare const emojiByCategory: (categoryName: string, emojis: Emoji[]) => Emoji[];
export declare const sortEmojis: (emojis: Emoji[]) => Emoji[];
export declare const chunkEmojis: (emojis: Emoji[], key: string, chunkSize?: number) => {
    key: string;
    category: string;
    data: Emoji[];
}[];
interface Props {
    itemHeight: number;
    separatorHeight?: number;
    sectionHeaderHeight?: number;
    sectionFooterHeight?: number;
    listHeaderHeight?: number;
    listFooterHeight?: number;
    sections: any;
    index: number;
}
export declare const calcSectionItemLayout: ({ itemHeight, separatorHeight, sectionHeaderHeight, sectionFooterHeight, listHeaderHeight, listFooterHeight, sections, index }: Props) => {
    index: number;
    length: number;
    offset: number;
};
export {};
