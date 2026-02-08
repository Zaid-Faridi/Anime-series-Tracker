import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useWatchlistStore } from '../store/useWatchlistStore';
import { theme } from '../styles/theme';
import { Settings, Award, Clock, Tv } from 'lucide-react-native';

export const ProfileScreen = () => {
    const { watchlist } = useWatchlistStore();

    const stats = {
        total: watchlist.length,
        completed: watchlist.filter(i => i.status === 'Completed').length,
        watching: watchlist.filter(i => i.status === 'Watching').length,
        episodes: watchlist.reduce((acc, curr) => acc + curr.episodes_watched, 0),
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileImagePlaceholder}>
                    <Text style={styles.profileInitial}>Z</Text>
                </View>
                <Text style={styles.username}>Zaid Faridi</Text>
                <Text style={styles.bio}>Anime Enthusiast & Developer</Text>
                <View style={styles.settingsBtn}>
                    <Settings size={20} color={theme.light.textSecondary} />
                </View>
            </View>

            <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                    <Tv size={24} color={theme.light.primary} />
                    <Text style={styles.statValue}>{stats.total}</Text>
                    <Text style={styles.statLabel}>Total Anime</Text>
                </View>
                <View style={styles.statCard}>
                    <Award size={24} color="#FFD700" />
                    <Text style={styles.statValue}>{stats.completed}</Text>
                    <Text style={styles.statLabel}>Completed</Text>
                </View>
                <View style={styles.statCard}>
                    <Clock size={24} color={theme.light.accent} />
                    <Text style={styles.statValue}>{stats.episodes}</Text>
                    <Text style={styles.statLabel}>Episodes</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Analytics Dashboard</Text>
                <View style={styles.analyticsCard}>
                    <Text style={styles.analyticsTitle}>Watching Distribution</Text>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressSegment, { width: '40%', backgroundColor: theme.light.primary }]} />
                        <View style={[styles.progressSegment, { width: '30%', backgroundColor: theme.light.secondary }]} />
                        <View style={[styles.progressSegment, { width: '20%', backgroundColor: theme.light.accent }]} />
                    </View>
                    <View style={styles.legend}>
                        <View style={styles.legendItem}><View style={[styles.dot, { backgroundColor: theme.light.primary }]} /><Text style={styles.legendText}>Watching</Text></View>
                        <View style={styles.legendItem}><View style={[styles.dot, { backgroundColor: theme.light.secondary }]} /><Text style={styles.legendText}>Plan to Watch</Text></View>
                        <View style={styles.legendItem}><View style={[styles.dot, { backgroundColor: theme.light.accent }]} /><Text style={styles.legendText}>Dropped</Text></View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.light.background,
    },
    header: {
        alignItems: 'center',
        padding: 32,
        backgroundColor: theme.light.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.light.border,
    },
    profileImagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    profileInitial: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFF',
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.light.text,
    },
    bio: {
        fontSize: 14,
        color: theme.light.textSecondary,
        marginTop: 4,
    },
    settingsBtn: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        marginTop: -30,
    },
    statCard: {
        backgroundColor: theme.light.surface,
        padding: 16,
        borderRadius: 16,
        width: '30%',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.light.text,
        marginTop: 8,
    },
    statLabel: {
        fontSize: 12,
        color: theme.light.textSecondary,
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.light.text,
        marginBottom: 16,
    },
    analyticsCard: {
        backgroundColor: theme.light.surface,
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.light.border,
    },
    analyticsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.light.text,
        marginBottom: 16,
    },
    progressBar: {
        height: 12,
        flexDirection: 'row',
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: '#EEE',
    },
    progressSegment: {
        height: '100%',
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    legendText: {
        fontSize: 12,
        color: theme.light.textSecondary,
    },
});
