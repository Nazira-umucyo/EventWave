import { useRef, useState } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/theme';

type PriceSliderProps = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

const TRACK_WIDTH = 280;
const THUMB_SIZE = 22;

export function PriceSlider({ min, max, value, onChange }: PriceSliderProps) {
  const [trackWidth, setTrackWidth] = useState(TRACK_WIDTH);
  const valueRef = useRef(value);
  valueRef.current = value;

  const ratio = (value - min) / (max - min);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_evt, gesture) => {
        const startX = ratio * trackWidth;
        const nextX = Math.max(0, Math.min(trackWidth, startX + gesture.dx));
        const nextValue = Math.round(min + (nextX / trackWidth) * (max - min));
        onChange(nextValue);
      },
    })
  ).current;

  return (
    <View
      style={styles.track}
      onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}>
      <View style={styles.trackBg} />
      <View style={[styles.trackFill, { width: `${ratio * 100}%` }]} />
      <View
        {...panResponder.panHandlers}
        style={[styles.thumb, { left: `${ratio * 100}%`, marginLeft: -THUMB_SIZE / 2 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: THUMB_SIZE,
    justifyContent: 'center',
  },
  trackBg: {
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
  },
  trackFill: {
    position: 'absolute',
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
});
