import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppButton } from "@/components/AppButton";
import { AppText } from "@/components/AppText";
import { AvatarStack } from "@/components/AvatarStack";
import { Colors, Radius, Spacing } from "@/constants/theme";
import { getEventById } from "@/data/events";
import { getUserById } from "@/data/users";
import { bookingsStore, useBookings } from "@/state/bookings-store";
import { useWishlist, wishlistStore } from "@/state/wishlist-store";
import { formatDateRange } from "@/utils/format";

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = getEventById(id);
  const [descExpanded, setDescExpanded] = useState(false);

  useBookings();
  useWishlist();

  if (!event) {
    return (
      <SafeAreaView style={styles.root}>
        <AppText variant="body1">Event not found.</AppText>
      </SafeAreaView>
    );
  }

  const organizer = getUserById(event.organizerId);
  const wishlisted = wishlistStore.isWishlisted(event.id);
  const booking = bookingsStore.getForEvent(event.id);

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.hero}>
          <Image
            source={event.heroImage ?? event.image}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroScrim} />
          <SafeAreaView edges={["top"]} style={styles.heroHeader}>
            <Pressable
              style={styles.heroIconButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={20} color={Colors.white} />
            </Pressable>
            <Pressable
              style={styles.heroIconButton}
              onPress={() => wishlistStore.toggle(event.id)}
            >
              <Ionicons
                name={wishlisted ? "heart" : "heart-outline"}
                size={20}
                color={wishlisted ? Colors.primary : Colors.white}
              />
            </Pressable>
          </SafeAreaView>
        </View>

        <View style={styles.body}>
          <View style={styles.titleRow}>
            <AppText variant="h3" style={styles.titleText}>
              {event.title}
            </AppText>
            {!booking && (
              <View style={styles.priceTag}>
                <AppText variant="h5" color={Colors.primary}>
                  ${event.price.toFixed(0)} USD
                </AppText>
              </View>
            )}
          </View>

          <View style={styles.metaRow}>
            <Ionicons
              name="location-outline"
              size={13}
              color={Colors.textFaint}
            />
            <AppText variant="body3" color={Colors.textFaint}>
              {event.location}
            </AppText>
          </View>
          <View style={styles.metaRow}>
            <Ionicons
              name="calendar-outline"
              size={13}
              color={Colors.textFaint}
            />
            <AppText variant="body3" color={Colors.textFaint}>
              {formatDateRange(event.startDate, event.endDate)}
            </AppText>
          </View>

          <View style={styles.membersRow}>
            <AvatarStack
              avatars={event.membersJoinedAvatars}
              extraCount={event.membersJoinedCount}
            />
            <AppText variant="button2" color={Colors.primary}>
              {(event.membersJoinedCount / 1000).toFixed(1)}k+ Members are
              joined
            </AppText>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/invite-friends",
                  params: { eventId: event.id },
                })
              }
            >
              <AppText variant="button2" color={Colors.textPrimary}>
                VIEW ALL / INVITE
              </AppText>
            </Pressable>
          </View>

          {organizer && (
            <Pressable
              style={styles.organizerRow}
              onPress={() => router.push(`/profile/${organizer.id}`)}
            >
              <Image source={organizer.avatar} style={styles.organizerAvatar} />
              <View style={styles.organizerInfo}>
                <AppText variant="h5">{organizer.name}</AppText>
                <AppText variant="body4" color={Colors.textFaint}>
                  Event Organiser
                </AppText>
              </View>
              <View style={styles.organizerActions}>
                <View style={styles.circleButton}>
                  <Ionicons
                    name="chatbubble-outline"
                    size={16}
                    color={Colors.textPrimary}
                  />
                </View>
                <View style={styles.circleButton}>
                  <Ionicons
                    name="call-outline"
                    size={16}
                    color={Colors.textPrimary}
                  />
                </View>
              </View>
            </Pressable>
          )}

          <View style={styles.section}>
            <AppText variant="h5">Description</AppText>
            <AppText
              variant="body1"
              color={Colors.textFaint}
              numberOfLines={descExpanded ? undefined : 3}
              style={styles.description}
            >
              {event.description}{" "}
              <AppText
                variant="button2"
                color={Colors.primary}
                onPress={() => setDescExpanded((p) => !p)}
              >
                {descExpanded ? "Read Less" : "Read More"}
              </AppText>
            </AppText>
          </View>
        </View>
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.footer}>
        {booking ? (
          <AppButton
            label="View My Ticket"
            variant="dark"
            onPress={() => router.push(`/event/${event.id}/booked`)}
          />
        ) : (
          <View style={styles.footerRow}>
            <Pressable
              style={styles.bookmarkButton}
              onPress={() => wishlistStore.toggle(event.id)}
            >
              <Ionicons
                name={wishlisted ? "bookmark" : "bookmark-outline"}
                size={20}
                color={Colors.textPrimary}
              />
            </Pressable>
            <AppButton
              label="Choose Your Seat"
              variant="orange"
              style={styles.buyButton}
              onPress={() => router.push(`/booking/${event.id}/tickets`)}
            />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: 140 },
  hero: {
    height: 260,
    width: "100%",
    backgroundColor: Colors.grey,
    overflow: "hidden",
    position: "relative",
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  heroScrim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  heroHeader: {
    flexDirection: "row",
    justify: "space-between",
    paddingHorizontal: Spacing.md,
  },
  heroIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(23, 25, 36, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  // Keep the rest of your lower body and footer styles unchanged below...
  body: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: Spacing.sm,
  },
  titleText: { flex: 1 },
  priceTag: {
    backgroundColor: "#FDEEE4",
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: Spacing.sm,
  },
  membersRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: Spacing.md,
    flexWrap: "wrap",
  },
  organizerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: Spacing.lg,
    padding: Spacing.sm,
    backgroundColor: Colors.grey,
    borderRadius: Radius.md,
  },
  organizerAvatar: { width: 44, height: 44, borderRadius: 22 },
  organizerInfo: { flex: 1 },
  organizerActions: { flexDirection: "row", gap: Spacing.sm },
  circleButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  section: { marginTop: Spacing.lg },
  description: { marginTop: Spacing.sm, lineHeight: 20 },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
  footerRow: { flexDirection: "row", alignItems: "center", gap: Spacing.md },
  bookmarkButton: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  buyButton: { flex: 1 },
});
