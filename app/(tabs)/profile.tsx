import { useState } from 'react';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/components/AppText';
import { CategoryPill } from '@/components/CategoryPill';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { categories } from '@/data/categories';
import { currentUser } from '@/data/users';

const INTERESTS = ['design', 'food', 'sports', 'music', 'art'];

export default function ProfileScreen() {
  const [aboutExpanded, setAboutExpanded] = useState(false);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={() => router.push('/add-event')}>
          <Ionicons name="add-circle-outline" size={22} color={Colors.textPrimary} />
        </Pressable>
        <AppText variant="h4">Profile</AppText>
        <Pressable style={styles.iconButton} onPress={() => router.push('/profile/edit')}>
          <Ionicons name="create-outline" size={20} color={Colors.textPrimary} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarWrap}>
          <Image source={currentUser.avatar} style={styles.avatar} />
        </View>
        <AppText variant="h3" style={styles.name}>
          {currentUser.name}
        </AppText>

        <View style={styles.statsRow}>
          <Stat label="Followers" value={currentUser.followers} />
          <View style={styles.statDivider} />
          <Stat label="Following" value={currentUser.following} />
          <View style={styles.statDivider} />
          <Stat label="Events" value={currentUser.eventsCount} />
        </View>

        <View style={styles.section}>
          <AppText variant="h5">About Me</AppText>
          <AppText variant="body1" color={Colors.textFaint} numberOfLines={aboutExpanded ? undefined : 3} style={styles.aboutText}>
            {currentUser.about}{' '}
            <AppText variant="button2" color={Colors.primary} onPress={() => setAboutExpanded((p) => !p)}>
              {aboutExpanded ? 'Read Less' : 'Read More'}
            </AppText>
          </AppText>
        </View>

        <View style={styles.section}>
          <AppText variant="h5" style={styles.interestTitle}>
            Interest
          </AppText>
          <View style={styles.interestRow}>
            {INTERESTS.map((id) => {
              const category = categories.find((c) => c.id === id);
              if (!category) return null;
              return <CategoryPill key={id} label={category.label} icon={category.icon as any} active />;
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.stat}>
      <AppText variant="h4">{value.toLocaleString()}</AppText>
      <AppText variant="body3" color={Colors.textFaint}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  iconButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxl, alignItems: 'center' },
  avatarWrap: { marginTop: Spacing.md },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  name: { marginTop: Spacing.md },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.lg,
    gap: Spacing.xl,
  },
  stat: { alignItems: 'center' },
  statDivider: { width: StyleSheet.hairlineWidth, height: 28, backgroundColor: Colors.border },
  section: { alignSelf: 'stretch', marginTop: Spacing.xl },
  aboutText: { marginTop: Spacing.sm, lineHeight: 20 },
  interestTitle: { marginBottom: Spacing.sm },
  interestRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
});
