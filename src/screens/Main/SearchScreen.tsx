import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useSearchAnime } from '../../services/api/hooks';
import { useNavigation } from '@react-navigation/native';
import { useDebounce } from 'use-debounce';

const SearchScreen = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const { data, isLoading } = useSearchAnime(debouncedQuery);
  const navigation = useNavigation<any>();

  const searchResults = data?.pages[0]?.media || [];

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('AnimeDetail', { anime: item })}
    >
      <Image source={{ uri: item.coverImage.large }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title.english || item.title.romaji}
        </Text>
        <Text style={styles.cardSubtitle}>
          {item.episodes ? `${item.episodes} Episodes` : 'Ongoing'} • {item.averageScore ? `${item.averageScore}%` : 'N/A'}
        </Text>
        <View style={styles.genresRow}>
          {(item.genres || []).slice(0, 2).map((genre: string, index: number) => (
            <View key={index} style={styles.genreBadge}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color={theme.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for anime, movies, series..."
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={22} color={theme.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.resultsContainer}>
        {isLoading ? (
          <View style={styles.centerState}>
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
        ) : searchQuery.length === 0 ? (
          <View style={styles.centerState}>
            <Ionicons name="search-outline" size={72} color={theme.border} />
            <Text style={styles.emptyText}>Find your next obsession</Text>
          </View>
        ) : searchResults.length === 0 ? (
          <View style={styles.centerState}>
            <Text style={styles.emptyText}>No results found</Text>
          </View>
        ) : (
          <FlatList
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  header: { padding: 24, paddingBottom: 16 },
  title: { fontSize: 32, fontWeight: '900', color: theme.text, letterSpacing: -0.5 },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: theme.card,
    marginHorizontal: 24, paddingHorizontal: 20, borderRadius: 16, height: 56, marginBottom: 24,
    shadowColor: "#000", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 4,
  },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, color: theme.text, fontSize: 16, fontWeight: '500' },
  resultsContainer: { flex: 1, paddingHorizontal: 24 },
  centerState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 },
  emptyText: { color: theme.textSecondary, marginTop: 20, fontSize: 18, fontWeight: '600' },
  card: { 
    flexDirection: 'row', marginBottom: 20, backgroundColor: theme.card, borderRadius: 16, 
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3,
  },
  cardImage: { width: 110, height: 150, borderTopLeftRadius: 16, borderBottomLeftRadius: 16 },
  cardInfo: { flex: 1, padding: 16, justifyContent: 'space-between' },
  cardTitle: { fontSize: 17, fontWeight: '800', color: theme.text, letterSpacing: -0.2 },
  cardSubtitle: { fontSize: 13, color: theme.textSecondary, marginVertical: 6, fontWeight: '600' },
  genresRow: { flexDirection: 'row', flexWrap: 'wrap' },
  genreBadge: {
    backgroundColor: theme.background, paddingHorizontal: 10,
    paddingVertical: 6, borderRadius: 8, marginRight: 8, marginTop: 6,
    borderWidth: 1, borderColor: theme.border
  },
  genreText: { color: theme.textSecondary, fontSize: 11, fontWeight: '700' }
});

export default SearchScreen;
