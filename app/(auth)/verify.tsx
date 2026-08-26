import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { OTPInput } from '@/components/OTPInput';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Colors, Spacing } from '@/constants/theme';
import { authStore } from '@/state/auth-store';

const RESEND_SECONDS = 53;

export default function VerifyScreen() {
  const { flow } = useLocalSearchParams<{ flow?: string }>();
  const [code, setCode] = useState<string[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const isComplete = code.filter(Boolean).length === 4;

  const handleContinue = () => {
    if (flow === 'reset') {
      router.push('/(auth)/new-password');
    } else {
      authStore.signUp();
      router.replace('/(auth)/select-interest');
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="Verification" />

      <View style={styles.content}>
        <AppText variant="body1" color={Colors.textFaint} style={styles.subtitle}>
          We&apos;ve send you the verification code on{'\n'}
          <AppText variant="h5">+1 6358 9248 5789</AppText>
        </AppText>

        <OTPInput value={code} onChange={setCode} />

        <AppButton
          label="Continue"
          variant="dark"
          onPress={handleContinue}
          disabled={!isComplete}
          style={styles.continueButton}
        />

        <View style={styles.resendRow}>
          <AppText variant="body2" color={Colors.textFaint}>
            Re-send code in{' '}
          </AppText>
          {secondsLeft > 0 ? (
            <AppText variant="body2" color={Colors.primary}>
              0:{String(secondsLeft).padStart(2, '0')}
            </AppText>
          ) : (
            <Pressable onPress={() => setSecondsLeft(RESEND_SECONDS)}>
              <AppText variant="body2" color={Colors.primary}>
                Resend
              </AppText>
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg },
  subtitle: { marginBottom: Spacing.xl },
  continueButton: { marginTop: Spacing.xl },
  resendRow: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.lg },
});
