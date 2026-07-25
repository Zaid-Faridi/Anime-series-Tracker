export interface ThemeColors {
  background: string;
  card: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  isDark: boolean;
}

export const lightTheme: ThemeColors = {
  background: '#F8F9FA',
  card: '#FFFFFF',
  primary: '#FF4C4C', // The signature red
  text: '#1C1E21',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  success: '#10B981',
  warning: '#F59E0B',
  isDark: false,
};

export const darkTheme: ThemeColors = {
  background: '#0F1115',
  card: '#1F222A',
  primary: '#FF4C4C', // The signature red
  text: '#FFFFFF',
  textSecondary: '#A0A0A0',
  border: '#2A2D36',
  success: '#4CAF50',
  warning: '#FFC107',
  isDark: true,
};
