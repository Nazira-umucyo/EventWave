import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { EventListItem } from '@/components/EventListItem';
import { RatingStars } from '@/components/RatingStars';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SegmentedTabs } from '@/components/SegmentedTabs';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { getUserById } from '@/data/users';
import { getEventsByOrganizer } from '@/data/events';
import { getReviewsForOrganizer } from '@/data/reviews';
import { followStore, useFollowing } from '@/state/social-store';

type Tab = 'about' | 'events' | 'reviews';

export default function OrganizerProfileScreen() {
  const { organizerId } = useLocalSearchParams<{ organizerId: string }>();
  const [tab, setTab] = useState<Tab>('about');
  useFollowing();

  const organizer = getUserById(organizerId);
  if (!organizer) return null;

  const isFollowing = followStore.isFollowing(organizer.id);
  const organizerEvents = getEventsByOrganizer(organizer.id);
  const reviews = getReviewsForOrganizer();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScreenHeader title="Organizer" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarWrap}>
          <Image source={organizer.avatar} style={styles.avatar} />
        </View>
        <AppText variant="h3" style={styles.name}>
          {organizer.name}
        </AppText>

        <View style={styles.statsRow}>
          <Stat label="Followers" value={organizer.followers} />
          <View style={styles.statDivider} />
          <Stat label="Following" value={organizer.following} />
          <View style={styles.statDivider} />
          <Stat label="Events" value={organizer.eventsCount} />
        </View>

        <View style={styles.actionsRow}>
          <AppButton
            label={isFollowing ? 'Following' : 'Follow'}
            icon={isFollowing ? undefined : 'person-add-outline'}
            variant={isFollowing ? 'light' : 'orange'}
            style={styles.actionButton}
            onPress={() => followStore.toggle(organizer.id)}
          />
          <AppButton
            label="Messages"
            icon="chatbubble-outline"
            variant="light"
            style={styles.actionButton}
            disabled
          />
        </View>

        <View style={styles.tabsWrap}>
          <SegmentedTabs
            variant="underline"
            options={[
              { value: 'about', label: 'About' },
              { value: 'events', label: 'Events' },
              { value: 'reviews', label: 'Reviews' },
            ]}
            value={tab}
            onChange={setTab}
          />
        </View>

        {tab === 'about' && (
          <AppText variant="body1" color={Colors.textFaint} style={styles.aboutText}>
            {organizer.about}
          </AppText>
        )}

        {tab === 'events' && (
          <View style={styles.list}>
            {organizerEvents.map((event) => (
              <EventListItem key={event.id} event={event} onPress={() => router.push(`/event/${event.id}`)} />
            ))}
          </View>
        )}

        {tab === 'reviews' && (
          <View style={styles.list}>
            {reviews.map((review) => {
              const author = getUserById(review.authorId);
              if (!author) return null;
              return (
                <View key={review.id} style={styles.reviewRow}>
                  <Image source={author.avatar} style={styles.reviewAvatar} />
                  <View style={styles.reviewBody}>
                    <View style={styles.reviewHeader}>
                      <AppText variant="h5">{author.name}</AppText>
                      <AppText variant="body4" color={Colors.textFaint}>
                        {review.date}
                      </AppText>
                    </View>
                    <RatingStars rating={review.rating} />
                    <AppText variant="body2" color={Colors.textFaint} style={styles.reviewComment}>
                      {review.comment}
                    </AppText>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.stat}>
      <AppText variant="h4">{value.toLocaleString()}</AppText>
      <AppText variant="body3" color={Colors.textFaint}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxl, alignItems: 'center' },
  avatarWrap: { marginTop: Spacing.sm },
  avatar: { width: 88, height: 88, borderRadius: 44 },
  name: { marginTop: Spacing.md },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.lg, gap: Spacing.xl },
  stat: { alignItems: 'center' },
  statDivider: { width: StyleSheet.hairlineWidth, height: 28, backgroundColor: Colors.border },
  actionsRow: { flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.lg, alignSelf: 'stretch' },
  actionButton: { flex: 1 },
  tabsWrap: { alignSelf: 'stretch', marginTop: Spacing.xl },
  aboutText: { alignSelf: 'stretch', marginTop: Spacing.md, lineHeight: 20 },
  list: { alignSelf: 'stretch', marginTop: Spacing.md },
  reviewRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  reviewAvatar: { width: 40, height: 40, borderRadius: 20 },
  reviewBody: { flex: 1 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  reviewComment: { marginTop: 4, lineHeight: 18 },
});
