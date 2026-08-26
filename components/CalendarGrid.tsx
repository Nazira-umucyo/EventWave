import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { Colors, Radius, Spacing } from '@/constants/theme';

type CalendarGridProps = {
  year: number;
  month: number; // 0-indexed
  selectedDay: number | null;
  onSelectDay: (day: number) => void;
  markedDays?: number[];
};

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export function CalendarGrid({ year, month, selectedDay, onSelectDay, markedDays = [] }: CalendarGridProps) {
  const firstDay = new Date(year, month, 1);
  // Monday-first index (0 = Monday ... 6 = Sunday)
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array.from({ length: startOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <View>
      <View style={styles.weekdayRow}>
        {WEEKDAYS.map((day) => (
          <AppText key={day} variant="caption4" color={Colors.textFaint} style={styles.cell}>
            {day}
          </AppText>
        ))}
      </View>
      <View style={styles.grid}>
        {cells.map((day, index) => {
          const isSelected = day === selectedDay;
          const isMarked = day !== null && markedDays.includes(day);
          return (
            <Pressable
              key={index}
              disabled={day === null}
              onPress={() => day && onSelectDay(day)}
              style={styles.cell}>
              {day !== null && (
                <View style={[styles.dayCircle, isSelected && styles.dayCircleActive]}>
                  <AppText variant="body3" color={isSelected ? Colors.white : Colors.textPrimary}>
                    {day}
                  </AppText>
                  {isMarked && !isSelected && <View style={styles.dot} />}
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleActive: {
    backgroundColor: Colors.primary,
  },
  dot: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
});
