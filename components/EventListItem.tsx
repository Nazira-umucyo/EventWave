import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { Colors, Radius, Spacing } from "@/constants/theme";
import type { EventItem } from "@/data/types";
import { bookingsStore, useBookings } from "@/state/bookings-store";
import { formatDateRange } from "@/utils/format";
import { AppButton } from "./AppButton";
import { AppText } from "./AppText";

type EventListItemProps = {
  event: EventItem;
  onPress?: () => void;
};

export function EventListItem({ event, onPress }: EventListItemProps) {
  useBookings();
  const isBooked = !!bookingsStore.getForEvent(event.id);

  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={styles.thumbContainer}>
        <Image source={event.image} style={styles.thumb} resizeMode="cover" />
      </View>

      <View style={styles.info}>
        <AppText variant="h5" numberOfLines={1}>
          {event.title}
        </AppText>

        <View style={styles.metaRow}>
          <Ionicons
            name="calendar-outline"
            size={11}
            color={Colors.textFaint}
          />
          <AppText
            variant="body4"
            color={Colors.textFaint}
            numberOfLines={1}
            style={styles.dateText}
          >
            {formatDateRange(event.startDate, event.endDate)}
          </AppText>
          <AppText variant="body4" color={Colors.textFaint}>
            {" • "}
          </AppText>
          <AppText
            variant="body4"
            color={Colors.textFaint}
            numberOfLines={1}
            style={styles.location}
          >
            {event.location}
          </AppText>
        </View>

        <View style={styles.footerRow}>
          <AppText variant="button2" color={Colors.primary}>
            ${event.price.toFixed(2)} USD
          </AppText>
          {isBooked ? (
            <AppButton
              label="Booked"
              size="sm"
              variant="light"
              fullWidth={false}
              disabled
            />
          ) : (
            <AppButton
              label="Join Now"
              size="sm"
              variant="dark"
              fullWidth={false}
              onPress={onPress}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  thumbContainer: {
    width: 88,
    height: 88,
    borderRadius: Radius.md,
    overflow: "hidden", // Ensures rounded corners apply consistently across iOS/Android
    backgroundColor: Colors.grey,
  },
  thumb: {
    width: "100%",
    height: "100%",
  },
  info: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  dateText: {
    flexShrink: 0,
  },
  location: {
    flex: 1, // Gracefully truncates long location names with "..." without squeezing the date
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
});
