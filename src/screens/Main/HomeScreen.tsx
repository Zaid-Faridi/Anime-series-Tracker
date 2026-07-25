import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useTrendingAnime, usePopularSeasonAnime, useTopRatedAnime, useUpcomingAnime, useGenreAnime } from '../../services/api/hooks';
import { useWatchlist, useMutateWatchlist } from '../../hooks/useWatchlist';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const styles = getStyles(theme);

  const { data: trendingData, isLoading: isTrendingLoading } = useTrendingAnime();
  const { data: popularData, isLoading: isPopularLoading } = usePopularSeasonAnime();
  const { data: topRatedData, isLoading: isTopRatedLoading } = useTopRatedAnime();
  const { data: upcomingData, isLoading: isUpcomingLoading } = useUpcomingAnime();
  const { data: actionData, isLoading: isActionLoading } = useGenreAnime("Action");
  const { data: romanceData, isLoading: isRomanceLoading } = useGenreAnime("Romance");

  const { watchlist } = useWatchlist();
  const { mutateAddToWatchlist } = useMutateWatchlist();
  const navigation = useNavigation<any>();

  const trendingAnime = trendingData?.pages[0]?.media || [];
  const popularAnime = popularData?.pages[0]?.media || [];
  const topRatedAnime = topRatedData?.pages[0]?.media || [];
  const upcomingAnime = upcomingData?.pages[0]?.media || [];
  const actionAnime = actionData?.pages[0]?.media || [];
  const romanceAnime = romanceData?.pages[0]?.media || [];
  
  const continueWatching = watchlist.filter(item => item.status === 'Watching');

  const handleIncrementEpisode = (item: any) => {
    mutateAddToWatchlist({
      ...item,
      episodesWatched: (item.episodesWatched || 0) + 1,
      updatedAt: Date.now()
    });
  };

  const renderAnimeList = (title: string, data: any[], isLoading: boolean) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 20 }} />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {data.map((anime: any) => (
            <TouchableOpacity 
              key={anime.id} 
              style={styles.card}
              onPress={() => navigation.navigate('AnimeDetail', { anime })}
            >
              <Image source={{ uri: anime.coverImage.large }} style={styles.cardImage} />
              <View style={styles.cardGradientOverlay} />
              <Text style={styles.cardTitle} numberOfLines={2}>
                {anime.title.english || anime.title.romaji}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.title}>What would you like to watch?</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity style={styles.iconBtn} onPress={toggleTheme}>
              <Ionicons name={isDarkMode ? "sunny" : "moon"} size={22} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={22} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Feature 5: Continue Watching Section */}
        {continueWatching.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Continue Watching</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {continueWatching.map((item) => (
                <View key={item.animeId} style={styles.continueCard}>
                  <TouchableOpacity onPress={() => navigation.navigate('AnimeDetail', { anime: { id: item.animeId } })}>
                    <Image source={{ uri: item.coverImage }} style={styles.continueImage} />
                  </TouchableOpacity>
                  <View style={styles.continueInfo}>
                    <Text style={styles.continueTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.continueProgress}>Ep {item.episodesWatched} / {item.totalEpisodes || '?'}</Text>
                  </View>
                  <TouchableOpacity style={styles.incrementBtn} onPress={() => handleIncrementEpisode(item)}>
                    <Ionicons name="add" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {renderAnimeList('Trending Now', trendingAnime, isTrendingLoading)}
        {renderAnimeList('Popular This Season', popularAnime, isPopularLoading)}
        {renderAnimeList('Upcoming Next Season', upcomingAnime, isUpcomingLoading)}
        {renderAnimeList('Highest Rated All Time', topRatedAnime, isTopRatedLoading)}
        
        {/* Genre Recommendations */}
        {renderAnimeList('Action Recommendations', actionAnime, isActionLoading)}
        {renderAnimeList('Romance Suggestions', romanceAnime, isRomanceLoading)}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 24, paddingTop: 20, paddingBottom: 24
  },
  greeting: { fontSize: 16, color: theme.textSecondary, marginBottom: 4, fontWeight: '500' },
  title: { fontSize: 26, fontWeight: '900', color: theme.text, letterSpacing: -0.5 },
  iconBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: theme.card,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3,
  },
  section: { marginBottom: 36 },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-end', paddingHorizontal: 24, marginBottom: 16
  },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: theme.text, letterSpacing: -0.5 },
  seeAll: { fontSize: 14, color: theme.primary, fontWeight: '700' },
  horizontalScroll: { paddingLeft: 24 },
  card: { width: 140, marginRight: 16 },
  cardImage: { width: 140, height: 210, borderRadius: 16, marginBottom: 12 },
  cardGradientOverlay: {
    position: 'absolute', bottom: 12, left: 0, right: 0, height: 80,
    borderBottomLeftRadius: 16, borderBottomRightRadius: 16,
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: theme.text, lineHeight: 20 },
  
  /* Continue Watching Card - Premium Float Effect */
  continueCard: {
    flexDirection: 'row', backgroundColor: theme.card, borderRadius: 16,
    marginRight: 16, width: 300, alignItems: 'center', padding: 12,
    shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 5,
  },
  continueImage: { width: 64, height: 84, borderRadius: 10 },
  continueInfo: { flex: 1, marginLeft: 16, justifyContent: 'center' },
  continueTitle: { fontSize: 16, fontWeight: '800', color: theme.text, marginBottom: 6 },
  continueProgress: { fontSize: 13, color: theme.textSecondary, fontWeight: '600' },
  incrementBtn: {
    backgroundColor: theme.primary, width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center', marginLeft: 12,
    shadowColor: theme.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4,
  }
});

export default HomeScreen;
