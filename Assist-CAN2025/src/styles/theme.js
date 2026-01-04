// Theme configuration for Assist CAN 2025
// Colors inspired by Morocco and CAN 2025

export const colors = {
  // Primary colors - Morocco flag
  primary: {
    green: '#006233',
    greenLight: '#00843D',
    greenDark: '#004D28',
    red: '#C1272D',
    redLight: '#E63946',
    redDark: '#8B1E23',
  },
  
  // CAN 2025 accent
  accent: {
    gold: '#FFD700',
    goldLight: '#FFE44D',
    goldDark: '#CCB000',
  },
  
  // Neutrals
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray100: '#F5F5F5',
    gray200: '#E5E5E5',
    gray300: '#D4D4D4',
    gray400: '#A3A3A3',
    gray500: '#737373',
    gray600: '#525252',
    gray700: '#404040',
    gray800: '#262626',
    gray900: '#171717',
  },
  
  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Background
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    dark: '#1A1A1A',
  },
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    semiBold: 'System',
  },
  
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
};

// Common component styles
export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
  },
  
  cardHeader: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.neutral.gray900,
    marginBottom: spacing.sm,
  },
  
  button: {
    backgroundColor: colors.primary.green,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonText: {
    color: colors.neutral.white,
    fontSize: typography.fontSize.base,
    fontWeight: '600',
  },
  
  input: {
    backgroundColor: colors.neutral.white,
    borderWidth: 1,
    borderColor: colors.neutral.gray300,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.base,
    color: colors.neutral.gray900,
  },
  
  heading1: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: 'bold',
    color: colors.neutral.gray900,
    marginBottom: spacing.md,
  },
  
  heading2: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: 'bold',
    color: colors.neutral.gray900,
    marginBottom: spacing.sm,
  },
  
  heading3: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: '600',
    color: colors.neutral.gray900,
    marginBottom: spacing.sm,
  },
  
  bodyText: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.gray700,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  
  smallText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.gray600,
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  commonStyles,
};
