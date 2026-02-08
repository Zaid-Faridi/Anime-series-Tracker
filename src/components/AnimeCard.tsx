import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';

interface AnimeCardProps {
    anime: any;
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
    const navigation = useNavigation<any>();
    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detail', { anime })}>
            <Image source={{ uri: anime.images.jpg.image_url }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>{anime.title}</Text>
                <View style={styles.info}>
                    <Star size={14} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.score}>{anime.score || 'N/A'}</Text>
                    <Text style={styles.type}> • {anime.type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 150,
        marginRight: 16,
        backgroundColor: theme.light.card,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: theme.light.border,
    },
    image: {
        width: '150%',
        height: 200,
        resizeMode: 'cover',
    },
    content: {
        padding: 8,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.light.text,
        height: 40,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    score: {
        fontSize: 12,
        color: theme.light.text,
        marginLeft: 4,
    },
    type: {
        fontSize: 12,
        color: theme.light.textSecondary,
    },
});
