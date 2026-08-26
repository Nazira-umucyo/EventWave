import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from './AppButton';
import { AppText } from './AppText';
import { Colors, Spacing } from '@/constants/theme';

type EmptyStateProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ icon, title, subtitle, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={40} color={Colors.primary} />
      </View>
      <AppText variant="h4" style={styles.title}>
        {title}
      </AppText>
      {subtitle ? (
        <AppText variant="body2" color={Colors.textFaint} style={styles.subtitle}>
          {subtitle}
        </AppText>
      ) : null}
      {actionLabel ? (
        <AppButton
          label={actionLabel}
          variant="dark"
          onPress={onAction}
          fullWidth={false}
          style={styles.button}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  button: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
});
