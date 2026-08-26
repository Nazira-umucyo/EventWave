import { useEffect } from 'react';
import { router } from 'expo-router';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { Colors, Spacing } from '@/constants/theme';
import { Images } from '@/constants/images';
import { authStore } from '@/state/auth-store';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const { hasCompletedOnboarding, isSignedIn } = authStore.get();
      if (!hasCompletedOnboarding) {
        router.replace('/onboarding');
      } else if (!isSignedIn) {
        router.replace('/(auth)/sign-in');
      } else {
        router.replace('/(tabs)');
      }
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <Image source={Images.logoMark} style={styles.logo} resizeMode="contain" />
        <AppText variant="h2" style={styles.wordmark}>
          EventWave
        </AppText>
      </View>
      <ActivityIndicator color={Colors.primary} style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
  wordmark: {
    marginTop: Spacing.md,
  },
  spinner: {
    position: 'absolute',
    bottom: Spacing.xxl,
  },
});
