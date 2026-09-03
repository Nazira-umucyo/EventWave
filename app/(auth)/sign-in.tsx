import { useState } from 'react';
import { router } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { AppTextInput } from '@/components/AppTextInput';
import { SocialAuthRow } from '@/components/SocialAuthRow';
import { Colors, Spacing } from '@/constants/theme';
import { authStore } from '@/state/auth-store';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function firebaseErrorMessage(code: string) {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Incorrect email or password.';
    case 'auth/invalid-email':
      return 'Please enter a valid email.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (!email.trim()) next.email = 'Please enter your email';
    else if (!EMAIL_REGEX.test(email.trim())) next.email = 'Please enter a valid email';
    if (!password) next.password = 'Please enter your password';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSignIn = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await authStore.signIn(email, password);
      const { hasSelectedInterests, hasSelectedLocation } = authStore.get();
      if (!hasSelectedInterests) router.replace('/(auth)/select-interest');
      else if (!hasSelectedLocation) router.replace('/(auth)/select-location');
      else router.replace('/(tabs)');
    } catch (err: any) {
      setErrors((e) => ({ ...e, form: firebaseErrorMessage(err?.code ?? '') }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <AppText variant="h1" style={styles.title}>
            Sign in
          </AppText>
          <AppText variant="body1" color={Colors.textFaint} style={styles.subtitle}>
            Give credential to sign in your account
          </AppText>

          <View style={styles.form}>
            <View>
              <AppTextInput
                icon="mail-outline"
                placeholder="Type your email"
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
                }}
                keyboardType="email-address"
              />
              {errors.email && (
                <AppText variant="body3" color={Colors.error} style={styles.errorText}>
                  {errors.email}
                </AppText>
              )}
            </View>

            <View>
              <AppTextInput
                icon="lock-closed-outline"
                placeholder="Type your password"
                value={password}
                onChangeText={(t) => {
                  setPassword(t);
                  if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
                }}
                secureToggle
                secureTextEntry
              />
              {errors.password && (
                <AppText variant="body3" color={Colors.error} style={styles.errorText}>
                  {errors.password}
                </AppText>
              )}
            </View>

            {errors.form && (
              <AppText variant="body3" color={Colors.error} style={styles.errorText}>
                {errors.form}
              </AppText>
            )}
          </View>

          <View style={styles.optionsRow}>
            <View style={styles.rememberRow}>
              <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                trackColor={{ true: Colors.primary, false: Colors.border }}
              />
              <AppText variant="body2">Remember Me</AppText>
            </View>
            <Pressable onPress={() => router.push('/(auth)/forgot-password')}>
              <AppText variant="body2" color={Colors.primary}>
                Forgot Password?
              </AppText>
            </Pressable>
          </View>

          <AppButton
            label={submitting ? 'Signing in...' : 'Sign In'}
            variant="dark"
            onPress={handleSignIn}
            style={styles.submitButton}
            disabled={submitting}
          />

          <SocialAuthRow />

          <View style={styles.footerRow}>
            <AppText variant="body2" color={Colors.textFaint}>
              Don&apos;t have an account?{' '}
            </AppText>
            <Pressable onPress={() => router.push('/(auth)/sign-up')}>
              <AppText variant="body2" color={Colors.primary}>
                Sign Up
              </AppText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  title: {},
  subtitle: { marginTop: Spacing.xs },
  form: { marginTop: Spacing.xl, gap: Spacing.md },
  errorText: { marginTop: 4, marginLeft: 4 },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
  },
  rememberRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  submitButton: { marginTop: Spacing.xl },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
});