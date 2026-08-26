import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EventForm } from '@/components/EventForm';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Colors } from '@/constants/theme';

export default function AddEventScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="Create New Event" />
      <View style={styles.flex}>
        <EventForm
          mode="add"
          onSubmit={() => {
            // No backend yet — Firebase write goes here later.
            router.back();
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
});
