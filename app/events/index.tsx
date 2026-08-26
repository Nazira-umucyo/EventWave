import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { EventListItem } from '@/components/EventListItem';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SegmentedTabs } from '@/components/SegmentedTabs';
import { Colors, Spacing } from '@/constants/theme';
import { events } from '@/data/events';
import { isUpcoming } from '@/utils/format';

type Tab = 'upcoming' | 'past';

export default function AllEventsScreen() {
  const [tab, setTab] = useState<Tab>('upcoming');

  const filtered = useMemo(
    () => events.filter((e) => (tab === 'upcoming' ? isUpcoming(e.startDate) : !isUpcoming(e.startDate))),
    [tab]
  );

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScreenHeader title="Events" />

      <View style={styles.tabsWrap}>
        <SegmentedTabs
          options={[
            { value: 'upcoming', label: 'Upcoming' },
            { value: 'past', label: 'Past Events' },
          ]}
          value={tab}
          onChange={setTab}
        />
      </View>

      {filtered.length === 0 ? (
        <EmptyState
          icon="calendar-outline"
          title="No Upcoming Event"
          subtitle="Nec interdum magna leo, lectus risus commodo suspendisse. Placerat"
          actionLabel="Explore Events"
          onAction={() => setTab('past')}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          {filtered.map((event) => (
            <EventListItem key={event.id} event={event} onPress={() => router.push(`/event/${event.id}`)} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  tabsWrap: { paddingHorizontal: Spacing.lg, marginTop: Spacing.sm },
  listContent: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg, paddingBottom: Spacing.xxl },
});
