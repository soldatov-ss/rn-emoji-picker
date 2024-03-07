"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const react_native_1 = require("react-native");
const Input = ({ placeholder, value, onChangeText, autoFocus, darkMode }) => {
    return (<react_native_1.View style={[styles.container, {
                backgroundColor: darkMode ? '#323333' : '#fff',
                borderColor: darkMode ? 'transparent' : '#999',
                borderWidth: darkMode ? 0 : 1
            }]}>
			<react_native_1.View style={{ flex: 1 }}>
				<react_native_1.TextInput clearButtonMode={'while-editing'} style={[styles.input, { color: darkMode ? '#fff' : '#323333' }]} returnKeyType={'search'} onChangeText={onChangeText} value={value} placeholder={placeholder} placeholderTextColor="#999" blurOnSubmit underlineColorAndroid="transparent" autoFocus={autoFocus} keyboardAppearance={darkMode ? 'dark' : 'light'} autoCorrect={false}/>
			</react_native_1.View>
		</react_native_1.View>);
};
exports.Input = Input;
const styles = react_native_1.StyleSheet.create({
    container: {
        borderRadius: 4,
        overflow: 'hidden',
        height: 34,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        paddingHorizontal: 15,
        height: 34,
        fontSize: 16,
        padding: 0
    }
});
//# sourceMappingURL=index.js.map