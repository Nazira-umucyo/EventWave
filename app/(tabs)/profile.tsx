import { useState } from 'react';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/components/AppText';
import { CategoryPill } from '@/components/CategoryPill';
import { Colors, Spacing } from '@/constants/theme';
import { categories } from '@/data/categories';
import { useAuthState } from '@/state/auth-store';

export default function ProfileScreen() {
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const user = useAuthState();

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
          {user.avatarUri ? (
            <Image source={{ uri: user.avatarUri }} style={styles.avatar} />
          ) : (
            <Ionicons name="person-circle" size={96} color={Colors.textFaint} />
          )}
        </View>
        <AppText variant="h3" style={styles.name}>
          {user.fullName || 'Your Name'}
        </AppText>

        <View style={styles.section}>
          <AppText variant="h5">About Me</AppText>
          <AppText
            variant="body1"
            color={Colors.textFaint}
            numberOfLines={aboutExpanded ? undefined : 3}
            style={styles.aboutText}>
            {user.about || 'Add a short bio in Edit Profile.'}{' '}
            {user.about ? (
              <AppText variant="button2" color={Colors.primary} onPress={() => setAboutExpanded((p) => !p)}>
                {aboutExpanded ? 'Read Less' : 'Read More'}
              </AppText>
            ) : null}
          </AppText>
        </View>

        <View style={styles.section}>
          <AppText variant="h5" style={styles.interestTitle}>
            Interest
          </AppText>
          <View style={styles.interestRow}>
            {user.interests.length === 0 && (
              <AppText variant="body2" color={Colors.textFaint}>
                No interests selected yet.
              </AppText>
            )}
            {user.interests.map((id) => {
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
  section: { alignSelf: 'stretch', marginTop: Spacing.xl },
  aboutText: { marginTop: Spacing.sm, lineHeight: 20 },
  interestTitle: { marginBottom: Spacing.sm },
  interestRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
});