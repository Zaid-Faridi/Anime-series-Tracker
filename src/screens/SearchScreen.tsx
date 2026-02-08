import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Search as SearchIcon } from 'lucide-react-native';
import { AnimeService } from '../services/animeService';
import { AnimeCard } from '../components/AnimeCard';
import { theme } from '../styles/theme';

export const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (text: string) => {
        setQuery(text);
        if (text.length > 2) {
            setLoading(true);
            const data = await AnimeService.searchAnime(text);
            setResults(data);
            setLoading(false);
        } else if (text.length === 0) {
            setResults([]);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <SearchIcon size={20} color={theme.light.textSecondary} />
                <TextInput
                    style={styles.input}
                    placeholder="Search Anime..."
                    placeholderTextColor={theme.light.textSecondary}
                    value={query}
                    onChangeText={handleSearch}
                />
            </View>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={theme.light.primary} />
                </View>
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.mal_id.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View style={styles.cardWrapper}>
                            <AnimeCard anime={item} />
                        </View>
                    )}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        query.length > 2 ? (
                            <Text style={styles.emptyText}>No results found for "{query}"</Text>
                        ) : (
                            <Text style={styles.emptyText}>Try searching for your favorite anime</Text>
                        )
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.light.background,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.light.surface,
        margin: 16,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.light.border,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: theme.light.text,
    },
    list: {
        padding: 8,
    },
    cardWrapper: {
        flex: 1,
        marginBottom: 16,
        alignItems: 'center',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: theme.light.textSecondary,
        fontSize: 16,
    },
});
