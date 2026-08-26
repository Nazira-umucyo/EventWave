import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/components/AppText';
import { CalendarGrid } from '@/components/CalendarGrid';
import { EventListItem } from '@/components/EventListItem';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { events } from '@/data/events';
import { formatDayNumber, formatMonthShort, formatWeekday } from '@/utils/format';

type ViewMode = 'list' | 'grid';

const REFERENCE_YEAR = 2022;
const REFERENCE_MONTH = 9; // October (0-indexed)

export default function CalendarScreen() {
  const [mode, setMode] = useState<ViewMode>('list');
  const [selectedDay, setSelectedDay] = useState<number | null>(10);

  const markedDays = useMemo(
    () =>
      events
        .map((e) => new Date(e.startDate + 'T00:00:00'))
        .filter((d) => d.getFullYear() === REFERENCE_YEAR && d.getMonth() === REFERENCE_MONTH)
        .map((d) => d.getDate()),
    []
  );

  const groupedByDate = useMemo(() => {
    const groups = new Map<string, typeof events>();
    [...events]
      .sort((a, b) => a.startDate.localeCompare(b.startDate))
      .forEach((event) => {
        const key = event.startDate;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key)!.push(event);
      });
    return Array.from(groups.entries());
  }, []);

  const eventsForSelectedDay = useMemo(
    () =>
      selectedDay
        ? events.filter((e) => new Date(e.startDate + 'T00:00:00').getDate() === selectedDay)
        : [],
    [selectedDay]
  );

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <View style={{ width: 36 }} />
        <Pressable style={styles.titleRow} onPress={() => setMode((m) => (m === 'list' ? 'grid' : 'list'))}>
          <AppText variant="h4">Calendar</AppText>
          <Ionicons name="chevron-down" size={16} color={Colors.textPrimary} />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <Ionicons name="ellipsis-vertical" size={20} color={Colors.textPrimary} />
        </Pressable>
      </View>

      {mode === 'grid' ? (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.monthCard}>
            <View style={styles.monthHeaderRow}>
              <AppText variant="h5">October 2022</AppText>
              <View style={styles.monthNav}>
                <Ionicons name="chevron-back" size={16} color={Colors.textFaint} />
                <Ionicons name="chevron-forward" size={16} color={Colors.textFaint} />
              </View>
            </View>
            <CalendarGrid
              year={REFERENCE_YEAR}
              month={REFERENCE_MONTH}
              selectedDay={selectedDay}
              onSelectDay={setSelectedDay}
              markedDays={markedDays}
            />
          </View>

          {eventsForSelectedDay.length > 0 ? (
            <View style={styles.dayEventsSection}>
              {eventsForSelectedDay.map((event) => (
                <EventListItem key={event.id} event={event} onPress={() => router.push(`/event/${event.id}`)} />
              ))}
            </View>
          ) : (
            <AppText variant="body2" color={Colors.textFaint} style={styles.emptyDayText}>
              No events on this day.
            </AppText>
          )}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {groupedByDate.map(([date, dateEvents]) => (
            <View key={date} style={styles.dateGroup}>
              <View style={styles.dateBadge}>
                <AppText variant="caption4" color={Colors.primary}>
                  {formatMonthShort(date).toUpperCase()}
                </AppText>
                <AppText variant="h5" color={Colors.primary}>
                  {formatDayNumber(date)}
                </AppText>
              </View>
              <View style={styles.dateGroupBody}>
                <AppText variant="body3" color={Colors.textFaint} style={styles.weekdayLabel}>
                  {formatWeekday(date).toUpperCase()}, {formatDayNumber(date)}TH{' '}
                  {formatMonthShort(date).toUpperCase()}, {date.slice(0, 4)}
                </AppText>
                {dateEvents.map((event) => (
                  <EventListItem key={event.id} event={event} onPress={() => router.push(`/event/${event.id}`)} />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  iconButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxl },
  monthCard: {
    backgroundColor: Colors.grey,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  monthHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  monthNav: { flexDirection: 'row', gap: Spacing.md },
  dayEventsSection: { marginTop: Spacing.xl },
  emptyDayText: { marginTop: Spacing.xl, textAlign: 'center' },
  dateGroup: { flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.lg },
  dateBadge: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    backgroundColor: '#FDEEE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateGroupBody: { flex: 1 },
  weekdayLabel: { marginBottom: Spacing.xs },
});
