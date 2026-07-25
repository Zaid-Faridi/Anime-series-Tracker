import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const AnimeCard = ({ title, image, rating, onPress, style }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.rating}>⭐ {rating}</Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    width: 130,
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: theme.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  info: {
    padding: 12,
  },
  title: {
    color: theme.text,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
  },
  rating: {
    color: theme.primary,
    fontSize: 12,
    fontWeight: '700',
  },
});

export default AnimeCard;
