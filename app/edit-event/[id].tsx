import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EventForm } from '@/components/EventForm';
import { ScreenHeader } from '@/components/ScreenHeader';
import { AppText } from '@/components/AppText';
import { Colors, Spacing } from '@/constants/theme';
import { getEventById } from '@/data/events';

export default function EditEventScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = getEventById(id);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="Create New Event" />
      {event ? (
        <View style={styles.flex}>
          <EventForm
            mode="edit"
            initialEvent={event}
            onSubmit={() => {
              // No backend yet — Firebase update goes here later.
              router.back();
            }}
          />
        </View>
      ) : (
        <AppText variant="body1" style={styles.notFound}>
          Event not found.
        </AppText>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  notFound: { padding: Spacing.lg },
});
