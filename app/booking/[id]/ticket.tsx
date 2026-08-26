import { router, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { QRCodePlaceholder } from '@/components/QRCodePlaceholder';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { getEventById } from '@/data/events';
import { bookingsStore, useBookings } from '@/state/bookings-store';
import { checkoutStore } from '@/state/checkout-store';
import { formatDate } from '@/utils/format';

export default function TicketScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = getEventById(id);
  useBookings();
  const booking = event ? bookingsStore.getForEvent(event.id) : undefined;

  if (!event || !booking) {
    return (
      <SafeAreaView style={styles.root}>
        <ScreenHeader title="Tickets" />
        <View style={styles.notFound}>
          <AppText variant="body1">Ticket not found.</AppText>
        </View>
      </SafeAreaView>
    );
  }

  const handleDone = () => {
    checkoutStore.reset();
    router.replace(`/event/${event.id}/booked`);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="Tickets" rightIcons={[{ icon: 'ellipsis-vertical' }]} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.ticketCard}>
          <Image source={event.image} style={styles.eventImage} resizeMode="cover" />

          <View style={styles.ticketBody}>
            <AppText variant="h4">{event.title}</AppText>

            <View style={styles.infoRow}>
              <View style={styles.infoCol}>
                <AppText variant="body4" color={Colors.textFaint}>
                  Date
                </AppText>
                <AppText variant="body3">{formatDate(event.startDate, 'long')}</AppText>
              </View>
              <View style={styles.infoCol}>
                <AppText variant="body4" color={Colors.textFaint}>
                  Time
                </AppText>
                <AppText variant="body3">{event.time ?? '10:00 PM'}</AppText>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoCol}>
                <AppText variant="body4" color={Colors.textFaint}>
                  Venue
                </AppText>
                <AppText variant="body3">{event.location}</AppText>
              </View>
              <View style={styles.infoCol}>
                <AppText variant="body4" color={Colors.textFaint}>
                  Seat
                </AppText>
                <AppText variant="body3">{booking.seats}</AppText>
              </View>
            </View>

            <View style={styles.perforation}>
              {Array.from({ length: 14 }).map((_, i) => (
                <View key={i} style={styles.dot} />
              ))}
            </View>

            <View style={styles.qrWrap}>
              <QRCodePlaceholder value={booking.id} size={160} />
              <AppText variant="body4" color={Colors.textFaint} style={styles.qrHint}>
                Ticket ID: {booking.id.toUpperCase()}
              </AppText>
            </View>
          </View>
        </View>

        <View style={styles.noteRow}>
          <Ionicons name="information-circle-outline" size={16} color={Colors.textFaint} />
          <AppText variant="body4" color={Colors.textFaint} style={styles.noteText}>
            Show this QR code at the entrance for scanning. Ticket verification will be enabled once
            connected to the backend.
          </AppText>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton label="Download Image" variant="dark" icon="download-outline" onPress={handleDone} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.sm, paddingBottom: Spacing.xxl },
  ticketCard: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    shadowColor: Colors.textPrimary,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  eventImage: { width: '100%', height: 160, backgroundColor: Colors.grey },
  ticketBody: { padding: Spacing.lg },
  infoRow: { flexDirection: 'row', marginTop: Spacing.md, gap: Spacing.xl },
  infoCol: { gap: 2 },
  perforation: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: Spacing.md,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.grey2 },
  qrWrap: { alignItems: 'center', gap: Spacing.sm },
  qrHint: { letterSpacing: 1 },
  noteRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.lg, paddingHorizontal: Spacing.xs },
  noteText: { flex: 1, lineHeight: 18 },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
});
