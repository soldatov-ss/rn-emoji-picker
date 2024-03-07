"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryKeys = exports.categories = exports.SEARCH = exports.RECENT = void 0;
exports.RECENT = 'recent';
exports.SEARCH = 'search';
exports.categories = [
    { key: exports.RECENT, emoji: '🕛', name: 'Recently used' },
    { key: 'emotion', emoji: '🤪', name: 'Smileys & Emotion' },
    { key: 'people', emoji: '💁‍♀', name: 'People & Body' },
    { key: 'nature', emoji: '🦄', name: 'Animals & Nature' },
    { key: 'food', emoji: '🍔', name: 'Food & Drink' },
    { key: 'activities', emoji: '⚾️', name: 'Activities' },
    { key: 'places', emoji: '✈️', name: 'Travel & Places' },
    { key: 'objects', emoji: '💡', name: 'Objects' },
    { key: 'emojis', emoji: '⁉', name: 'Symbols' },
    { key: 'flags', emoji: '🏳️‍🌈', name: 'Flags' }
];
exports.categoryKeys = exports.categories.map(c => c.key);
//# sourceMappingURL=index.js.map