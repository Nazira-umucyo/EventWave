import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { EmptyState } from '@/components/EmptyState';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { getUserById } from '@/data/users';
import { notificationsStore, useNotifications } from '@/state/notifications-store';

const ICONS: Record<string, keyof typeof import('@expo/vector-icons').Ionicons.glyphMap> = {
  follow: 'person-add-outline',
  invite: 'mail-outline',
  comment: 'chatbubble-outline',
  like: 'heart-outline',
  reminder: 'time-outline',
};

export default function NotificationsScreen() {
  const notifications = useNotifications();
  const newOnes = notifications.filter((n) => n.isNew);
  const olderOnes = notifications.filter((n) => !n.isNew);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScreenHeader title="Notification" />

      {notifications.length === 0 ? (
        <EmptyState icon="mail-open-outline" title="Ups! There is no notification" subtitle="You'll be notified about activity on events you're a collaborator on." />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {newOnes.length > 0 && (
            <>
              <AppText variant="h5" style={styles.groupTitle}>
                Unread
              </AppText>
              {newOnes.map((n) => (
                <NotificationRow key={n.id} id={n.id} fromUserId={n.fromUserId} message={n.message} timeAgo={n.timeAgo} requiresAction={n.requiresAction} eventId={n.eventId} />
              ))}
            </>
          )}
          {olderOnes.length > 0 && (
            <>
              <AppText variant="h5" style={styles.groupTitle}>
                Yesterday
              </AppText>
              {olderOnes.map((n) => (
                <NotificationRow key={n.id} id={n.id} fromUserId={n.fromUserId} message={n.message} timeAgo={n.timeAgo} requiresAction={n.requiresAction} eventId={n.eventId} />
              ))}
            </>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function NotificationRow({
  id,
  fromUserId,
  message,
  timeAgo,
  requiresAction,
  eventId,
}: {
  id: string;
  fromUserId: string;
  message: string;
  timeAgo: string;
  requiresAction?: boolean;
  eventId?: string;
}) {
  const user = getUserById(fromUserId);
  if (!user) return null;

  return (
    <View style={styles.row}>
      <Pressable style={styles.rowMain} onPress={() => eventId && router.push(`/event/${eventId}`)}>
        <Image source={user.avatar} style={styles.avatar} />
        <View style={styles.rowText}>
          <AppText variant="body1">
            <AppText variant="h5">{user.name}</AppText> {message}
          </AppText>
          <AppText variant="body4" color={Colors.textFaint}>
            {timeAgo}
          </AppText>
        </View>
      </Pressable>
      {requiresAction && (
        <View style={styles.actionsRow}>
          <AppButton label="Reject" variant="light" size="sm" fullWidth={false} onPress={() => notificationsStore.respond(id)} />
          <AppButton label="Accept" variant="orange" size="sm" fullWidth={false} onPress={() => notificationsStore.respond(id)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxl },
  groupTitle: { marginTop: Spacing.lg, marginBottom: Spacing.sm },
  row: { marginBottom: Spacing.md },
  rowMain: { flexDirection: 'row', gap: Spacing.sm },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  rowText: { flex: 1, gap: 2 },
  actionsRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm, marginLeft: 48 },
});
