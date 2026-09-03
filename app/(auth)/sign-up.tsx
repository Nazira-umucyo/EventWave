import { useState } from 'react';
import { router } from 'expo-router';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
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
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/invalid-email':
      return 'Please enter a valid email.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    form?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (!fullName.trim()) next.fullName = 'Please enter your full name';
    if (!email.trim()) next.email = 'Please enter your email';
    else if (!EMAIL_REGEX.test(email.trim())) next.email = 'Please enter a valid email';
    if (!password) next.password = 'Please enter a password';
    else if (password.length < 6) next.password = 'Password must be at least 6 characters';
    if (!confirmPassword) next.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) next.confirmPassword = 'Passwords do not match';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await authStore.signUp({ fullName, email, password });
      router.replace('/(auth)/verify');
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
          <AppText variant="h1">Sign up</AppText>
          <AppText variant="body1" color={Colors.textFaint} style={styles.subtitle}>
            Create account and enjoy all services
          </AppText>

          <View style={styles.form}>
            <View>
              <AppTextInput
                icon="person-outline"
                placeholder="Type your full name"
                value={fullName}
                onChangeText={(t) => {
                  setFullName(t);
                  if (errors.fullName) setErrors((e) => ({ ...e, fullName: undefined }));
                }}
              />
              {errors.fullName && (
                <AppText variant="body3" color={Colors.error} style={styles.errorText}>
                  {errors.fullName}
                </AppText>
              )}
            </View>

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

            <View>
              <AppTextInput
                icon="lock-closed-outline"
                placeholder="Type your confirm password"
                value={confirmPassword}
                onChangeText={(t) => {
                  setConfirmPassword(t);
                  if (errors.confirmPassword) setErrors((e) => ({ ...e, confirmPassword: undefined }));
                }}
                secureToggle
                secureTextEntry
              />
              {errors.confirmPassword && (
                <AppText variant="body3" color={Colors.error} style={styles.errorText}>
                  {errors.confirmPassword}
                </AppText>
              )}
            </View>

            {errors.form && (
              <AppText variant="body3" color={Colors.error} style={styles.errorText}>
                {errors.form}
              </AppText>
            )}
          </View>

          <AppButton
            label={submitting ? 'Signing up...' : 'Sign Up'}
            variant="dark"
            onPress={handleSignUp}
            style={styles.submitButton}
            disabled={submitting}
          />

          <SocialAuthRow />

          <View style={styles.footerRow}>
            <AppText variant="body2" color={Colors.textFaint}>
              Already have an account?{' '}
            </AppText>
            <Pressable onPress={() => router.replace('/(auth)/sign-in')}>
              <AppText variant="body2" color={Colors.primary}>
                Sign In
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
  subtitle: { marginTop: Spacing.xs },
  form: { marginTop: Spacing.xl, gap: Spacing.md },
  errorText: { marginTop: 4, marginLeft: 4 },
  submitButton: { marginTop: Spacing.xl },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xl },
});