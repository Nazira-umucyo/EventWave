import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryPill } from '@/components/CategoryPill';
import { EventHeroCard } from '@/components/EventHeroCard';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import { SearchBar } from '@/components/SearchBar';
import { Colors, Spacing } from '@/constants/theme';
import { categories } from '@/data/categories';
import { events } from '@/data/events';

// Deterministic pseudo-positions for events without explicit coordinates,
// so every event still shows up somewhere on the placeholder map.
const FALLBACK_POSITIONS = [
  { x: 0.25, y: 0.3 }, { x: 0.55, y: 0.22 }, { x: 0.72, y: 0.42 },
  { x: 0.4, y: 0.55 }, { x: 0.2, y: 0.68 }, { x: 0.6, y: 0.72 },
  { x: 0.8, y: 0.6 }, { x: 0.35, y: 0.8 }, { x: 0.65, y: 0.85 },
];

export default function MapScreen() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeEventId, setActiveEventId] = useState<string | null>(events[0]?.id ?? null);

  const filteredEvents = useMemo(
    () => events.filter((e) => !activeCategory || e.category === activeCategory),
    [activeCategory]
  );

  const pins = filteredEvents.map((event, index) => ({
    id: event.id,
    x: FALLBACK_POSITIONS[index % FALLBACK_POSITIONS.length].x,
    y: FALLBACK_POSITIONS[index % FALLBACK_POSITIONS.length].y,
    active: event.id === activeEventId,
  }));

  const activeEvent = filteredEvents.find((e) => e.id === activeEventId) ?? filteredEvents[0];

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <MapPlaceholder pins={pins} onPinPress={setActiveEventId}>
        <View style={styles.topOverlay}>
          <SearchBar value={query} onChangeText={setQuery} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillRow}>
            {categories.map((category) => (
              <CategoryPill
                key={category.id}
                label={category.label}
                icon={category.icon as any}
                active={activeCategory === category.id}
                onPress={() =>
                  setActiveCategory((prev) => (prev === category.id ? null : category.id))
                }
              />
            ))}
          </ScrollView>
        </View>

        {activeEvent && (
          <View style={styles.bottomOverlay}>
            <EventHeroCard
              event={activeEvent}
              width={260}
              height={180}
              onPress={() => router.push(`/event/${activeEvent.id}`)}
            />
          </View>
        )}
      </MapPlaceholder>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  topOverlay: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    gap: Spacing.md,
  },
  pillRow: { gap: Spacing.sm },
  bottomOverlay: {
    position: 'absolute',
    bottom: Spacing.lg,
    left: Spacing.lg,
  },
});
