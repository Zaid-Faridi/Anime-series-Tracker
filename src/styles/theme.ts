export const theme = {
  light: {
    background: '#F8F9FA',
    surface: '#FFFFFF',
    primary: '#673AB7',
    secondary: '#03DAC6',
    text: '#121212',
    textSecondary: '#757575',
    accent: '#FF4081',
    border: '#E0E0E0',
    error: '#B00020',
    tabBar: '#FFFFFF',
    card: '#FFFFFF',
  },
  dark: {
    background: '#121212',
    surface: '#1E1E1E',
    primary: '#B39DDB',
    secondary: '#03DAC6',
    text: '#F8F9FA',
    textSecondary: '#B0BEC5',
    accent: '#FF4081',
    border: '#333333',
    error: '#CF6679',
    tabBar: '#1E1E1E',
    card: '#242424',
  }
};

export type ThemeType = typeof theme.light;
