import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryPill } from '@/components/CategoryPill';
import { EmptyState } from '@/components/EmptyState';
import { EventListItem } from '@/components/EventListItem';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SearchBar } from '@/components/SearchBar';
import { Colors, Spacing } from '@/constants/theme';
import { categories } from '@/data/categories';
import { events } from '@/data/events';
import { useFilterState } from '@/state/filter-store';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const filters = useFilterState();

  const results = useMemo(() => {
    return events.filter((event) => {
      const matchesQuery = event.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        filters.categories.length === 0 || filters.categories.includes(event.category);
      const matchesPrice = event.price <= filters.maxPrice;
      return matchesQuery && matchesCategory && matchesPrice;
    });
  }, [query, filters]);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScreenHeader title="Search" />

      <View style={styles.searchWrap}>
        <SearchBar value={query} onChangeText={setQuery} onFilterPress={() => router.push('/filter')} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillRow}>
        {categories.map((category) => (
          <CategoryPill
            key={category.id}
            label={category.label}
            icon={category.icon as any}
            active={filters.categories.includes(category.id)}
          />
        ))}
      </ScrollView>

      {results.length === 0 ? (
        <EmptyState icon="search-outline" title="No events found" subtitle="Try a different search term or filter." />
      ) : (
        <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          {results.map((event) => (
            <EventListItem key={event.id} event={event} onPress={() => router.push(`/event/${event.id}`)} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  searchWrap: { paddingHorizontal: Spacing.lg, marginTop: Spacing.sm },
  pillRow: { gap: Spacing.sm, paddingHorizontal: Spacing.lg, marginTop: Spacing.md },
  listContent: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg, paddingBottom: Spacing.xxl },
});
