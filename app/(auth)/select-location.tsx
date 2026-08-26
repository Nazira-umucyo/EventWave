import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from '@/components/AppButton';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { authStore } from '@/state/auth-store';

const PINS = [
  { id: 'p1', x: 0.3, y: 0.35, label: 'Height Street' },
  { id: 'p2', x: 0.62, y: 0.5, label: 'Pork Store Cafe' },
  { id: 'p3', x: 0.45, y: 0.68, active: true, label: 'Current location' },
];

export default function SelectLocationScreen() {
  const [query, setQuery] = useState('');

  const handleAdd = () => {
    authStore.completeLocation();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <MapPlaceholder pins={PINS}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={Colors.textFaint} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search new address..."
            placeholderTextColor={Colors.placeholder}
            style={styles.searchInput}
          />
          <Ionicons name="navigate-outline" size={18} color={Colors.primary} />
        </View>

        <View style={styles.footer}>
          <AppButton label="Add" variant="dark" onPress={handleAdd} />
        </View>
      </MapPlaceholder>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    paddingHorizontal: 14,
    height: 48,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    color: Colors.textPrimary,
  },
  footer: {
    position: 'absolute',
    left: Spacing.lg,
    right: Spacing.lg,
    bottom: Spacing.xl,
  },
});
