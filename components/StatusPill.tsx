import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from './AppText';
import { Colors, Radius } from '@/constants/theme';

type StatusPillProps = {
  label: string;
  variant?: 'price' | 'success' | 'pending' | 'neutral';
  icon?: keyof typeof Ionicons.glyphMap;
};

export function StatusPill({ label, variant = 'price', icon }: StatusPillProps) {
  const palette = {
    price: { bg: 'transparent', text: Colors.primary },
    success: { bg: '#E7F7EF', text: Colors.success },
    pending: { bg: Colors.grey, text: Colors.textMuted },
    neutral: { bg: Colors.grey, text: Colors.textPrimary },
  }[variant];

  return (
    <View style={[styles.pill, { backgroundColor: palette.bg }]}>
      {icon && <Ionicons name={icon} size={12} color={palette.text} style={styles.icon} />}
      <AppText variant="caption4" color={palette.text}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  icon: {
    marginRight: 4,
  },
});
