import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/theme';

type RatingStarsProps = {
  rating: number;
  max?: number;
  size?: number;
  onChange?: (value: number) => void;
};

export function RatingStars({ rating, max = 5, size = 14, onChange }: RatingStarsProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: max }).map((_, index) => {
        const filled = index < Math.round(rating);
        return (
          <Ionicons
            key={index}
            name={filled ? 'star' : 'star-outline'}
            size={size}
            color={Colors.warning}
            style={styles.star}
            onPress={onChange ? () => onChange(index + 1) : undefined}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  star: {
    marginRight: 2,
  },
});
