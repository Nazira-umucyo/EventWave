import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from './AppText';
import { Colors, Spacing } from '@/constants/theme';

type ScreenHeaderProps = {
  title?: string;
  onBack?: () => void;
  transparent?: boolean;
  tintColor?: string;
  rightIcons?: { icon: keyof typeof Ionicons.glyphMap; onPress?: () => void; color?: string }[];
  hideBack?: boolean;
};

export function ScreenHeader({
  title,
  onBack,
  transparent = false,
  tintColor = Colors.textPrimary,
  rightIcons = [],
  hideBack = false,
}: ScreenHeaderProps) {
  return (
    <View style={[styles.row, transparent && styles.transparent]}>
      {hideBack ? (
        <View style={styles.iconButton} />
      ) : (
        <Pressable
          hitSlop={12}
          onPress={onBack ?? (() => (router.canGoBack() ? router.back() : router.replace('/(tabs)')))}
          style={styles.iconButton}>
          <Ionicons name="arrow-back" size={22} color={tintColor} />
        </Pressable>
      )}

      {title ? (
        <AppText variant="h4" style={styles.title} numberOfLines={1} color={tintColor}>
          {title}
        </AppText>
      ) : (
        <View style={styles.title} />
      )}

      <View style={styles.rightRow}>
        {rightIcons.map((item, index) => (
          <Pressable key={index} hitSlop={10} onPress={item.onPress} style={styles.iconButton}>
            <Ionicons name={item.icon} size={20} color={item.color ?? tintColor} />
          </Pressable>
        ))}
        {rightIcons.length === 0 && <View style={styles.iconButton} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  rightRow: {
    flexDirection: 'row',
  },
});
