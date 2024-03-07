"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_native_1 = require("react-native");
const emojiCell_1 = require("../emojiCell");
const EmojiRow = ({ rowItems, colSize, selectEmoji }) => {
    return (<react_native_1.View style={{ flexDirection: 'row' }}>
			{rowItems.map(emoji => (<emojiCell_1.EmojiCell key={emoji.unified} emoji={emoji} onPress={() => selectEmoji(emoji)} colSize={colSize}/>))}
		</react_native_1.View>);
};
exports.default = (0, react_1.memo)(EmojiRow);
//# sourceMappingURL=index.js.map