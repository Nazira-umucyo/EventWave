import { useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { Colors, Radius, Type } from '@/constants/theme';

type OTPInputProps = {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
};

export function OTPInput({ length = 4, value, onChange }: OTPInputProps) {
  const refs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const digit = text.slice(-1).replace(/[^0-9]/g, '');
    const next = [...value];
    next[index] = digit;
    onChange(next);
    if (digit && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !value[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.row}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            refs.current[index] = ref;
          }}
          value={value[index] ?? ''}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
          keyboardType="number-pad"
          maxLength={1}
          style={[styles.box, value[index] && styles.boxFilled]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  box: {
    width: 56,
    height: 56,
    borderRadius: Radius.md,
    backgroundColor: Colors.grey,
    textAlign: 'center',
    fontSize: Type.h2.fontSize,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  boxFilled: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
});
