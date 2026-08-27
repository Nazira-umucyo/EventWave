import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppButton } from "@/components/AppButton";
import { AppText } from "@/components/AppText";
import { Colors, Radius, Spacing } from "@/constants/theme";
import { categories } from "@/data/categories";
import { authStore } from "@/state/auth-store";

const MAX_SELECTION = 3;

export default function SelectInterestScreen() {
  const [selected, setSelected] = useState<string[]>(["design", "sports"]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= MAX_SELECTION) return prev;
      return [...prev, id];
    });
  };

  const handleNext = () => {
    authStore.completeInterests();
    router.replace("/(auth)/select-location");
  };

  return (
    <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <AppText variant="h2" style={styles.title}>
          Select Your 3 Interests
        </AppText>

        <AppText
          variant="body2"
          color={Colors.textMuted}
          style={styles.subtitle}
        >
          Choose up to 3 interests to personalize your event experience
        </AppText>
      </View>

      <View style={styles.grid}>
        {categories.map((category) => {
          const active = selected.includes(category.id);
          return (
            <Pressable
              key={category.id}
              onPress={() => toggle(category.id)}
              style={[styles.tile, active && styles.tileActive]}
            >
              <View style={[styles.tileIcon, active && styles.tileIconActive]}>
                <Ionicons
                  name={category.icon as any}
                  size={26}
                  color={category.color}
                />
              </View>
              <AppText variant="h5">{category.label}</AppText>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.footer}>
        <AppButton
          label="Next"
          variant="dark"
          onPress={handleNext}
          disabled={selected.length === 0}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.lg,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginTop: Spacing.xl,
    justifyContent: "space-between",
  },
  tile: {
    width: "47%",
    aspectRatio: 1.3,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  tileActive: {
    borderColor: Colors.primary,
  },
  tileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  tileIconActive: {
    backgroundColor: "#FDEEE4",
  },
  footer: { paddingVertical: Spacing.xl },

  header: {
    marginTop: Spacing.lg,
    alignItems: "center",
  },

  title: {
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
});
