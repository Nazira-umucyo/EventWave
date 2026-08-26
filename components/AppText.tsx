import { Text, TextProps, StyleSheet } from 'react-native';

import { Colors, Type } from '@/constants/theme';

type Variant = keyof typeof Type;

type AppTextProps = TextProps & {
  variant?: Variant;
  color?: string;
};

export function AppText({ variant = 'body1', color = Colors.textPrimary, style, ...rest }: AppTextProps) {
  return <Text style={[styles.base, Type[variant], { color }, style]} {...rest} />;
}

const styles = StyleSheet.create({
  base: {
    fontFamily: undefined, // falls back to system font; see README "Fonts" section for Inter setup
  },
});
