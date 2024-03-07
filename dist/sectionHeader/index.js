"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_native_1 = require("react-native");
const SectionHeader = ({ name }) => {
    return (<react_native_1.Text style={styles.sectionHeader}>
			{name}
		</react_native_1.Text>);
};
const styles = react_native_1.StyleSheet.create({
    sectionHeader: { margin: 8, fontSize: 17, width: '100%', color: '#999' }
});
exports.default = (0, react_1.memo)(SectionHeader);
//# sourceMappingURL=index.js.map