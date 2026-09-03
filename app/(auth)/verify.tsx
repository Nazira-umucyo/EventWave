import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Colors, Spacing } from '@/constants/theme';
import { authStore, useAuthState } from '@/state/auth-store';

export default function VerifyScreen() {
  const { flow } = useLocalSearchParams<{ flow?: string }>();
  const user = useAuthState();
  const [checking, setChecking] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState('');

  const handleCheckVerified = async () => {
    setChecking(true);
    setError('');
    try {
      const verified = await authStore.checkEmailVerified();
      if (verified) {
        if (flow === 'reset') {
          router.push('/(auth)/new-password');
        } else {
          router.replace('/(auth)/select-interest');
        }
      } else {
        setError('Not verified yet. Please tap the link in the email we sent you.');
      }
    } catch {
      setError('Something went wrong checking your verification status.');
    } finally {
      setChecking(false);
    }
  };

  const handleResend = async () => {
    try {
      await authStore.resendVerificationEmail();
      setResent(true);
    } catch {
      setError('Could not resend the email. Please try again in a moment.');
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="Verification" />

      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="mail-open-outline" size={48} color={Colors.primary} />
        </View>

        <AppText variant="h4" style={styles.title}>
          Check your email
        </AppText>

        <AppText variant="body1" color={Colors.textFaint} style={styles.subtitle}>
          We&apos;ve sent a verification link to{'\n'}
          <AppText variant="h5">{user.email}</AppText>
          {'\n'}Tap the link, then come back and press Continue.
        </AppText>

        {error ? (
          <AppText variant="body3" color={Colors.error} style={styles.errorText}>
            {error}
          </AppText>
        ) : null}

        <AppButton
          label={checking ? 'Checking...' : 'Continue'}
          variant="dark"
          onPress={handleCheckVerified}
          disabled={checking}
          style={styles.continueButton}
        />

        <View style={styles.resendRow}>
          {resent ? (
            <AppText variant="body2" color={Colors.textFaint}>
              Verification email resent.
            </AppText>
          ) : (
            <>
              <AppText variant="body2" color={Colors.textFaint}>
                Didn&apos;t get it?{' '}
              </AppText>
              <Pressable onPress={handleResend}>
                <AppText variant="body2" color={Colors.primary}>
                  Resend
                </AppText>
              </Pressable>
            </>
          )}
        </View>

        {checking && <ActivityIndicator style={styles.spinner} color={Colors.primary} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl, alignItems: 'center' },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#FDEEE4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: { textAlign: 'center' },
  subtitle: { marginTop: Spacing.sm, textAlign: 'center', lineHeight: 20 },
  errorText: { marginTop: Spacing.md, textAlign: 'center' },
  continueButton: { marginTop: Spacing.xl, alignSelf: 'stretch' },
  resendRow: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.lg },
  spinner: { marginTop: Spacing.md },
});