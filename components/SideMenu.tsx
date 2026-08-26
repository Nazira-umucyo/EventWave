import { router } from 'expo-router';
import { Image, Modal, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from './AppText';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { currentUser } from '@/data/users';
import { authStore } from '@/state/auth-store';

type SideMenuProps = {
  visible: boolean;
  onClose: () => void;
};

const MENU_ITEMS: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}[] = [
  { icon: 'person-outline', label: 'My Profile', onPress: () => router.push('/(tabs)/profile') },
  { icon: 'calendar-outline', label: 'Calendar', onPress: () => router.push('/(tabs)/calendar') },
  { icon: 'bookmark-outline', label: 'Bookmark', onPress: () => router.push('/wishlist') },
  { icon: 'mail-outline', label: 'Contact Us', onPress: () => router.push('/contact-us') },
  { icon: 'settings-outline', label: 'Settings', onPress: () => router.push('/settings') },
  { icon: 'help-circle-outline', label: 'Help & FAQs', onPress: () => router.push('/help-faqs') },
];

export function SideMenu({ visible, onClose }: SideMenuProps) {
  const navigate = (action: () => void) => {
    onClose();
    setTimeout(action, 200);
  };

  const handleSignOut = () => {
    onClose();
    authStore.signOut();
    router.replace('/(auth)/sign-in');
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.panel} edges={['top', 'bottom']}>
          <View style={styles.header}>
            <Image source={currentUser.avatar} style={styles.avatar} />
            <Pressable onPress={onClose} hitSlop={12}>
              <Ionicons name="close" size={22} color={Colors.textPrimary} />
            </Pressable>
          </View>
          <AppText variant="h4">{currentUser.name}</AppText>
          <AppText variant="body3" color={Colors.textFaint}>
            rafiislamapon4@gmail.com
          </AppText>

          <View style={styles.menuList}>
            {MENU_ITEMS.map((item) => (
              <Pressable key={item.label} style={styles.menuRow} onPress={() => navigate(item.onPress)}>
                <Ionicons name={item.icon} size={18} color={Colors.textPrimary} />
                <AppText variant="body1">{item.label}</AppText>
              </Pressable>
            ))}
            <Pressable style={styles.menuRow} onPress={handleSignOut}>
              <Ionicons name="log-out-outline" size={18} color={Colors.error} />
              <AppText variant="body1" color={Colors.error}>
                Sign Out
              </AppText>
            </Pressable>
          </View>
        </SafeAreaView>
        <Pressable style={styles.backdrop} onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  panel: {
    width: '78%',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  backdrop: {
    flex: 1,
    backgroundColor: Colors.overlay,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: Radius.pill,
  },
  menuList: {
    marginTop: Spacing.xl,
    gap: Spacing.lg,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
});
