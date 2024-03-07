"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emojiFromUtf16 = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const tabBar_1 = require("./tabBar");
const input_1 = require("./input");
const constants_1 = require("./constants");
const sectionHeader_1 = require("./sectionHeader");
const emojiRow_1 = require("./emojiRow");
const utils_1 = require("./utils");
// helper fn for end users see https://github.com/yonahforst/react-native-emoji-picker/issues/4
const emojiFromUtf16 = (utf16) => String.fromCodePoint(...utf16.split('-').map(u => '0x' + u));
exports.emojiFromUtf16 = emojiFromUtf16;
const EmojiPicker = ({ recent = [], emojis = [], loading = false, autoFocus = true, darkMode = true, backgroundColor = darkMode ? '#000' : '#fff', perLine = 8, onSelect = (emoji) => null, onChangeRecent = (recent) => { }, defaultCategory = 'emotion', enabledCategories = constants_1.categoryKeys, }) => {
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [width, setWidth] = (0, react_1.useState)(0);
    const colSize = Math.floor(width / perLine);
    const sectionList = (0, react_1.useRef)(null);
    const [init, setInit] = (0, react_1.useState)(true);
    const finalCategories = constants_1.categories.filter(category => enabledCategories.includes(category.key));
    const [category, setCategory] = (0, react_1.useState)(finalCategories.find(c => c.key === defaultCategory) || finalCategories[1]); // smiley
    const { sections } = (0, react_1.useMemo)(() => {
        const emojiList = {}; // map of emojis to categories
        finalCategories.forEach(category => {
            const key = category.key;
            const list = key === constants_1.RECENT ? recent : (0, utils_1.sortEmojis)((0, utils_1.emojiByCategory)(category.name, emojis));
            emojiList[key] = (0, utils_1.chunkEmojis)(list, key, perLine);
        });
        const sections = finalCategories.map(category => ({ name: category.name, key: category.key, data: emojiList[category.key] }));
        return ({ sections });
    }, [emojis, finalCategories, recent]);
    const searchResults = (0, react_1.useMemo)(() => {
        if (!searchQuery.length)
            return [];
        let emoji;
        const filtered = emojis.filter(e => {
            const term = searchQuery.toLowerCase();
            if (term.includes(e.emoji)) {
                emoji = e; // if user types an emoji select it
                return true;
            }
            return e.keywords.some(e => e.includes(term));
        });
        if (emoji)
            onSelect(emoji);
        return [{ name: 'Search results', key: constants_1.SEARCH, data: (0, utils_1.chunkEmojis)(filtered, constants_1.SEARCH, perLine) }]; // create one section on results
    }, [emojis, searchQuery]);
    const selectTab = (category) => {
        setSearchQuery('');
        setCategory(category);
        setInit(false);
    };
    const selectEmoji = (emoji) => {
        onSelect(emoji);
        addToRecent(emoji);
    };
    const addToRecent = (emoji) => {
        const newRecent = [];
        const existing = recent.find(h => h.unified === emoji.unified);
        if (existing) { // if already saved, bump to the front
            const filtered = recent.filter(h => h.unified !== emoji.unified);
            newRecent.push(emoji, ...filtered);
        }
        else { // add to the front
            newRecent.push(emoji, ...recent);
        }
        onChangeRecent(newRecent.splice(0, 18));
    };
    const renderSectionHeader = ({ section }) => <sectionHeader_1.default name={section.name}/>;
    const renderEmojiRow = ({ item }) => <emojiRow_1.default selectEmoji={selectEmoji} rowItems={item.data} colSize={colSize}/>;
    const activeSection = sections.find(s => s.key === category.key);
    return (<react_native_1.View style={[styles.container, { backgroundColor }]} onLayout={event => setWidth(event.nativeEvent.layout.width)}>
			<tabBar_1.TabBar activeCategory={category} onPress={selectTab} categories={finalCategories} darkMode={darkMode} width={width}/>
			<react_native_1.View style={{ flex: 1 }}>
				<react_native_1.View style={styles.searchbarContainer}>
					<input_1.Input placeholder="Search..." value={searchQuery} onChangeText={setSearchQuery} autoFocus={autoFocus} darkMode={darkMode}/>
				</react_native_1.View>
				{!loading ? (<react_native_1.SectionList style={{ flex: 1 }} sections={searchQuery ? searchResults : init && recent.length ? [sections[0], activeSection] : [activeSection]} keyExtractor={(item) => item.key} renderItem={renderEmojiRow} renderSectionHeader={renderSectionHeader} contentContainerStyle={{ paddingBottom: colSize }} horizontal={false} keyboardShouldPersistTaps={"handled"} removeClippedSubviews showsVerticalScrollIndicator={false} stickySectionHeadersEnabled={false} ref={sectionList} onScrollBeginDrag={react_native_1.Keyboard.dismiss}/>
        // <SectionList
        // 	style={{flex: 1}}
        // 	sections={searchResults.length ? searchResults : sections}
        // 	keyExtractor={item => item.key}
        // 	renderItem={renderEmojiRow}
        // 	renderSectionHeader={renderSectionHeader}
        // 	contentContainerStyle={{paddingBottom: colSize}}
        // 	horizontal={false}
        // 	keyboardShouldPersistTaps={'handled'}
        // 	removeClippedSubviews={true}
        // 	showsVerticalScrollIndicator={false}
        // 	stickySectionHeadersEnabled={false}
        // 	ref={sectionList}
        // 	initialNumToRender={total} // @todo calc section list item layout see calcSectionItemLayout util method
        // 	onScrollBeginDrag={Keyboard.dismiss}
        // 	onViewableItemsChanged={data => { // update category from scroll pos
        // 		const categoryKey = data.viewableItems[0]?.item?.category
        // 		if (!categoryKey || categoryKey === category.key) return
        // 		if (categoryKey === 'search') return setCategory(categories[0])
        // 		setCategory(categories.find(c => c.key === categoryKey)!)
        // 	}}
        // />
        ) : (<react_native_1.View style={styles.loader}>
						<react_native_1.ActivityIndicator size="large" color="#323333"/>
					</react_native_1.View>)}
			</react_native_1.View>
		</react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: { flex: 1, width: '100%' },
    loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    searchbarContainer: { width: '100%', zIndex: 1, padding: 8 },
    sectionHeader: { margin: 8, fontSize: 17, width: '100%', color: '#999' }
});
exports.default = EmojiPicker;
//# sourceMappingURL=index.js.map