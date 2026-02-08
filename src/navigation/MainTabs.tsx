import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, List, Search, Users, User } from 'lucide-react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { WatchlistScreen } from '../screens/WatchlistScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ClubsScreen } from '../screens/ClubsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { theme } from '../styles/theme';

const Tab = createBottomTabNavigator();

export const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Home') return <Home color={color} size={size} />;
                    if (route.name === 'Watchlist') return <List color={color} size={size} />;
                    if (route.name === 'Search') return <Search color={color} size={size} />;
                    if (route.name === 'Clubs') return <Users color={color} size={size} />;
                    if (route.name === 'Profile') return <User color={color} size={size} />;
                },
                tabBarActiveTintColor: theme.light.primary,
                tabBarInactiveTintColor: theme.light.textSecondary,
                tabBarStyle: {
                    backgroundColor: theme.light.tabBar,
                    borderTopColor: theme.light.border,
                },
                headerStyle: {
                    backgroundColor: theme.light.surface,
                },
                headerTintColor: theme.light.text,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Watchlist" component={WatchlistScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Clubs" component={ClubsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};
