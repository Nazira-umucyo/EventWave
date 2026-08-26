import { router, useLocalSearchParams } from 'expo-router';
import { Image, Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/components/AppText';
import { AvatarStack } from '@/components/AvatarStack';
import { StatusPill } from '@/components/StatusPill';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { getEventById } from '@/data/events';
import { getUserById } from '@/data/users';
import { formatDateRange } from '@/utils/format';

export default function EventBookedDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = getEventById(id);

  if (!event) return null;
  const organizer = getUserById(event.organizerId);

  const actions: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }[] = [
    { icon: 'call-outline', label: 'Call', onPress: () => Linking.openURL('tel:+15551234567') },
    { icon: 'navigate-outline', label: 'Directions', onPress: () => {} },
    { icon: 'ticket-outline', label: 'My Ticket', onPress: () => router.push(`/booking/${event.id}/ticket`) },
  ];

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <Image source={event.heroImage ?? event.image} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
          <View style={styles.heroScrim} />
          <SafeAreaView edges={['top']} style={styles.heroHeader}>
            <Pressable style={styles.heroIconButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={20} color={Colors.white} />
            </Pressable>
            <View style={styles.heroIconButton}>
              <Ionicons name="heart" size={20} color={Colors.primary} />
            </View>
          </SafeAreaView>
        </View>

        <View style={styles.actionCard}>
          {actions.map((action) => (
            <Pressable key={action.label} style={styles.actionItem} onPress={action.onPress}>
              <View style={styles.actionIcon}>
                <Ionicons name={action.icon} size={18} color={Colors.primary} />
              </View>
              <AppText variant="body3">{action.label}</AppText>
            </Pressable>
          ))}
        </View>

        <View style={styles.body}>
          <View style={styles.titleRow}>
            <AppText variant="h3" style={{ flex: 1 }}>
              {event.title}
            </AppText>
            <StatusPill label="Booked" variant="success" icon="checkmark-circle" />
          </View>

          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={13} color={Colors.textFaint} />
            <AppText variant="body3" color={Colors.textFaint}>
              {event.location}
            </AppText>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={13} color={Colors.textFaint} />
            <AppText variant="body3" color={Colors.textFaint}>
              {formatDateRange(event.startDate, event.endDate)}
            </AppText>
          </View>

          <View style={styles.membersRow}>
            <AvatarStack avatars={event.membersJoinedAvatars} extraCount={event.membersJoinedCount} />
            <AppText variant="button2" color={Colors.primary}>
              {(event.membersJoinedCount / 1000).toFixed(1)}k+ Members are joined
            </AppText>
          </View>

          {organizer && (
            <Pressable style={styles.organizerRow} onPress={() => router.push(`/profile/${organizer.id}`)}>
              <Image source={organizer.avatar} style={styles.organizerAvatar} />
              <View style={styles.organizerInfo}>
                <AppText variant="h5">{organizer.name}</AppText>
                <AppText variant="body4" color={Colors.textFaint}>
                  Event Organiser
                </AppText>
              </View>
            </Pressable>
          )}

          <View style={styles.section}>
            <AppText variant="h5">Description</AppText>
            <AppText variant="body1" color={Colors.textFaint} style={styles.description}>
              {event.description}
            </AppText>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: Spacing.xxl },
  hero: { height: 280 },
  heroScrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(23,25,36,0.25)' },
  heroHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Spacing.md },
  heroIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(23,25,36,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: Spacing.lg,
    marginTop: -Spacing.xl,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  actionItem: { alignItems: 'center', gap: 6 },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FDEEE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: Spacing.sm },
  membersRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.md },
  organizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
    padding: Spacing.sm,
    backgroundColor: Colors.grey,
    borderRadius: Radius.md,
  },
  organizerAvatar: { width: 44, height: 44, borderRadius: 22 },
  organizerInfo: { flex: 1 },
  section: { marginTop: Spacing.lg },
  description: { marginTop: Spacing.sm, lineHeight: 20 },
});
