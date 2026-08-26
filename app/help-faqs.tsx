import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/components/AppText';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Colors, Radius, Spacing } from '@/constants/theme';

const FAQS = [
  {
    q: 'How do I buy a ticket for an event?',
    a: 'Open any event, tap "Choose Your Seat", pick a ticket tier and quantity, then complete checkout. Your ticket appears under My Tickets once purchased.',
  },
  {
    q: 'Can I get a refund on a purchased ticket?',
    a: 'Refund policies are set per-event by the organizer. Check the event details page or contact the organizer directly through their profile.',
  },
  {
    q: 'How does ticket verification work?',
    a: 'Each ticket includes a unique QR code. Show it at the venue entrance to be scanned and verified.',
  },
  {
    q: 'How do I become an event organizer?',
    a: 'Any account can create an event — tap the "+" from the home screen or menu to publish your first event.',
  },
  {
    q: 'Is my payment information secure?',
    a: 'Payment processing will be handled by a PCI-compliant provider once billing is connected on the backend.',
  },
];

export default function HelpFaqsScreen() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScreenHeader title="Help & FAQs" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {FAQS.map((item, index) => {
          const open = openIndex === index;
          return (
            <Pressable
              key={item.q}
              style={styles.card}
              onPress={() => setOpenIndex(open ? null : index)}>
              <View style={styles.cardHeader}>
                <AppText variant="h5" style={styles.question}>
                  {item.q}
                </AppText>
                <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.textFaint} />
              </View>
              {open && (
                <AppText variant="body2" color={Colors.textFaint} style={styles.answer}>
                  {item.a}
                </AppText>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxl, paddingTop: Spacing.sm },
  card: {
    backgroundColor: Colors.grey,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Spacing.sm },
  question: { flex: 1 },
  answer: { marginTop: Spacing.sm, lineHeight: 19 },
});
