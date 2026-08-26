import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText } from "@/components/AppText";
import { CategoryPill } from "@/components/CategoryPill";
import { EventHeroCard } from "@/components/EventHeroCard";
import { EventListItem } from "@/components/EventListItem";
import { SearchBar } from "@/components/SearchBar";
import { SideMenu } from "@/components/SideMenu";
import { Colors, Spacing } from "@/constants/theme";
import { categories } from "@/data/categories";
import { events, featuredEvents } from "@/data/events";
import { hasUnreadNotifications } from "@/data/notifications";
import { currentUser } from "@/data/users";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        !activeCategory || event.category === activeCategory;
      const matchesQuery = event.title
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Pressable style={styles.identity} onPress={() => setMenuOpen(true)}>
            <Image source={currentUser.avatar} style={styles.avatar} />
            <View>
              <AppText variant="body3" color={Colors.textFaint}>
                Hi Welcome Here 👋
              </AppText>
              <AppText variant="h5">{currentUser.name}</AppText>
            </View>
          </Pressable>
          <Pressable
            style={styles.bellButton}
            onPress={() => router.push("/notifications")}
          >
            <Ionicons
              name="notifications-outline"
              size={22}
              color={Colors.textPrimary}
            />
            {hasUnreadNotifications && <View style={styles.bellDot} />}
          </Pressable>
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location" size={13} color={Colors.primary} />
          <AppText variant="body3" color={Colors.textFaint}>
            Current location: Kigali, KK44 St
          </AppText>
        </View>

        <View style={styles.searchWrap}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onFilterPress={() => router.push("/search")}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText variant="h4">Popular Events 🔥</AppText>
            <Pressable onPress={() => router.push("/events")}>
              <AppText variant="button2" color={Colors.primary}>
                VIEW ALL
              </AppText>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.heroRow}
          >
            {featuredEvents.map((event) => (
              <EventHeroCard
                key={event.id}
                event={event}
                onPress={() => router.push(`/event/${event.id}`)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText variant="h4">Choose By Category</AppText>
            <Pressable onPress={() => router.push("/events")}>
              <AppText variant="button2" color={Colors.primary}>
                VIEW ALL
              </AppText>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pillRow}
          >
            {categories.map((category) => (
              <CategoryPill
                key={category.id}
                label={category.label}
                icon={category.icon as any}
                active={activeCategory === category.id}
                onPress={() =>
                  setActiveCategory((prev) =>
                    prev === category.id ? null : category.id,
                  )
                }
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          {visibleEvents.map((event) => (
            <EventListItem
              key={event.id}
              event={event}
              onPress={() => router.push(`/event/${event.id}`)}
            />
          ))}
        </View>
      </ScrollView>

      <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: Spacing.xxl },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  identity: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  bellButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  bellDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xs,
  },
  searchWrap: { paddingHorizontal: Spacing.lg, marginTop: Spacing.md },
  section: { marginTop: Spacing.xl, paddingHorizontal: Spacing.lg },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  heroRow: { paddingRight: Spacing.lg },
  pillRow: { gap: Spacing.sm, paddingRight: Spacing.lg },
});
