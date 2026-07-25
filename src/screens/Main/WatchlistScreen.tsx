import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useWatchlist } from '../../hooks/useWatchlist';
import { useNavigation } from '@react-navigation/native';

const STATUS_TABS = ['All', 'Watching', 'Completed', 'Plan to Watch', 'On Hold', 'Dropped'];

const WatchlistScreen = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  
  const [activeTab, setActiveTab] = useState('All');
  const { watchlist, loading } = useWatchlist();
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: { item: any }) => {
    const totalEps = item.totalEpisodes || 1;
    const progressPercent = Math.min(100, Math.max(0, (item.episodesWatched / totalEps) * 100));

    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('AnimeDetail', { anime: { id: item.animeId } })}
      >
        <Image source={{ uri: item.coverImage }} style={styles.image} />
        <View style={styles.cardInfo}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          
          {/* Visual Progress Bar */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Ep {item.episodesWatched} / {item.totalEpisodes || '?'}</Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
            </View>
          </View>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={20} color={theme.textSecondary} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const filteredWatchlist = watchlist.filter(item => activeTab === 'All' || item.status === activeTab);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Watchlist</Text>
      </View>

      <View style={styles.tabs}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={STATUS_TABS}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.tab, activeTab === item && styles.activeTab]}
              onPress={() => setActiveTab(item)}
            >
              <Text style={[styles.tabText, activeTab === item && styles.activeTabText]}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      </View>

      {loading ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Loading...</Text>
        </View>
      ) : filteredWatchlist.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="bookmark-outline" size={72} color={theme.border} />
          <Text style={styles.emptyText}>No anime in this list.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredWatchlist}
          keyExtractor={item => item.animeId.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  header: { padding: 24, paddingBottom: 16 },
  headerTitle: { fontSize: 32, fontWeight: '900', color: theme.text, letterSpacing: -0.5 },
  tabs: { paddingHorizontal: 24, marginBottom: 20, height: 44 },
  tab: { marginRight: 24, paddingBottom: 12, borderBottomWidth: 3, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: theme.primary },
  tabText: { fontSize: 16, color: theme.textSecondary, fontWeight: '600' },
  activeTabText: { color: theme.primary, fontWeight: '800' },
  listContent: { paddingHorizontal: 24, paddingBottom: 40 },
  card: {
    flexDirection: 'row', backgroundColor: theme.card,
    borderRadius: 16, padding: 12, marginBottom: 20,
    shadowColor: "#000", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 4,
  },
  image: { width: 90, height: 130, borderRadius: 12 },
  cardInfo: { flex: 1, marginLeft: 16, justifyContent: 'space-between', paddingVertical: 4 },
  title: { fontSize: 17, fontWeight: '800', color: theme.text, letterSpacing: -0.2 },
  
  progressContainer: { marginVertical: 8 },
  progressText: { fontSize: 13, color: theme.textSecondary, marginBottom: 6, fontWeight: '600' },
  progressBarBackground: { height: 6, backgroundColor: theme.border, borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: theme.primary, borderRadius: 3 },

  statusBadge: {
    backgroundColor: theme.background, alignSelf: 'flex-start',
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8,
    borderWidth: 1, borderColor: theme.border
  },
  statusText: { color: theme.textSecondary, fontSize: 11, fontWeight: '700' },
  moreButton: { padding: 4 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 },
  emptyText: { color: theme.textSecondary, fontSize: 18, marginTop: 20, fontWeight: '600' }
});

export default WatchlistScreen;
