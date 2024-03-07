"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabBar = void 0;
const react_native_1 = require("react-native");
const TabBar = ({ categories, activeCategory, onPress, darkMode, width }) => {
    const tabSize = width / categories.length;
    const uiSize = tabSize - 20;
    return (<react_native_1.View style={styles.container}>
			{categories.map(category => {
            return (<react_native_1.TouchableOpacity key={category.key} onPress={() => onPress(category)} style={[
                    styles.touchable,
                    {
                        height: tabSize
                    }
                ]}>
							<react_native_1.Text style={[
                    styles.emoji,
                    { fontSize: uiSize }
                ]}>
								{category.emoji}
							</react_native_1.Text>
							<react_native_1.View style={{
                    width: uiSize,
                    height: 1,
                    backgroundColor: category.key === activeCategory.key ? darkMode ? '#fff' : '#323333' : 'transparent'
                }}/>
						</react_native_1.TouchableOpacity>);
        })}
		</react_native_1.View>);
};
exports.TabBar = TabBar;
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    touchable: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emoji: {
        textAlign: 'center',
        paddingBottom: 8
    }
});
//# sourceMappingURL=index.js.map