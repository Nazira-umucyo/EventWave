import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { Checkbox } from '@/components/Checkbox';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { getEventById } from '@/data/events';
import { checkoutStore } from '@/state/checkout-store';

const RULES = [
  'Please arrive at least 30 minutes before the event starts to allow time for check-in.',
  'Bring a valid ID that matches the name on your ticket.',
  'Tickets are non-transferable and non-refundable once purchased.',
  'Outside food and drinks are not permitted at the venue.',
];

export default function EventGuidelinesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = getEventById(id);
  const [confirmed, setConfirmed] = useState(false);

  const handleContinue = () => {
    checkoutStore.confirmGuidelines();
    router.push(`/booking/${id}/payment`);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScreenHeader title="" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.banner}>
          <Ionicons name="document-text" size={40} color={Colors.white} />
          <AppText variant="h3" color={Colors.white} style={styles.bannerTitle}>
            EVENT GUIDELINES
          </AppText>
        </View>

        <AppText variant="h2" style={styles.title}>
          Before you continue
        </AppText>

        <AppText variant="h5" style={styles.declarationTitle}>
          Please review and accept
        </AppText>

        {RULES.map((rule, index) => (
          <View key={index} style={styles.ruleRow}>
            <View style={styles.bullet} />
            <AppText variant="body1" color={Colors.textMuted} style={styles.ruleText}>
              {rule}
            </AppText>
          </View>
        ))}

        {event ? (
          <AppText variant="body2" color={Colors.textFaint} style={styles.eventNote}>
            For: {event.title}
          </AppText>
        ) : null}

        <View style={styles.checkboxWrap}>
          <Checkbox
            checked={confirmed}
            onToggle={() => setConfirmed((prev) => !prev)}
            label="I have read and agree to these guidelines"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton label="Continue" variant="dark" onPress={handleContinue} disabled={!confirmed} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxl },
  banner: {
    height: 140,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  bannerTitle: { letterSpacing: 1 },
  title: { marginTop: Spacing.lg },
  declarationTitle: { marginTop: Spacing.lg, marginBottom: Spacing.sm },
  ruleRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.primary, marginTop: 8 },
  ruleText: { flex: 1 },
  eventNote: { marginTop: Spacing.md },
  checkboxWrap: { marginTop: Spacing.xl },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
});