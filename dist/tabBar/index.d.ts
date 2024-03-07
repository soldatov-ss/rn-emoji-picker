/// <reference types="react" />
import { Category } from '../interfaces';
interface Props {
    categories: Readonly<Category[]>;
    activeCategory: Category;
    darkMode: boolean;
    width: number;
    onPress(category: Category): void;
}
export declare const TabBar: ({ categories, activeCategory, onPress, darkMode, width }: Props) => JSX.Element;
export {};
