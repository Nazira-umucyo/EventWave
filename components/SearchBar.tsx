import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Radius, Type } from '@/constants/theme';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
  variant?: 'light' | 'onOrange';
};

export function SearchBar({
  value,
  onChangeText,
  onFilterPress,
  placeholder = 'Find amazing events',
  variant = 'light',
}: SearchBarProps) {
  const onOrange = variant === 'onOrange';

  return (
    <View style={styles.row}>
      <View style={[styles.inputWrap, onOrange && styles.inputWrapOnOrange]}>
        <Ionicons name="search" size={18} color={onOrange ? Colors.white : Colors.textFaint} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={onOrange ? 'rgba(255,255,255,0.75)' : Colors.placeholder}
          style={[styles.input, onOrange && { color: Colors.white }]}
        />
      </View>
      {onFilterPress && (
        <Pressable
          onPress={onFilterPress}
          style={[styles.filterButton, onOrange && styles.filterButtonOnOrange]}>
          <Ionicons name="options-outline" size={18} color={onOrange ? Colors.white : Colors.textPrimary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.grey,
    borderRadius: Radius.md,
    height: 48,
    paddingHorizontal: 14,
  },
  inputWrapOnOrange: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  input: {
    flex: 1,
    fontSize: Type.body1.fontSize,
    color: Colors.textPrimary,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonOnOrange: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
});
