import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from './AppText';
import { Colors, Radius } from '@/constants/theme';

type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export function Stepper({ value, onChange, min = 1, max = 99 }: StepperProps) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        style={[styles.button, value <= min && styles.buttonDisabled]}>
        <Ionicons name="remove" size={16} color={Colors.textPrimary} />
      </Pressable>
      <AppText variant="h4" style={styles.value}>
        {String(value).padStart(2, '0')}
      </AppText>
      <Pressable
        onPress={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        style={[styles.button, value >= max && styles.buttonDisabled]}>
        <Ionicons name="add" size={16} color={Colors.textPrimary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  value: {
    minWidth: 24,
    textAlign: 'center',
  },
});
