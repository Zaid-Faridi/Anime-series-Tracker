import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceholderScreen = ({ name }: { name: string }) => (
    <View style={styles.container}>
        <Text style={styles.text}>{name} Screen</Text>
    </View>
);

export const HomeScreen = () => <PlaceholderScreen name="Home" />;
export const WatchlistScreen = () => <PlaceholderScreen name="Watchlist" />;
export const SearchScreen = () => <PlaceholderScreen name="Search" />;
export const ClubsScreen = () => <PlaceholderScreen name="Clubs" />;
export const ProfileScreen = () => <PlaceholderScreen name="Profile" />;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
