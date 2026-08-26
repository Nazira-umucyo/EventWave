import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from './AppText';
import { AvatarStack } from './AvatarStack';
import { Colors, Radius, Spacing } from '@/constants/theme';
import type { EventItem } from '@/data/types';
import { formatDateRange } from '@/utils/format';
import { useWishlist, wishlistStore } from '@/state/wishlist-store';

type EventHeroCardProps = {
  event: EventItem;
  onPress?: () => void;
  width?: number;
  height?: number;
};

export function EventHeroCard({ event, onPress, width = 260, height = 320 }: EventHeroCardProps) {
  useWishlist(); // subscribe so the heart icon re-renders on toggle
  const wishlisted = wishlistStore.isWishlisted(event.id);

  return (
    <Pressable onPress={onPress} style={[styles.container, { width }]}>
      <View style={[styles.imageWrap, { height }]}>
        <Image source={event.image} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
        <View style={styles.scrim} />
        <Pressable
          hitSlop={10}
          onPress={() => wishlistStore.toggle(event.id)}
          style={styles.heartButton}>
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={18}
            color={wishlisted ? Colors.primary : Colors.white}
          />
        </Pressable>
      </View>

      <AppText variant="h5" numberOfLines={1} style={styles.title}>
        {event.title}
      </AppText>
      <View style={styles.metaRow}>
        <Ionicons name="calendar-outline" size={12} color={Colors.textFaint} />
        <AppText variant="body4" color={Colors.textFaint}>
          {formatDateRange(event.startDate, event.endDate)}
        </AppText>
      </View>
      <View style={styles.metaRow}>
        <Ionicons name="location-outline" size={12} color={Colors.textFaint} />
        <AppText variant="body4" color={Colors.textFaint} numberOfLines={1}>
          {event.location}
        </AppText>
      </View>

      <View style={styles.footerRow}>
        <AvatarStack avatars={event.membersJoinedAvatars} />
        <AppText variant="button2" color={Colors.primary}>
          Members joined
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: Spacing.md,
  },
  imageWrap: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(23,25,36,0.15)',
  },
  heartButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(23,25,36,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: Spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.sm,
  },
});
