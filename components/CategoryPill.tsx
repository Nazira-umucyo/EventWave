import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from './AppText';
import { Colors, Radius, Spacing } from '@/constants/theme';

type CategoryPillProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  active?: boolean;
  onPress?: () => void;
};

export function CategoryPill({ label, icon, active, onPress }: CategoryPillProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.pill, active ? styles.pillActive : styles.pillInactive]}>
      <Ionicons name={icon} size={14} color={active ? Colors.white : Colors.textMuted} />
      <AppText variant="body3" color={active ? Colors.white : Colors.textMuted}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: Radius.pill,
  },
  pillActive: {
    backgroundColor: Colors.primary,
  },
  pillInactive: {
    backgroundColor: Colors.grey,
  },
});
