import { useState } from 'react';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/components/AppText';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { authStore } from '@/state/auth-store';

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);

  const rows: { icon: keyof typeof Ionicons.glyphMap; label: string; value: boolean; onChange: (v: boolean) => void }[] = [
    { icon: 'notifications-outline', label: 'Push Notifications', value: pushNotifications, onChange: setPushNotifications },
    { icon: 'mail-outline', label: 'Email Notifications', value: emailNotifications, onChange: setEmailNotifications },
    { icon: 'location-outline', label: 'Location Services', value: locationServices, onChange: setLocationServices },
  ];

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScreenHeader title="Settings" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AppText variant="h5" style={styles.sectionTitle}>
          Preferences
        </AppText>
        {rows.map((row) => (
          <View key={row.label} style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name={row.icon} size={18} color={Colors.textPrimary} />
              <AppText variant="body1">{row.label}</AppText>
            </View>
            <Switch value={row.value} onValueChange={row.onChange} trackColor={{ true: Colors.primary, false: Colors.border }} />
          </View>
        ))}

        <AppText variant="h5" style={styles.sectionTitle}>
          Account
        </AppText>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="log-out-outline" size={18} color={Colors.error} />
            <AppText variant="body1" color={Colors.error} onPress={() => { authStore.signOut(); router.replace('/(auth)/sign-in'); }}>
              Sign Out
            </AppText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxl },
  sectionTitle: { marginTop: Spacing.lg, marginBottom: Spacing.sm },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.grey,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.sm,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
});
