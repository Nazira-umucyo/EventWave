import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from './AppText';
import { Colors, Radius } from '@/constants/theme';
import { Images } from '@/constants/images';

export type MapPin = {
  id: string;
  x: number; // 0-1, relative horizontal position
  y: number; // 0-1, relative vertical position
  label?: string;
  active?: boolean;
};

type MapPlaceholderProps = {
  pins?: MapPin[];
  onPinPress?: (id: string) => void;
  children?: React.ReactNode;
};

/**
 * There's no map SDK (e.g. react-native-maps) in package.json, and adding
 * one wasn't part of the brief, so this renders a static stylized map image
 * with absolutely-positioned pins instead of a real interactive map. Swap
 * this component's internals for react-native-maps once that dependency is
 * approved — every screen that uses it (`select-location`, `map`) reads
 * pin data the same way, so only this file needs to change.
 */
export function MapPlaceholder({ pins = [], onPinPress, children }: MapPlaceholderProps) {
  return (
    <View style={styles.container}>
      <Image source={Images.mapBackground} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
      {pins.map((pin) => (
        <Pressable
          key={pin.id}
          onPress={() => onPinPress?.(pin.id)}
          style={[styles.pin, { left: `${pin.x * 100}%`, top: `${pin.y * 100}%` }]}>
          <View style={[styles.pinBubble, pin.active && styles.pinBubbleActive]}>
            <Ionicons name="location" size={16} color={Colors.white} />
          </View>
          {pin.label && (
            <View style={styles.pinLabel}>
              <AppText variant="caption4">{pin.label}</AppText>
            </View>
          )}
        </Pressable>
      ))}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  pin: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -14 }, { translateY: -28 }],
  },
  pinBubble: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.softDarkish,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  pinBubbleActive: {
    backgroundColor: Colors.primary,
  },
  pinLabel: {
    marginTop: 4,
    backgroundColor: Colors.white,
    borderRadius: Radius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});
