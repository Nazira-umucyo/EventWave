import { useState } from 'react';
import { router } from 'expo-router';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { AppTextInput } from '@/components/AppTextInput';
import { SocialAuthRow } from '@/components/SocialAuthRow';
import { Colors, Spacing } from '@/constants/theme';

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    router.push({ pathname: '/(auth)/verify', params: { flow: 'sign-up' } });
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
            <AppTextInput
              icon="person-outline"
              placeholder="Type your full name"
              value={fullName}
              onChangeText={setFullName}
            />
            <AppTextInput
              icon="mail-outline"
              placeholder="Type your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <AppTextInput
              icon="lock-closed-outline"
              placeholder="Type your password"
              value={password}
              onChangeText={setPassword}
              secureToggle
              secureTextEntry
            />
            <AppTextInput
              icon="lock-closed-outline"
              placeholder="Type your confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureToggle
              secureTextEntry
            />
          </View>

          <AppButton label="Sign Up" variant="dark" onPress={handleSignUp} style={styles.submitButton} />

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
  submitButton: { marginTop: Spacing.xl },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xl },
});
