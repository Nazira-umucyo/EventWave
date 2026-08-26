import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { FlatList, Image, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { friendsList } from '@/data/users';
import { invitesStore, useInvites } from '@/state/social-store';

export default function InviteFriendsScreen() {
  const { eventId } = useLocalSearchParams<{ eventId?: string }>();
  const [query, setQuery] = useState('');
  useInvites();

  const filtered = friendsList.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));
  const anyPending = filtered.some((u) => invitesStore.statusFor(u.id) === 'invite');

  const handleSendAll = () => {
    filtered.forEach((u) => {
      if (invitesStore.statusFor(u.id) === 'invite') invitesStore.send(u.id);
    });
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="Invite Friend" />

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={Colors.textFaint} style={styles.searchIcon} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search..."
          placeholderTextColor={Colors.placeholder}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const status = invitesStore.statusFor(item.id);
          return (
            <View style={styles.row}>
              <Image source={item.avatar} style={styles.avatar} />
              <View style={styles.rowInfo}>
                <AppText variant="h5">{item.name}</AppText>
                <AppText variant="body4" color={Colors.textFaint}>
                  {item.followers.toLocaleString()} Followers
                </AppText>
              </View>
              {status === 'sent' ? (
                <View style={styles.sentRow}>
                  <Ionicons name="checkmark" size={14} color={Colors.success} />
                  <AppText variant="body3" color={Colors.success}>
                    Sent
                  </AppText>
                </View>
              ) : (
                <AppButton label="Invite" size="sm" variant="orange" fullWidth={false} onPress={() => invitesStore.send(item.id)} />
              )}
            </View>
          );
        }}
      />

      <View style={styles.footer}>
        <AppButton label="Send Invitation" variant="dark" onPress={handleSendAll} disabled={!anyPending} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grey,
    borderRadius: Radius.md,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    paddingHorizontal: 14,
    height: 48,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: Colors.textPrimary },
  listContent: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.xl },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.sm },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  rowInfo: { flex: 1 },
  sentRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  footer: { padding: Spacing.lg },
});
