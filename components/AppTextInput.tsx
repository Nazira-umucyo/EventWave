import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Radius, Type } from '@/constants/theme';

type AppTextInputProps = TextInputProps & {
  icon?: keyof typeof Ionicons.glyphMap;
  secureToggle?: boolean;
};

export function AppTextInput({ icon, secureToggle, secureTextEntry, style, ...rest }: AppTextInputProps) {
  const [hidden, setHidden] = useState(!!secureTextEntry);

  return (
    <View style={styles.wrapper}>
      {icon && <Ionicons name={icon} size={18} color={Colors.textFaint} style={styles.leftIcon} />}
      <TextInput
        placeholderTextColor={Colors.placeholder}
        style={[styles.input, icon && styles.inputWithLeftIcon, secureToggle && styles.inputWithRightIcon, style]}
        secureTextEntry={secureToggle ? hidden : secureTextEntry}
        autoCapitalize="none"
        {...rest}
      />
      {secureToggle && (
        <Pressable onPress={() => setHidden((prev) => !prev)} hitSlop={12} style={styles.rightIcon}>
          <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={18} color={Colors.textFaint} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: Colors.grey,
    paddingHorizontal: 16,
    color: Colors.textPrimary,
    fontSize: Type.body1.fontSize,
  },
  inputWithLeftIcon: {
    paddingLeft: 44,
  },
  inputWithRightIcon: {
    paddingRight: 44,
  },
  leftIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 16,
  },
});
