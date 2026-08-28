import { useMemo, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Stepper } from '@/components/Stepper';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { getEventById } from '@/data/events';
import type { EventTicketTier } from '@/data/types';
import { checkoutStore, useCheckoutState } from '@/state/checkout-store';

export default function BuyTicketScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = getEventById(id);
  const checkout = useCheckoutState();

  const [tierId, setTierId] = useState<EventTicketTier['id']>(event?.ticketTiers[0]?.id ?? 'economy');
  const tier = event?.ticketTiers.find((t) => t.id === tierId) ?? event?.ticketTiers[0];
  const seats = checkout.eventId === event?.id ? checkout.seats : 1;

  const totalPrice = useMemo(() => (tier ? tier.price * seats : 0), [tier, seats]);

  if (!event || !tier) {
    return (
      <SafeAreaView style={styles.root}>
        <ScreenHeader title="Ticket" />
        <View style={styles.notFound}>
          <AppText variant="body1">Event not found.</AppText>
        </View>
      </SafeAreaView>
    );
  }

  const handleTierChange = (nextTierId: EventTicketTier['id']) => {
    setTierId(nextTierId);
    checkoutStore.start(event.id, nextTierId);
  };

  const handleSeatsChange = (value: number) => {
    if (checkout.eventId !== event.id) checkoutStore.start(event.id, tierId);
    checkoutStore.setSeats(value);
  };

  const handleContinue = () => {
    checkoutStore.start(event.id, tierId);
    checkoutStore.setSeats(seats);
    router.push(`/booking/${event.id}/event-guidelines`);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScreenHeader title="Ticket" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AppText variant="h5" color={Colors.textMuted}>
          Ticket Type
        </AppText>
        <View style={styles.tierRow}>
          {event.ticketTiers.map((t) => {
            const active = t.id === tierId;
            return (
              <Pressable
                key={t.id}
                onPress={() => handleTierChange(t.id)}
                style={[styles.tierChip, active && styles.tierChipActive]}>
                <AppText variant="button1" color={active ? Colors.white : Colors.textMuted}>
                  {t.label.replace(' Ticket', '')}
                </AppText>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.divider} />

        <View style={styles.rowBetween}>
          <AppText variant="h5" color={Colors.textMuted}>
            Seat
          </AppText>
          <Stepper value={seats} onChange={handleSeatsChange} max={tier.seatsAvailable} />
        </View>

        <View style={styles.divider} />

        <AppText variant="h5" color={Colors.textMuted}>
          Ticket Price
        </AppText>
        <View style={styles.priceRow}>
          <AppText variant="body1">{tier.label}</AppText>
          <AppText variant="body1">${tier.price.toFixed(2)} USD</AppText>
        </View>
        <View style={styles.priceRow}>
          <AppText variant="body2" color={Colors.textFaint}>
            {seats} x ${tier.price.toFixed(2)} USD
          </AppText>
        </View>

        <View style={styles.divider} />

        <View style={styles.priceRow}>
          <AppText variant="h4">Total Price</AppText>
          <AppText variant="h4" color={Colors.primary}>
            ${totalPrice.toFixed(2)} USD
          </AppText>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton label="Continue" variant="dark" onPress={handleContinue} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.xxl, gap: Spacing.md },
  tierRow: { flexDirection: 'row', gap: Spacing.sm },
  tierChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    borderRadius: Radius.pill,
    backgroundColor: Colors.grey,
  },
  tierChipActive: { backgroundColor: Colors.primary },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: Colors.border },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
});
