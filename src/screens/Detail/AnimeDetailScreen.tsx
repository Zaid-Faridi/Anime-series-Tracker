import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAnimeDetail } from '../../services/api/hooks';
import { useWatchlist, useMutateWatchlist } from '../../hooks/useWatchlist';
import { useFavorites, useMutateFavorites } from '../../hooks/useFavorites';
import { useNotifications } from '../../hooks/useNotifications';
import YoutubeIframe from 'react-native-youtube-iframe';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { AuthContext } from '../../context/AuthContext';

const AnimeDetailScreen = ({ route, navigation }: any) => {
  const { anime } = route.params;
  const animeId = anime?.id;
  const { data: detailData, isLoading } = useAnimeDetail(animeId);
  const animeData = detailData || anime;
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const { watchlist } = useWatchlist();
  const { mutateAddToWatchlist, mutateRemoveFromWatchlist } = useMutateWatchlist();
  const { favorites } = useFavorites();
  const { mutateAddToFavorites, mutateRemoveFromFavorites } = useMutateFavorites();
  const { scheduleAiringNotification } = useNotifications();

  const [modalVisible, setModalVisible] = useState(false);
  const [trailerVisible, setTrailerVisible] = useState(false);
  const [reviewVisible, setReviewVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState('10');
  
  const { user } = React.useContext(AuthContext);
  const watchlistItem = watchlist.find(item => item.animeId === animeId);
  const [status, setStatus] = useState<any>(watchlistItem?.status || 'Watching');
  const [episodes, setEpisodes] = useState(watchlistItem?.episodesWatched?.toString() || '0');

  const isFavorite = favorites.some(f => f.animeId === animeId);

  const toggleFavorite = () => {
    if (isFavorite) {
      mutateRemoveFromFavorites(animeId);
    } else {
      mutateAddToFavorites({
        animeId,
        title: animeData.title?.romaji || animeData.title,
        coverImage: animeData.coverImage?.large || animeData.image,
        addedAt: Date.now()
      });
    }
  };

  const handleSaveWatchlist = () => {
    mutateAddToWatchlist({
      animeId,
      title: animeData.title?.romaji || animeData.title,
      coverImage: animeData.coverImage?.large || animeData.image,
      episodesWatched: parseInt(episodes) || 0,
      totalEpisodes: animeData.episodes || null,
      status: status,
      updatedAt: Date.now()
    });
    
    // Schedule notification if there's an airing episode
    if (animeData.nextAiringEpisode?.timeUntilAiring && status === 'Watching') {
      scheduleAiringNotification(animeData.title?.romaji || animeData.title, animeData.nextAiringEpisode.timeUntilAiring);
    }

    setModalVisible(false);
  };

  const handleSaveReview = async () => {
    if (!reviewText.trim()) return;
    try {
      await addDoc(collection(db, 'reviews'), {
        userId: user?.uid,
        userName: user?.email?.split('@')[0] || 'Anonymous',
        animeId,
        animeTitle: animeData.title?.romaji || animeData.title,
        text: reviewText,
        rating: parseInt(reviewRating) || 10,
        createdAt: Date.now(),
      });
      setReviewVisible(false);
      setReviewText('');
    } catch (e) {
      console.log('Error saving review:', e);
    }
  };

  const handleRemoveWatchlist = () => {
    mutateRemoveFromWatchlist(animeId);
    setModalVisible(false);
  };

  if (isLoading && !animeData) return <View style={styles.container} />;

  const coverUrl = animeData.coverImage?.large || animeData.image;
  const title = animeData.title?.romaji || animeData.title;

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: coverUrl }} style={styles.image} />
          <View style={styles.imageOverlay} />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={toggleFavorite} style={styles.actionIconBtn}>
                <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={26} color={theme.primary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.actionIconBtn}>
                <Ionicons name={watchlistItem ? "bookmark" : "bookmark-outline"} size={26} color={theme.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.metaRow}>
            {animeData.averageScore && (
              <View style={styles.metaBadge}>
                <Ionicons name="star" size={16} color={theme.warning} />
                <Text style={[styles.metaText, { color: theme.text }]}>{animeData.averageScore}%</Text>
              </View>
            )}
            <View style={styles.metaBadge}>
              <Text style={styles.metaText}>{animeData.episodes || '?'} Episodes</Text>
            </View>
          </View>

          <View style={styles.genresRow}>
            {(animeData.genres || []).map((genre: string, index: number) => (
              <View key={index} style={styles.genreBadge}>
                <Text style={styles.genreText}>{genre}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Synopsis</Text>
          <Text style={styles.description}>
            {animeData.description?.replace(/<[^>]+>/g, '') || "No description available."}
          </Text>

          {/* Trailer Button */}
          {animeData.trailer?.site === 'youtube' && (
            <TouchableOpacity style={styles.trailerBtn} onPress={() => setTrailerVisible(true)}>
              <Ionicons name="play-circle" size={24} color="#FFF" />
              <Text style={styles.trailerBtnText}>Watch Trailer</Text>
            </TouchableOpacity>
          )}

          {/* Characters Section */}
          {animeData.characters?.edges?.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Characters & Voice Actors</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -24, paddingHorizontal: 24 }}>
                {animeData.characters.edges.map((charEdge: any, index: number) => (
                  <View key={index} style={styles.characterCard}>
                    <View style={styles.charHalf}>
                      <Image source={{ uri: charEdge.node.image?.large }} style={styles.charImage} />
                      <Text style={styles.charName} numberOfLines={2}>{charEdge.node.name.full}</Text>
                    </View>
                    {charEdge.voiceActors?.length > 0 && (
                      <View style={styles.charHalf}>
                        <Image source={{ uri: charEdge.voiceActors[0].image?.large }} style={styles.charImage} />
                        <Text style={styles.vaName} numberOfLines={2}>{charEdge.voiceActors[0].name.full}</Text>
                      </View>
                    )}
                  </View>
                ))}
                <View style={{ width: 40 }} />
              </ScrollView>
            </>
          )}

          {/* Write a Review Button */}
          <TouchableOpacity style={[styles.trailerBtn, { backgroundColor: theme.card, marginTop: 24 }]} onPress={() => setReviewVisible(true)}>
            <Ionicons name="create-outline" size={24} color={theme.text} />
            <Text style={[styles.trailerBtnText, { color: theme.text }]}>Write a Review</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>

      {/* Watchlist Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add to Watchlist</Text>
            
            <Text style={styles.modalLabel}>Status</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 24, paddingBottom: 8}}>
              {['Watching', 'Completed', 'Plan to Watch', 'On Hold', 'Dropped'].map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.statusOption, status === s && styles.statusOptionActive]}
                  onPress={() => setStatus(s as any)}
                >
                  <Text style={[styles.statusOptionText, status === s && styles.statusOptionTextActive]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.modalLabel}>Episodes Watched</Text>
            <View style={styles.episodesInputContainer}>
              <TextInput
                style={styles.episodesInput}
                keyboardType="numeric"
                value={episodes}
                onChangeText={setEpisodes}
                maxLength={4}
              />
              <Text style={styles.episodesMax}>/ {animeData.episodes || '?'}</Text>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButtonOutline} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonTextOutline}>Cancel</Text>
              </TouchableOpacity>
              {watchlistItem && (
                <TouchableOpacity style={styles.modalButtonOutline} onPress={handleRemoveWatchlist}>
                  <Text style={[styles.modalButtonTextOutline, { color: theme.primary }]}>Remove</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.modalButton} onPress={handleSaveWatchlist}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Trailer Modal */}
      <Modal visible={trailerVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setTrailerVisible(false)} />
          <View style={styles.trailerContainer}>
            <View style={styles.trailerHeader}>
              <Text style={styles.trailerTitle}>Official Trailer</Text>
              <TouchableOpacity onPress={() => setTrailerVisible(false)}>
                <Ionicons name="close-circle" size={30} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
            {animeData.trailer?.id && (
              <YoutubeIframe
                height={250}
                play={true}
                videoId={animeData.trailer.id}
              />
            )}
          </View>
        </View>
      </Modal>

      {/* Review Modal */}
      <Modal visible={reviewVisible} transparent animationType="fade">
        <View style={[styles.modalOverlay, { justifyContent: 'center', padding: 24 }]}>
          <View style={[styles.modalContent, { borderRadius: 24, paddingBottom: 24 }]}>
            <View style={styles.trailerHeader}>
              <Text style={styles.trailerTitle}>Write a Review</Text>
              <TouchableOpacity onPress={() => setReviewVisible(false)}>
                <Ionicons name="close-circle" size={28} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
            <View style={styles.episodesInputContainer}>
              <Text style={[styles.modalLabel, { marginRight: 12, marginBottom: 0 }]}>Rating (1-10):</Text>
              <TextInput
                style={[styles.episodesInput, { width: 60, height: 40, paddingVertical: 0 }]}
                keyboardType="numeric"
                value={reviewRating}
                onChangeText={setReviewRating}
                maxLength={2}
              />
            </View>
            <TextInput
              style={{
                backgroundColor: theme.background, color: theme.text,
                borderWidth: 1, borderColor: theme.border, borderRadius: 12,
                padding: 16, height: 120, textAlignVertical: 'top', marginBottom: 20
              }}
              placeholder="What did you think of this anime?"
              placeholderTextColor={theme.textSecondary}
              multiline
              value={reviewText}
              onChangeText={setReviewText}
            />
            <TouchableOpacity style={[styles.modalButton, { marginLeft: 0 }]} onPress={handleSaveReview}>
              <Text style={[styles.modalButtonText, { textAlign: 'center' }]}>Post to Community</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  imageContainer: { position: 'relative', height: 420 },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  imageOverlay: { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.1)' },
  backButton: {
    position: 'absolute', top: 50, left: 20, width: 44, height: 44,
    borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center', alignItems: 'center'
  },
  content: {
    padding: 24, borderTopLeftRadius: 32, borderTopRightRadius: 32,
    backgroundColor: theme.background, marginTop: -32,
    shadowColor: "#000", shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 10,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  title: { flex: 1, fontSize: 26, fontWeight: '900', color: theme.text, marginRight: 16, letterSpacing: -0.5 },
  actionIconBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: theme.card,
    justifyContent: 'center', alignItems: 'center', marginLeft: 12,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
  },
  metaRow: { flexDirection: 'row', marginBottom: 20 },
  metaBadge: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: theme.card,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, marginRight: 12,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1,
  },
  metaText: { color: theme.textSecondary, fontSize: 14, marginLeft: 6, fontWeight: '700' },
  genresRow: { flexDirection: 'row', marginBottom: 24, flexWrap: 'wrap' },
  genreBadge: {
    backgroundColor: theme.background, paddingHorizontal: 12,
    paddingVertical: 8, borderRadius: 12, marginRight: 10, marginBottom: 10,
    borderWidth: 1, borderColor: theme.border
  },
  genreText: { color: theme.textSecondary, fontSize: 13, fontWeight: '700' },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: theme.text, marginBottom: 12, letterSpacing: -0.5 },
  description: { fontSize: 15, color: theme.textSecondary, lineHeight: 24, marginBottom: 24, fontWeight: '500' },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { 
    backgroundColor: theme.background, borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24,
    paddingBottom: 40
  },
  modalTitle: { fontSize: 22, fontWeight: '900', color: theme.text, marginBottom: 24, letterSpacing: -0.5 },
  modalLabel: { fontSize: 15, color: theme.textSecondary, marginBottom: 12, fontWeight: '700' },
  statusOption: {
    paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20,
    backgroundColor: theme.card, marginRight: 12, borderWidth: 1, borderColor: 'transparent', height: 40
  },
  statusOptionActive: { backgroundColor: 'rgba(255, 76, 76, 0.1)', borderColor: theme.primary },
  statusOptionText: { color: theme.textSecondary, fontSize: 14, fontWeight: '600' },
  statusOptionTextActive: { color: theme.primary, fontWeight: '800' },
  
  episodesInputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  episodesInput: {
    backgroundColor: theme.card, color: theme.text, paddingHorizontal: 16,
    paddingVertical: 14, borderRadius: 12, width: 90, textAlign: 'center', fontSize: 18, fontWeight: 'bold'
  },
  episodesMax: { color: theme.textSecondary, fontSize: 18, marginLeft: 12, fontWeight: 'bold' },
  
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end' },
  modalButton: { 
    backgroundColor: theme.primary, paddingHorizontal: 24, paddingVertical: 14, 
    borderRadius: 16, marginLeft: 12,
    shadowColor: theme.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  modalButtonOutline: {
    backgroundColor: 'transparent', paddingHorizontal: 24, paddingVertical: 14,
    borderRadius: 16, marginLeft: 12, borderWidth: 1, borderColor: theme.border
  },
  modalButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  modalButtonTextOutline: { color: theme.text, fontWeight: 'bold', fontSize: 16 },
  
  trailerBtn: {
    flexDirection: 'row', backgroundColor: theme.primary, paddingVertical: 14,
    borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 12,
    shadowColor: theme.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  trailerBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  trailerContainer: { backgroundColor: theme.background, paddingBottom: 40, borderTopLeftRadius: 32, borderTopRightRadius: 32 },
  trailerHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 24, alignItems: 'center' },
  trailerTitle: { fontSize: 20, fontWeight: 'bold', color: theme.text },
  
  characterCard: { 
    flexDirection: 'row', backgroundColor: theme.card, borderRadius: 16, 
    marginRight: 16, padding: 12, width: 220,
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  charHalf: { flex: 1, alignItems: 'center' },
  charImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 8 },
  charName: { fontSize: 13, fontWeight: 'bold', color: theme.text, textAlign: 'center' },
  vaName: { fontSize: 12, color: theme.textSecondary, textAlign: 'center', marginTop: 2 },
});

export default AnimeDetailScreen;
