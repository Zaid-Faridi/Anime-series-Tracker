import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { AuthContext } from '../../context/AuthContext';

const CommunityScreen = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(data);
    });

    return () => unsubscribe();
  }, []);

  const renderReview = ({ item }: { item: any }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.userSection}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{item.userName?.[0]?.toUpperCase() || 'U'}</Text>
          </View>
          <View>
            <Text style={styles.userName}>{item.userName || 'Anonymous'}</Text>
            <Text style={styles.animeTitle}>watching {item.animeTitle}</Text>
          </View>
        </View>
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color={theme.warning} />
          <Text style={[styles.ratingText, { color: theme.text }]}>{item.rating}/10</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image 
            source={require('../../../assets/icon.png')} 
            style={{ width: 32, height: 32, borderRadius: 8, marginRight: 12 }} 
          />
          <Text style={styles.title}>Community</Text>
        </View>
      </View>
      {reviews.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="chatbubbles-outline" size={60} color={theme.textSecondary} />
          <Text style={styles.emptyText}>No reviews yet. Be the first to review an anime!</Text>
        </View>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={renderReview}
          contentContainerStyle={{ padding: 24 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  header: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 12 },
  title: { fontSize: 32, fontWeight: '900', color: theme.text, letterSpacing: -1 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  emptyText: { fontSize: 16, color: theme.textSecondary, textAlign: 'center', marginTop: 16 },
  
  reviewCard: {
    backgroundColor: theme.card, borderRadius: 16, padding: 16, marginBottom: 16,
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  userSection: { flexDirection: 'row', alignItems: 'center' },
  avatarPlaceholder: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: theme.primary,
    justifyContent: 'center', alignItems: 'center', marginRight: 12
  },
  avatarText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  userName: { fontSize: 15, fontWeight: 'bold', color: theme.text },
  animeTitle: { fontSize: 12, color: theme.primary, fontWeight: '600', marginTop: 2 },
  
  ratingBadge: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: theme.background,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8,
  },
  ratingText: { fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
  reviewText: { fontSize: 15, color: theme.textSecondary, lineHeight: 22 },
});

export default CommunityScreen;
