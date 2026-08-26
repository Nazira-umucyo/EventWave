import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Colors, Radius, Spacing } from '@/constants/theme';

export default function ScanCardScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      router.push(`/booking/${id}/add-card`);
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="Scan Card" />

      <View style={styles.content}>
        <AppText variant="body1" color={Colors.textMuted} style={styles.hint}>
          Please hold the card inside the frame to start the card scanning
        </AppText>

        <View style={styles.frame}>
          <Ionicons name="card-outline" size={72} color={Colors.textFaint} />
        </View>
      </View>

      <View style={styles.footer}>
        <AppButton label={scanning ? 'Scanning...' : 'Scanning'} variant="dark" onPress={handleScan} loading={scanning} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, paddingHorizontal: Spacing.lg, alignItems: 'center' },
  hint: { textAlign: 'center', marginTop: Spacing.md },
  frame: {
    width: '100%',
    aspectRatio: 1.6,
    borderRadius: Radius.xl,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xxl,
    backgroundColor: Colors.grey,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
});
