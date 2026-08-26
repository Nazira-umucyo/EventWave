import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { Colors, Radius, Spacing } from '@/constants/theme';

type SegmentedTabsProps<T extends string> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  variant?: 'pill' | 'underline';
};

export function SegmentedTabs<T extends string>({
  options,
  value,
  onChange,
  variant = 'pill',
}: SegmentedTabsProps<T>) {
  if (variant === 'underline') {
    return (
      <View style={styles.underlineRow}>
        {options.map((option) => {
          const active = option.value === value;
          return (
            <Pressable key={option.value} onPress={() => onChange(option.value)} style={styles.underlineTab}>
              <AppText variant="h5" color={active ? Colors.primary : Colors.textFaint}>
                {option.label}
              </AppText>
              {active && <View style={styles.underlineIndicator} />}
            </Pressable>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.pillWrap}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.pillTab, active && styles.pillTabActive]}>
            <AppText variant="button2" color={active ? Colors.white : Colors.textMuted}>
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  pillWrap: {
    flexDirection: 'row',
    backgroundColor: Colors.grey,
    borderRadius: Radius.pill,
    padding: 4,
  },
  pillTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: Radius.pill,
  },
  pillTabActive: {
    backgroundColor: Colors.primary,
  },
  underlineRow: {
    flexDirection: 'row',
    gap: Spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  underlineTab: {
    paddingBottom: Spacing.sm,
    alignItems: 'center',
  },
  underlineIndicator: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.primary,
    marginTop: Spacing.sm,
    borderRadius: 1,
  },
});
