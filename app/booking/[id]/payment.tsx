import { useMemo, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { AppTextInput } from '@/components/AppTextInput';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { getEventById } from '@/data/events';
import type { PaymentMethodType } from '@/data/types';
import { bookingsStore } from '@/state/bookings-store';
import { checkoutStore, useCheckoutState } from '@/state/checkout-store';

const METHODS: { id: PaymentMethodType; label: string; icon: string }[] = [
  { id: 'apple-pay', label: 'Apple Pay', icon: 'apple-pay' },
  { id: 'paypal', label: 'PayPal', icon: 'paypal' },
  { id: 'google-pay', label: 'Google Pay', icon: 'google-pay' },
];

export default function PaymentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = getEventById(id);
  const checkout = useCheckoutState();
  const [voucherInput, setVoucherInput] = useState('');

  const tier = event?.ticketTiers.find((t) => t.id === checkout.tierId) ?? event?.ticketTiers[0];
  const subtotal = tier ? tier.price * checkout.seats : 0;
  const discount = checkout.voucherApplied ? subtotal * 0.25 : 0;
  const total = subtotal - discount;

  const canCheckout = useMemo(
    () => !!checkout.paymentMethod || checkout.savedCards.length > 0,
    [checkout.paymentMethod, checkout.savedCards.length]
  );

  if (!event || !tier) {
    return (
      <SafeAreaView style={styles.root}>
        <ScreenHeader title="Payment" />
      </SafeAreaView>
    );
  }

  const handleApplyVoucher = () => {
    if (voucherInput.trim()) checkoutStore.applyVoucher(voucherInput.trim());
  };

  const handleCheckout = () => {
    bookingsStore.add({
      id: `bk-${Date.now()}`,
      eventId: event.id,
      tierId: tier.id,
      seats: checkout.seats,
      totalPrice: total,
      purchasedAt: new Date().toISOString(),
      status: 'booked',
    });
    router.push(`/booking/${event.id}/ticket`);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScreenHeader title="Payment" rightIcons={[{ icon: 'receipt-outline' }]} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AppText variant="h5" color={Colors.textMuted}>
          Payment Method
        </AppText>

        <View style={styles.methodList}>
          {METHODS.map((method) => {
            const active = checkout.paymentMethod === method.id;
            return (
              <Pressable
                key={method.id}
                onPress={() => checkoutStore.setPaymentMethod(method.id)}
                style={[styles.methodRow, active && styles.methodRowActive]}>
                <FontAwesome5 name={method.icon} size={20} color={Colors.textPrimary} />
                <AppText variant="body1" style={styles.methodLabel}>
                  {method.label}
                </AppText>
                <Ionicons
                  name={active ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color={active ? Colors.primary : Colors.textFaint}
                />
              </Pressable>
            );
          })}

          {checkout.savedCards.map((card) => {
            const active = checkout.paymentMethod === 'card';
            return (
              <Pressable
                key={card.id}
                onPress={() => checkoutStore.setPaymentMethod('card')}
                style={[styles.cardRow, active && styles.methodRowActive]}>
                <View style={styles.cardBrand}>
                  <AppText variant="button2" color={Colors.white}>
                    {card.brand.toUpperCase()}
                  </AppText>
                </View>
                <View style={styles.cardInfo}>
                  <AppText variant="body1" color={Colors.white}>
                    •••• •••• •••• {card.last4}
                  </AppText>
                  <AppText variant="body4" color="rgba(255,255,255,0.8)">
                    {card.holder}   {card.expiry}
                  </AppText>
                </View>
              </Pressable>
            );
          })}

          <Pressable style={styles.addCardRow} onPress={() => router.push(`/booking/${event.id}/add-card`)}>
            <Ionicons name="add-circle-outline" size={20} color={Colors.primary} />
            <AppText variant="body3" color={Colors.primary}>
              Add New Card
            </AppText>
          </Pressable>
        </View>

        <AppText variant="h5" color={Colors.textMuted} style={styles.voucherLabel}>
          Add Voucher
        </AppText>
        {checkout.voucherApplied ? (
          <View style={styles.voucherApplied}>
            <AppText variant="body3">
              Applied Voucher Code: <AppText variant="button2">{checkout.voucherCode}</AppText>
            </AppText>
            <Pressable onPress={() => checkoutStore.removeVoucher()}>
              <Ionicons name="close-circle" size={18} color={Colors.textFaint} />
            </Pressable>
          </View>
        ) : (
          <View style={styles.voucherRow}>
            <View style={styles.voucherInputWrap}>
              <AppTextInput placeholder="VOUCHER CODE" value={voucherInput} onChangeText={setVoucherInput} />
            </View>
            <AppButton label="Apply" variant="orange" fullWidth={false} onPress={handleApplyVoucher} />
          </View>
        )}

        <View style={styles.summary}>
          <View style={styles.priceRow}>
            <AppText variant="body1" color={Colors.textMuted}>
              Subtotal
            </AppText>
            <AppText variant="body1">${subtotal.toFixed(2)}</AppText>
          </View>
          {checkout.voucherApplied && (
            <View style={styles.priceRow}>
              <AppText variant="body1" color={Colors.success}>
                Discount
              </AppText>
              <AppText variant="body1" color={Colors.success}>
                -${discount.toFixed(2)}
              </AppText>
            </View>
          )}
          <View style={styles.priceRow}>
            <AppText variant="h4">Total</AppText>
            <AppText variant="h4" color={Colors.primary}>
              ${total.toFixed(2)}
            </AppText>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton label="Checkout" variant="dark" onPress={handleCheckout} disabled={!canCheckout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.sm, paddingBottom: Spacing.xxl },
  methodList: { marginTop: Spacing.md, gap: Spacing.sm },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.grey,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  methodRowActive: { borderColor: Colors.primary },
  methodLabel: { flex: 1 },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.buttonLinear,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  cardBrand: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cardInfo: { flex: 1, gap: 2 },
  addCardRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: Spacing.sm },
  voucherLabel: { marginTop: Spacing.lg },
  voucherRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm, alignItems: 'center' },
  voucherInputWrap: { flex: 1 },
  voucherApplied: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.grey,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginTop: Spacing.sm,
  },
  summary: {
    marginTop: Spacing.xl,
    paddingTop: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
    gap: Spacing.sm,
  },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between' },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
});
