import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useWatchlistStore, WatchlistStatus } from '../store/useWatchlistStore';
import { theme } from '../styles/theme';
import { Plus, Minus } from 'lucide-react-native';

const STATUS_TABS: WatchlistStatus[] = ['Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch'];

export const WatchlistScreen = () => {
    const { watchlist, updateProgress } = useWatchlistStore();
    const [activeTab, setActiveTab] = useState<WatchlistStatus>('Watching');

    const filteredList = watchlist.filter(item => item.status === activeTab);

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.animeItem}>
            <Image source={{ uri: item.image_url }} style={styles.thumbnail} />
            <View style={styles.itemContent}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.itemProgress}>Episodes: {item.episodes_watched} / {item.total_episodes || '?'}</Text>
            </View>
            <View style={styles.controls}>
                <TouchableOpacity
                    style={styles.controlBtn}
                    onPress={() => updateProgress(item.mal_id, Math.max(0, item.episodes_watched - 1))}
                >
                    <Minus size={16} color={theme.light.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.controlBtn}
                    onPress={() => updateProgress(item.mal_id, item.episodes_watched + 1)}
                >
                    <Plus size={16} color={theme.light.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
                {STATUS_TABS.map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <FlatList
                data={filteredList}
                keyExtractor={(item) => item.mal_id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ListEmptyComponent={<Text style={styles.emptyText}>No anime in this category</Text>}
            />
        </View>
    );
};

import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.light.background,
    },
    tabsContainer: {
        maxHeight: 50,
        borderBottomWidth: 1,
        borderBottomColor: theme.light.border,
        paddingHorizontal: 8,
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        justifyContent: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: theme.light.primary,
    },
    tabText: {
        fontSize: 14,
        color: theme.light.textSecondary,
        fontWeight: '600',
    },
    activeTabText: {
        color: theme.light.primary,
    },
    list: {
        padding: 16,
    },
    animeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.light.surface,
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: theme.light.border,
    },
    thumbnail: {
        width: 50,
        height: 70,
        borderRadius: 6,
    },
    itemContent: {
        flex: 1,
        marginLeft: 12,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.light.text,
    },
    itemProgress: {
        fontSize: 14,
        color: theme.light.textSecondary,
        marginTop: 4,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    controlBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F0EFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: theme.light.textSecondary,
        fontSize: 16,
    },
});
