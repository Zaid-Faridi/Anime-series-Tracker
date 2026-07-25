import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Switch, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useWatchlist } from '../../hooks/useWatchlist';

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const styles = getStyles(theme);

  const navigation = useNavigation<any>();
  const { data: watchlist = [] } = useWatchlist(user?.uid);

  const totalAnime = watchlist.length;
  const completedAnime = watchlist.filter(item => item.status === 'Completed').length;
  const episodesWatched = watchlist.reduce((acc, item) => acc + (item.episodesWatched || 0), 0);

  const renderMenuItem = (icon: any, title: string, hasToggle = false, isToggleOn = false, onToggle?: () => void, onPress?: () => void) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} disabled={hasToggle && !onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIconContainer}>
          <Ionicons name={icon} size={22} color={theme.primary} />
        </View>
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      {hasToggle ? (
        <Switch 
          trackColor={{ false: theme.border, true: theme.primary }} 
          thumbColor={'#FFF'} 
          value={isToggleOn} 
          onValueChange={onToggle}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {user?.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>
                {user?.displayName?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            )}
            <View style={styles.editAvatarBadge}>
              <Ionicons name="pencil" size={12} color="#FFF" />
            </View>
          </View>
          <Text style={styles.name}>{user?.displayName || 'Anime Fan'}</Text>
          <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalAnime}</Text>
            <Text style={styles.statLabel}>Total Anime</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{completedAnime}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{episodesWatched}</Text>
            <Text style={styles.statLabel}>Episodes</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          {renderMenuItem('heart', 'My Favorites', false, false, undefined, () => navigation.navigate('Favorites'))}
          {renderMenuItem('person', 'Edit Profile', false, false, undefined, () => navigation.navigate('EditProfile'))}
          {renderMenuItem('notifications', 'Notifications')}
          {renderMenuItem('moon', 'Dark Mode', true, isDarkMode, toggleTheme)}
          {renderMenuItem('settings', 'Settings')}
          {renderMenuItem('help-circle', 'Help Center')}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color={theme.primary} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  header: { padding: 24, paddingBottom: 16 },
  headerTitle: { fontSize: 32, fontWeight: '900', color: theme.text, letterSpacing: -0.5 },
  
  profileSection: { alignItems: 'center', paddingVertical: 16 },
  avatarContainer: {
    width: 110, height: 110, borderRadius: 55, backgroundColor: theme.card,
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
    borderWidth: 3, borderColor: theme.primary,
    shadowColor: theme.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8,
  },
  avatarImage: { width: 104, height: 104, borderRadius: 52 },
  avatarText: { fontSize: 44, fontWeight: '900', color: theme.text },
  editAvatarBadge: {
    position: 'absolute', bottom: 0, right: 0, backgroundColor: theme.primary,
    width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center',
    borderWidth: 3, borderColor: theme.background
  },
  
  name: { fontSize: 24, fontWeight: '800', color: theme.text, marginBottom: 6 },
  email: { fontSize: 15, color: theme.textSecondary, fontWeight: '500' },
  
  statsContainer: {
    flexDirection: 'row', backgroundColor: theme.card, marginHorizontal: 24,
    borderRadius: 20, paddingVertical: 20, marginBottom: 32,
    justifyContent: 'space-around', alignItems: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5,
  },
  statBox: { alignItems: 'center', flex: 1 },
  statNumber: { fontSize: 22, fontWeight: '900', color: theme.text, marginBottom: 4 },
  statLabel: { fontSize: 13, color: theme.textSecondary, fontWeight: '600' },
  statDivider: { width: 1, height: 40, backgroundColor: theme.border },
  
  menuSection: { paddingTop: 8, paddingHorizontal: 24 },
  menuItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.border
  },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIconContainer: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255, 76, 76, 0.1)',
    justifyContent: 'center', alignItems: 'center', marginRight: 16
  },
  menuTitle: { fontSize: 17, color: theme.text, fontWeight: '600' },
  
  logoutButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginTop: 40, paddingVertical: 16, marginHorizontal: 24,
    backgroundColor: 'rgba(255, 76, 76, 0.1)', borderRadius: 16
  },
  logoutIcon: { marginRight: 10 },
  logoutText: { fontSize: 18, fontWeight: 'bold', color: theme.primary }
});

export default ProfileScreen;
