import React, {useMemo, useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    SectionList,
    Keyboard,
} from 'react-native';
import {TabBar} from "./tab-bar";
import {Input} from "./input";
import {emojis as defaultEmojis} from "./data/emojis";
import {categories} from "./data/categories";
import {HISTORY, ALL, WIDTH} from "./constants";
import {EmojiCell} from "./emoji-cell";

export const emojiFromUtf16 = utf16 => String.fromCodePoint(...utf16.split("-").map(u => "0x" + u));

const emojiByCategory = (category, emojiSource) => emojiSource.filter(e => e.category === category.toLowerCase());
const sortEmoji = list => list.sort((a, b) => a.order - b.order);
const mapEmojis = emoji => ({key: emoji.unified, emoji});
const categoryKeys = Object.keys(categories);

const EmojiPicker = ({
                         onSelect = () => null,
                         history = [],
                         setHistory = () => null,
                         loading = false,
                         autoFocus = true,
                         emojis = null,
                         darkMode = true
                     }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState(categories.all);
    const isAll = category.name.toLowerCase() === ALL;
    const hasHistory = history.length > 0;
    const colSize = Math.floor(WIDTH / 6);
    const sectionList = useRef(null);
    const emojiSource = emojis || defaultEmojis;

    const emojiList = useMemo(() => {
        const list = {};
        categoryKeys.forEach(c => {
            const name = categories[c].name;
            list[name] = sortEmoji(emojiByCategory(name, emojiSource));
        });
        return list
    }, [emojiSource, categories]);

    const selectTab = category => {
        if (!loading && sectionList?.current) {
            sectionList.current.scrollToLocation({sectionIndex: 0, itemIndex: 0, animated: false});
            setSearchQuery('');
            setCategory(category);
        }
    };

    const selectEmoji = (emoji) => {
        addToHistory(emoji);
        onSelect(emoji);
    };

    const addToHistory = emoji => {
        let newHistory;
        const existing = history.find(h => h.unified === emoji.unified);
        if (existing) {
            const filtered = history.filter(h => h.unified !== emoji.unified);
            newHistory = [emoji, ...filtered];
        } else {
            newHistory = [emoji, ...history];
        }
        setHistory(newHistory.splice(0, 18));
    };

    const renderEmojiCell = ({item}) => (
        <EmojiCell
            key={item.key}
            emoji={item.emoji}
            onPress={() => selectEmoji(item.emoji)}
            colSize={colSize}
        />
    );

    const renderEmojiRow = ({item}) => {
        return (
            <FlatList
                data={item}
                numColumns={6}
                renderItem={renderEmojiCell}
                keyboardShouldPersistTaps="always"
            />
        );
    };


    const renderSectionHeader = ({section: {name}}) => {
        return (
            <Text
                style={styles.sectionHeader}
            >
                {searchQuery !== "" ? "Search Results" : name}
            </Text>
        )
    }

    const searchData = () => {
        const filtered = emojiSource.filter(e => {
            const term = searchQuery.toLowerCase();
            if (searchQuery.toLowerCase().includes(e.emoji)) return true;
            const keywords = e.keywords.join(' ');
            return !!keywords && keywords.toLowerCase().includes(term);
        });
        return [{name: 'search', data: [sortEmoji(filtered).map(mapEmojis)]}];
    }

    const parseSectionData = (category) => {
        if (category === categories.all) {
            let largeList = [];
            categoryKeys.forEach(c => {
                if (c === ALL && c === HISTORY) return;
                const name = categories[c].name;
                const list = emojiList[name];
                largeList = largeList.concat(list);
            });
            return largeList.map(mapEmojis);
        } else if (category === categories.history) {
            return history.map(mapEmojis);
        } else {
            const name = category.name;
            return emojiList[name].map(mapEmojis);
        }
    };

    const sectionData = (categories) => {
        return categories.map(category => {
            return {name: category.name, data: [parseSectionData(category)]};
        });
    };

    return (
        <View style={[styles.container, {backgroundColor: darkMode ? '#000' : '#fff'}]}>
            <TabBar
                activeCategory={category}
                onPress={selectTab}
                categories={categories}
                darkMode={darkMode}
            />
            <View style={{flex: 1}}>
                <View style={styles.searchbarContainer}>
                    <Input
                        placeholder="Search..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus={autoFocus}
                        darkMode={darkMode}
                    />
                </View>
                {!loading ? (
                    <SectionList
                        flex={1}
                        sections={
                            !searchQuery ?
                                sectionData(
                                    isAll && hasHistory ?
                                        [categories.history, category]
                                        :
                                        [category]
                                )
                                :
                                searchData()
                        }
                        keyExtractor={(item) => item.unified}
                        renderItem={renderEmojiRow}
                        renderSectionHeader={renderSectionHeader}
                        contentContainerStyle={{paddingBottom: colSize}}
                        horizontal={false}
                        numColumns={1}
                        keyboardShouldPersistTaps={"handled"}
                        removeClippedSubviews
                        showsVerticalScrollIndicator={false}
                        stickySectionHeadersEnabled={false}
                        ref={sectionList}
                        onScrollBeginDrag={Keyboard.dismiss}
                    />
                ) : (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#323333"/>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, width: '100%'},
    loader: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    searchbarContainer: {width: '100%', zIndex: 1, padding: 8},
    sectionHeader: {margin: 8, fontSize: 17, width: '100%', color: '#999'},
});

export default EmojiPicker;