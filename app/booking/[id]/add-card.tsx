import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { AppTextInput } from '@/components/AppTextInput';
import { Checkbox } from '@/components/Checkbox';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { checkoutStore } from '@/state/checkout-store';

export default function AddCardScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveAsPrimary, setSaveAsPrimary] = useState(true);

  const canContinue = cardNumber.length >= 12 && expiry.length >= 4 && cvv.length >= 3;

  const handleContinue = () => {
    checkoutStore.addCard({
      id: `card-${Date.now()}`,
      brand: 'visa',
      holder: 'You',
      last4: cardNumber.slice(-4) || '0000',
      expiry,
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="Payment" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardPreview}>
          <AppText variant="h4" color={Colors.white}>
            VISA
          </AppText>
          <AppText variant="h5" color={Colors.white} style={styles.cardNumberPreview}>
            {cardNumber ? cardNumber.padEnd(16, '•').replace(/(.{4})/g, '$1 ').trim() : '•••• •••• •••• ••••'}
          </AppText>
          <View style={styles.cardPreviewFooter}>
            <AppText variant="body3" color="rgba(255,255,255,0.85)">
              {expiry || 'MM/YY'}
            </AppText>
          </View>
        </View>

        <View style={styles.form}>
          <AppText variant="h5" color={Colors.textMuted}>
            Card Number
          </AppText>
          <AppTextInput
            placeholder="3571 399507 50832"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="number-pad"
          />

          <View style={styles.row}>
            <View style={styles.flex}>
              <AppText variant="h5" color={Colors.textMuted}>
                Expires End
              </AppText>
              <AppTextInput placeholder="07/22" value={expiry} onChangeText={setExpiry} />
            </View>
            <View style={styles.flex}>
              <AppText variant="h5" color={Colors.textMuted}>
                CVV
              </AppText>
              <AppTextInput placeholder="483" value={cvv} onChangeText={setCvv} keyboardType="number-pad" secureTextEntry />
            </View>
          </View>

          <Checkbox checked={saveAsPrimary} onToggle={() => setSaveAsPrimary((p) => !p)} label="Save as a primary card" />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton label="Continue" variant="orange" onPress={handleContinue} disabled={!canContinue} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.sm, paddingBottom: Spacing.xxl },
  cardPreview: {
    height: 170,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  cardNumberPreview: { letterSpacing: 2 },
  cardPreviewFooter: { flexDirection: 'row', justifyContent: 'flex-end' },
  form: { marginTop: Spacing.xl, gap: Spacing.md },
  row: { flexDirection: 'row', gap: Spacing.md },
  flex: { flex: 1, gap: Spacing.sm },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
});
