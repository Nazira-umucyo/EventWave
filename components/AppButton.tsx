import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, StyleSheet, ViewStyle } from 'react-native';

import { AppText } from './AppText';
import { Colors, Radius } from '@/constants/theme';

type AppButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'dark' | 'orange' | 'outline' | 'light';
  size?: 'md' | 'sm';
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  fullWidth?: boolean;
};

export function AppButton({
  label,
  onPress,
  variant = 'dark',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  style,
  fullWidth = true,
}: AppButtonProps) {
  const palette = {
    dark: { bg: Colors.buttonLinear, text: Colors.white },
    orange: { bg: Colors.primary, text: Colors.white },
    light: { bg: Colors.grey, text: Colors.textPrimary },
    outline: { bg: 'transparent', text: Colors.textPrimary },
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        size === 'sm' && styles.baseSm,
        { backgroundColor: palette.bg },
        variant === 'outline' && styles.outlineBorder,
        fullWidth && styles.fullWidth,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={palette.text} />
      ) : (
        <>
          {icon && <Ionicons name={icon} size={16} color={palette.text} style={styles.icon} />}
          <AppText variant="button1" color={palette.text}>
            {label}
          </AppText>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: Radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  baseSm: {
    height: 40,
    paddingHorizontal: 14,
  },
  outlineBorder: {
    borderWidth: 1,
    borderColor: Colors.border,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    marginRight: 8,
  },
});
