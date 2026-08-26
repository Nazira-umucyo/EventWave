import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { AppTextInput } from '@/components/AppTextInput';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Colors, Spacing } from '@/constants/theme';

export default function NewPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const canSubmit = useMemo(
    () => password.length >= 6 && password === confirmPassword,
    [password, confirmPassword]
  );
  const showMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="New Password" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.content}>
          <AppText variant="body1" color={Colors.textFaint} style={styles.subtitle}>
            Your new password must be different from previously used passwords.
          </AppText>

          <View style={styles.form}>
            <AppTextInput
              icon="lock-closed-outline"
              placeholder="New password"
              value={password}
              onChangeText={setPassword}
              secureToggle
              secureTextEntry
            />
            <AppTextInput
              icon="lock-closed-outline"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureToggle
              secureTextEntry
            />
            {showMismatch && (
              <AppText variant="body4" color={Colors.error}>
                Passwords do not match
              </AppText>
            )}
          </View>

          <AppButton
            label="Reset Password"
            variant="dark"
            disabled={!canSubmit}
            style={styles.button}
            onPress={() => router.replace('/(auth)/reset-success')}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  content: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg },
  subtitle: { marginBottom: Spacing.xl },
  form: { gap: Spacing.md },
  button: { marginTop: Spacing.xl },
});
