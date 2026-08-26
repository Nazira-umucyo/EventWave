import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { CategoryPill } from '@/components/CategoryPill';
import { PriceSlider } from '@/components/PriceSlider';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { categories } from '@/data/categories';
import { filterStore, useFilterState } from '@/state/filter-store';

const DATE_OPTIONS: { value: 'today' | 'tomorrow' | 'this-week'; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' },
  { value: 'this-week', label: 'This week' },
];

export default function FilterScreen() {
  const filters = useFilterState();

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <AppText variant="h4">Filter</AppText>
        <Pressable hitSlop={12} onPress={() => router.back()}>
          <Ionicons name="close" size={22} color={Colors.textPrimary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.pillRow}>
          {categories.map((category) => (
            <CategoryPill
              key={category.id}
              label={category.label}
              icon={category.icon as any}
              active={filters.categories.includes(category.id)}
              onPress={() => filterStore.toggleCategory(category.id)}
            />
          ))}
        </View>

        <AppText variant="h5" style={styles.sectionTitle}>
          Time and Date
        </AppText>
        <View style={styles.dateRow}>
          {DATE_OPTIONS.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => filterStore.setDateOption(option.value)}
              style={[styles.dateChip, filters.dateOption === option.value && styles.dateChipActive]}>
              <AppText
                variant="body3"
                color={filters.dateOption === option.value ? Colors.white : Colors.textPrimary}>
                {option.label}
              </AppText>
            </Pressable>
          ))}
        </View>
        <Pressable style={styles.calendarRow}>
          <Ionicons name="calendar-outline" size={16} color={Colors.textFaint} />
          <AppText variant="body2" color={Colors.textFaint}>
            Choose from calendar
          </AppText>
        </Pressable>

        <AppText variant="h5" style={styles.sectionTitle}>
          Location
        </AppText>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color={Colors.primary} />
          <AppText variant="body2" style={{ flex: 1 }}>
            {filters.location}
          </AppText>
          <Ionicons name="chevron-forward" size={16} color={Colors.textFaint} />
        </View>

        <View style={styles.priceHeaderRow}>
          <AppText variant="h5">Select price range</AppText>
          <AppText variant="body3" color={Colors.primary}>
            $20-${filters.maxPrice}
          </AppText>
        </View>
        <PriceSlider min={20} max={200} value={filters.maxPrice} onChange={filterStore.setMaxPrice} />
      </ScrollView>

      <View style={styles.footer}>
        <AppButton label="Reset" variant="light" fullWidth={false} style={styles.resetButton} onPress={filterStore.reset} />
        <AppButton label="Apply" variant="dark" style={styles.applyButton} onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.sm },
  sectionTitle: { marginTop: Spacing.xl, marginBottom: Spacing.md },
  dateRow: { flexDirection: 'row', gap: Spacing.sm },
  dateChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderRadius: Radius.pill,
    backgroundColor: Colors.grey,
  },
  dateChipActive: { backgroundColor: Colors.primary },
  calendarRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: Spacing.md },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.grey,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  priceHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Spacing.xl },
  footer: { flexDirection: 'row', gap: Spacing.md, paddingHorizontal: Spacing.lg, paddingTop: Spacing.md },
  resetButton: { paddingHorizontal: Spacing.xl },
  applyButton: { flex: 1 },
});
