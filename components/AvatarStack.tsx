import { Image, StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { Colors } from '@/constants/theme';

type AvatarStackProps = {
  avatars: number[];
  extraCount?: number;
  size?: number;
};

export function AvatarStack({ avatars, extraCount, size = 24 }: AvatarStackProps) {
  return (
    <View style={styles.row}>
      {avatars.slice(0, 3).map((avatar, index) => (
        <Image
          key={index}
          source={avatar}
          style={[
            styles.avatar,
            { width: size, height: size, borderRadius: size / 2, marginLeft: index === 0 ? 0 : -8 },
          ]}
        />
      ))}
      {!!extraCount && (
        <View style={[styles.extra, { width: size, height: size, borderRadius: size / 2, marginLeft: -8 }]}>
          <AppText variant="caption6" color={Colors.white}>
            {extraCount > 999 ? `${(extraCount / 1000).toFixed(1)}k+` : `+${extraCount}`}
          </AppText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  extra: {
    backgroundColor: Colors.softDarkish,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
});
