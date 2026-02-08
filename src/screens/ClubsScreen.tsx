import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Users, MessageSquare, ChevronRight } from 'lucide-react-native';
import { theme } from '../styles/theme';

const MOCK_CLUBS = [
    { id: '1', name: 'Seasonal Hype', members: 1240, discussions: 45, image: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Classic Anime Fans', members: 890, discussions: 22, image: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Manga Readers Circle', members: 2100, discussions: 110, image: 'https://via.placeholder.com/50' },
];

export const ClubsScreen = () => {
    const renderClub = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.clubItem}>
            <View style={styles.clubInfo}>
                <View style={styles.imagePlaceholder}>
                    <Users size={24} color={theme.light.primary} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.clubName}>{item.name}</Text>
                    <Text style={styles.clubMeta}>{item.members} members • {item.discussions} discussions</Text>
                </View>
            </View>
            <ChevronRight size={20} color={theme.light.textSecondary} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Community Clubs</Text>
                <TouchableOpacity style={styles.createBtn}>
                    <Text style={styles.createBtnText}>Create New</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={MOCK_CLUBS}
                keyExtractor={(item) => item.id}
                renderItem={renderClub}
                contentContainerStyle={styles.list}
            />

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Discussions</Text>
            </View>

            <View style={styles.discussionPreview}>
                <MessageSquare size={20} color={theme.light.primary} />
                <View style={styles.discussionContent}>
                    <Text style={styles.discussionText}>"What are your thoughts on latest episode of Solo Leveling?"</Text>
                    <Text style={styles.discussionMeta}>Active in Seasonal Hype • 15m ago</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.light.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.light.text,
    },
    createBtn: {
        backgroundColor: theme.light.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    createBtnText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 12,
    },
    list: {
        paddingHorizontal: 16,
    },
    clubItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.light.surface,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: theme.light.border,
    },
    clubInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imagePlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F0EFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 12,
    },
    clubName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.light.text,
    },
    clubMeta: {
        fontSize: 12,
        color: theme.light.textSecondary,
        marginTop: 2,
    },
    sectionHeader: {
        padding: 16,
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.light.text,
    },
    discussionPreview: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: theme.light.surface,
        marginHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.light.border,
    },
    discussionContent: {
        marginLeft: 12,
        flex: 1,
    },
    discussionText: {
        fontSize: 14,
        color: theme.light.text,
        lineHeight: 20,
    },
    discussionMeta: {
        fontSize: 12,
        color: theme.light.textSecondary,
        marginTop: 4,
    },
});
