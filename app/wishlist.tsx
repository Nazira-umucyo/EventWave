import { router } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { EventListItem } from '@/components/EventListItem';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Colors, Spacing } from '@/constants/theme';
import { events } from '@/data/events';
import { useWishlist } from '@/state/wishlist-store';

export default function WishlistScreen() {
  const wishlisted = useWishlist();
  const wishlistedEvents = events.filter((e) => wishlisted.has(e.id));

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScreenHeader title="Wish List" />

      {wishlistedEvents.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          title="Nothing on your wishlist yet"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor."
          actionLabel="Explore Events"
          onAction={() => router.push('/events')}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          {wishlistedEvents.map((event) => (
            <EventListItem key={event.id} event={event} onPress={() => router.push(`/event/${event.id}`)} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  listContent: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg, paddingBottom: Spacing.xxl },
});
