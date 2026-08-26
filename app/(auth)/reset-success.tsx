import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { Colors, Spacing } from '@/constants/theme';

export default function ResetSuccessScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={40} color={Colors.white} />
        </View>
        <AppText variant="h2" style={styles.title}>
          Password Reset!
        </AppText>
        <AppText variant="body1" color={Colors.textFaint} style={styles.subtitle}>
          Your password has been reset successfully. Please sign in with your new password.
        </AppText>
        <AppButton
          label="Back to Sign In"
          variant="dark"
          style={styles.button}
          onPress={() => router.replace('/(auth)/sign-in')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xl },
  iconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: { textAlign: 'center' },
  subtitle: { textAlign: 'center', marginTop: Spacing.sm },
  button: { marginTop: Spacing.xxl, paddingHorizontal: Spacing.xl },
});
