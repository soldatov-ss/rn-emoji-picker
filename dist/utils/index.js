"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcSectionItemLayout = exports.chunkEmojis = exports.sortEmojis = exports.emojiByCategory = void 0;
// filter emojis by category name
const emojiByCategory = (categoryName, emojis) => emojis.filter(e => e.category.toLowerCase() === categoryName.toLowerCase());
exports.emojiByCategory = emojiByCategory;
// sort dec using order param
const sortEmojis = (emojis) => emojis.sort((a, b) => a.order - b.order);
exports.sortEmojis = sortEmojis;
// chunk emojis into arrays for each row
const chunkEmojis = (emojis, key, chunkSize = 6) => {
    const chunkedArr = [];
    for (let i = 0; i < emojis.length; i += chunkSize) {
        const chunk = emojis.slice(i, i + chunkSize);
        chunkedArr.push({ key: key + '-' + i, category: key, data: chunk });
    }
    return chunkedArr;
};
exports.chunkEmojis = chunkEmojis;
const calcSectionItemLayout = ({ itemHeight = 0, separatorHeight = 0, sectionHeaderHeight = 0, sectionFooterHeight = 0, listHeaderHeight = 0, listFooterHeight = 0, sections = [], index = 0 }) => {
    let length = listHeaderHeight, offset = 0, currentIndex = 0;
    while (currentIndex < index) {
        offset += length;
        if (currentIndex > 0)
            length = listFooterHeight;
        currentIndex++;
        const sectionsLength = sections.length;
        for (let sectionIndex = 0; ((sectionIndex < sectionsLength) && (currentIndex < index)); sectionIndex++) {
            offset += length;
            length = sectionHeaderHeight;
            currentIndex++;
            const sectionData = sections[sectionIndex].data;
            const dataLength = sectionData.length;
            for (let dataIndex = 0; ((dataIndex < dataLength) && (currentIndex < index)); dataIndex++) {
                offset += length;
                const separator_height = dataIndex < dataLength - 1 ? separatorHeight : 0;
                length = itemHeight + separator_height;
                currentIndex++;
            }
            if (!dataLength && (currentIndex < index)) {
                offset += length;
                length = sectionFooterHeight;
                currentIndex++;
            }
        }
    }
    return {
        index,
        length,
        offset
    };
};
exports.calcSectionItemLayout = calcSectionItemLayout;
//# sourceMappingURL=index.js.map