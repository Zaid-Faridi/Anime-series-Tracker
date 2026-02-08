import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useWatchlistStore } from '../store/useWatchlistStore';
import { theme } from '../styles/theme';
import { Plus, Star } from 'lucide-react-native';

export const DetailScreen = ({ route }: any) => {
    const { anime } = route.params;
    const { addToWatchlist } = useWatchlistStore();

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: anime.images.jpg.large_image_url }} style={styles.heroImage} />
            <View style={styles.content}>
                <Text style={styles.title}>{anime.title}</Text>
                <Text style={styles.meta}>{anime.type} • {anime.episodes || '?'} Ep • {anime.status}</Text>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addToWatchlist(anime, 'Plan to Watch')}
                >
                    <Plus size={20} color="#FFF" />
                    <Text style={styles.addButtonText}>Add to Watchlist</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Synopsis</Text>
                <Text style={styles.synopsis}>{anime.synopsis}</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>User Reviews</Text>
                    <View style={styles.reviewCard}>
                        <View style={styles.reviewHeader}>
                            <Text style={styles.reviewer}>AnimeFan99</Text>
                            <View style={styles.rating}><Star size={12} fill="#FFD700" color="#FFD700" /><Text style={styles.ratingText}>9.0</Text></View>
                        </View>
                        <SpoilerText text="The ending where the main character sacrifices himself was absolutely heartbreaking!" />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const SpoilerText = ({ text }: { text: string }) => {
    const [show, setShow] = useState(false);
    return (
        <TouchableOpacity onPress={() => setShow(!show)} style={[styles.spoilerContainer, !show && styles.spoilerHidden]}>
            <Text style={[styles.reviewText, !show && { color: 'transparent' }]}>{text}</Text>
            {!show && <Text style={styles.spoilerLabel}>Click to reveal spoiler</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.light.background,
    },
    heroImage: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
    },
    content: {
        padding: 20,
        backgroundColor: theme.light.background,
        marginTop: -20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.light.text,
    },
    meta: {
        fontSize: 14,
        color: theme.light.textSecondary,
        marginTop: 4,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.light.primary,
        padding: 14,
        borderRadius: 12,
        marginTop: 20,
    },
    addButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.light.text,
        marginTop: 24,
        marginBottom: 8,
    },
    synopsis: {
        fontSize: 16,
        color: theme.light.text,
        lineHeight: 24,
    },
    section: {
        marginTop: 24,
    },
    reviewCard: {
        backgroundColor: theme.light.surface,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.light.border,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    reviewer: {
        fontWeight: 'bold',
        color: theme.light.text,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 12,
        marginLeft: 4,
        color: theme.light.text,
    },
    reviewText: {
        fontSize: 14,
        color: theme.light.textSecondary,
        lineHeight: 20,
    },
    spoilerContainer: {
        backgroundColor: '#F5F5F5',
        padding: 8,
        borderRadius: 8,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spoilerHidden: {
        backgroundColor: '#333',
    },
    spoilerLabel: {
        position: 'absolute',
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
