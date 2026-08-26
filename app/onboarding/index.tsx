import { useRef, useState } from 'react';
import { router } from 'expo-router';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { Images } from '@/constants/images';
import { authStore } from '@/state/auth-store';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    image: Images.onboarding1,
    title: 'Explore Upcoming and Nearby Events',
    subtitle: 'In publishing and graphic design, Lorem is a placeholder text commonly used.',
  },
  {
    image: Images.onboarding2,
    title: 'Create and Find Events Easily in One Place',
    subtitle: 'In this app you can create any kind of events and you can join all events.',
  },
  {
    image: Images.onboarding3,
    title: 'Watching Free Concerts with Friends',
    subtitle: 'Find and booking concert tickets near you, invite your friends to watch together.',
  },
];

export default function OnboardingScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    if (newIndex !== index) setIndex(newIndex);
  };

  const goToNext = () => {
    if (index < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({ x: width * (index + 1), animated: true });
    } else {
      finish();
    }
  };

  const finish = () => {
    authStore.completeOnboarding();
    router.replace('/country-select');
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}>
        {SLIDES.map((slide, i) => (
          <View key={i} style={[styles.slide, { width }]}>
            <View style={styles.illustrationWrap}>
              <Image source={slide.image} style={styles.illustration} resizeMode="cover" />
            </View>
            <View style={styles.copyCard}>
              <AppText variant="h2" style={styles.title}>
                {slide.title}
              </AppText>
              <AppText variant="body1" color={Colors.textFaint} style={styles.subtitle}>
                {slide.subtitle}
              </AppText>

              <View style={styles.footerRow}>
                <Pressable onPress={finish} hitSlop={10}>
                  <AppText variant="button2" color={Colors.textFaint}>
                    Skip
                  </AppText>
                </Pressable>

                <View style={styles.dotsRow}>
                  {SLIDES.map((_, dotIndex) => (
                    <View key={dotIndex} style={[styles.dot, dotIndex === index && styles.dotActive]} />
                  ))}
                </View>

                <Pressable onPress={goToNext} hitSlop={10}>
                  <AppText variant="button2" color={Colors.primary}>
                    {i === SLIDES.length - 1 ? 'Get Started' : 'Next'}
                  </AppText>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  slide: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  illustrationWrap: {
    flex: 1,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    marginTop: Spacing.lg,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  copyCard: {
    paddingVertical: Spacing.xl,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.xl,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.border,
  },
  dotActive: {
    backgroundColor: Colors.primary,
    width: 18,
  },
});
