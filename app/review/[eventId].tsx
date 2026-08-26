import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, View, Image } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { RatingStars } from '@/components/RatingStars';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { getEventById } from '@/data/events';

export default function EventReviewModal() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const event = getEventById(eventId);
  const [rating, setRating] = useState(4);

  const handleRate = () => {
    // No backend yet - review is just discarded locally. Wire this up to
    // Firestore (data/reviews collection) once the backend is connected.
    router.back();
  };

  if (!event) return null;

  return (
    <Pressable style={styles.overlay} onPress={() => router.back()}>
      <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
        <Image source={event.image} style={styles.image} resizeMode="cover" />
        <View style={styles.body}>
          <AppText variant="h5" numberOfLines={1}>
            {event.title}
          </AppText>
          <AppText variant="body2" color={Colors.textFaint} style={styles.subtitle}>
            Your feedback will help us to make improvements
          </AppText>

          <View style={styles.starsRow}>
            <RatingStars rating={rating} size={28} onChange={setRating} />
          </View>

          <View style={styles.actionsRow}>
            <AppButton label="No Thanks" variant="light" fullWidth={false} style={styles.actionButton} onPress={() => router.back()} />
            <AppButton label="Rate" variant="orange" fullWidth={false} style={styles.actionButton} onPress={handleRate} />
          </View>
        </View>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    borderRadius: Radius.xl,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  image: { width: '100%', height: 120, backgroundColor: Colors.grey },
  body: { padding: Spacing.lg, alignItems: 'center' },
  subtitle: { textAlign: 'center', marginTop: 4 },
  starsRow: { marginTop: Spacing.lg },
  actionsRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.xl, width: '100%' },
  actionButton: { flex: 1 },
});
