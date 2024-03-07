"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmojiCell = void 0;
const react_native_1 = require("react-native");
const EmojiCell = ({ emoji, colSize, onPress }) => (<react_native_1.TouchableOpacity activeOpacity={0.5} style={{ width: colSize, height: colSize, alignItems: 'center', justifyContent: 'center' }} onPress={onPress}>
		<react_native_1.Text style={{ color: '#fff', fontSize: colSize - 15 }} children={emoji.emoji}/>
	</react_native_1.TouchableOpacity>);
exports.EmojiCell = EmojiCell;
//# sourceMappingURL=index.js.map