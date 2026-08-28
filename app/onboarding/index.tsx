import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppButton } from "@/components/AppButton";
import { AppText } from "@/components/AppText";
import { Colors } from "@/constants/theme";
import { authStore } from "@/state/auth-store";

const { width, height } = Dimensions.get("window");

/*
 * Temporary onboarding image.
 * You can later replace each image individually. assets/images/Welcome.png
 */
const SLIDES = [
  {
    image: require("@/assets/images/Welcome.png"),
    title: "Explore Upcoming and Nearby Events",
    subtitle:
      "Discover exciting events happening around you and never miss out on memorable experiences.",
  },
  {
    image: require("@/assets/images/Welcome2.jpg"),
    title: "Create and Find Events Easily in One Place",
    subtitle:
      "Explore events you love, discover new experiences, and connect with people around you.",
  },
  {
    image: require("@/assets/images/Welcome3.jpg"),
    title: "Enjoy Amazing Events with Friends",
    subtitle:
      "Find and book event tickets easily, then invite your friends to enjoy the experience together.",
  },
];

export default function OnboardingScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);

    if (newIndex !== index) {
      setIndex(newIndex);
    }
  };

  const goToNext = () => {
    if (index < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({
        x: width * (index + 1),
        animated: true,
      });
    } else {
      finish();
    }
  };

  const finish = () => {
    authStore.completeOnboarding();
    router.replace("/country-select");
  };

  return (
    <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        bounces={false}
      >
        {SLIDES.map((slide, i) => {
          const isLastSlide = i === SLIDES.length - 1;

          return (
            <View key={i} style={[styles.slide, { width }]}>
              {/* Top illustration section */}
              <View style={styles.imageSection}>
                <Image
                  source={slide.image}
                  style={styles.illustration}
                  resizeMode="contain"
                />
              </View>

              {/* Orange bottom section */}
              <View style={styles.contentCard}>
                <View style={styles.textContent}>
                  <AppText variant="h2" color="#FFFFFF" style={styles.title}>
                    {slide.title}
                  </AppText>

                  <AppText
                    variant="body1"
                    color="rgba(255,255,255,0.75)"
                    style={styles.subtitle}
                  >
                    {slide.subtitle}
                  </AppText>
                </View>

                {!isLastSlide ? (
                  <View style={styles.footerRow}>
                    <Pressable onPress={finish} hitSlop={12}>
                      <AppText
                        variant="button2"
                        color="#FFFFFF"
                        style={styles.footerText}
                      >
                        Skip
                      </AppText>
                    </Pressable>

                    <View style={styles.dotsRow}>
                      {SLIDES.map((_, dotIndex) => (
                        <View
                          key={dotIndex}
                          style={[
                            styles.dot,
                            dotIndex === index && styles.dotActive,
                          ]}
                        />
                      ))}
                    </View>

                    <Pressable onPress={goToNext} hitSlop={12}>
                      <AppText
                        variant="button2"
                        color="#FFFFFF"
                        style={styles.footerText}
                      >
                        Next
                      </AppText>
                    </Pressable>
                  </View>
                ) : (
                  <AppButton
                    label="GET STARTED"
                    style={styles.getStartedButton}
                    onPress={finish}
                  />
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },

  slide: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },

  /*
   * Top area containing the illustration.
   */
  imageSection: {
    height: height * 0.53,
    width: "100%",
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  illustration: {
    width: "100%",
    height: "100%",
  },

  /*
   * Orange bottom panel.
   */
  contentCard: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 24,
    justifyContent: "space-between",
  },

  textContent: {
    alignItems: "center",
  },

  title: {
    textAlign: "center",
    fontSize: 21,
    lineHeight: 30,
    fontWeight: "700",
    maxWidth: 300,
  },

  subtitle: {
    textAlign: "center",
    marginTop: 18,
    lineHeight: 22,
    fontSize: 13,
    maxWidth: 310,
  },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 20,
  },

  footerText: {
    fontSize: 14,
    fontWeight: "600",
  },

  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.35)",
  },

  dotActive: {
    backgroundColor: "#FFFFFF",
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  getStartedButton: {
    width: "100%",
    backgroundColor: "#20222C",
    borderRadius: 12,
    minHeight: 54,
    marginTop: 20,
  },
});
