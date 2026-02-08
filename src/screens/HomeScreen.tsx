import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { AnimeService } from '../services/animeService';
import { AnimeCard } from '../components/AnimeCard';
import { theme } from '../styles/theme';

export const HomeScreen = () => {
    const [trending, setTrending] = useState<any[]>([]);
    const [topAnime, setTopAnime] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const [trendingData, topData] = await Promise.all([
                AnimeService.getTrendingAnime(),
                AnimeService.getTopAnime(),
            ]);
            setTrending(trendingData);
            setTopAnime(topData);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={theme.light.primary} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Trending Now</Text>
                <FlatList
                    horizontal
                    data={trending}
                    keyExtractor={(item) => item.mal_id.toString()}
                    renderItem={({ item }) => <AnimeCard anime={item} />}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listPadding}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Top Rated Anime</Text>
                <FlatList
                    horizontal
                    data={topAnime}
                    keyExtractor={(item) => item.mal_id.toString()}
                    renderItem={({ item }) => <AnimeCard anime={item} />}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listPadding}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.light.background,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.light.background,
    },
    section: {
        paddingVertical: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.light.text,
        marginLeft: 16,
        marginBottom: 12,
    },
    listPadding: {
        paddingLeft: 16,
    },
});
