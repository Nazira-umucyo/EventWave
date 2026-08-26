import { useState } from 'react';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { currentUser } from '@/data/users';

export default function EditProfileScreen() {
  const [fullName, setFullName] = useState(currentUser.name);
  const [dob, setDob] = useState('18 February, 2001');
  const [location, setLocation] = useState('Uttara, Dhaka, Bangladesh');
  const [interests, setInterests] = useState('Design, Art, Sports, Programing, Food, Music');

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="Edit Profile" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarWrap}>
          <Image source={currentUser.avatar} style={styles.avatar} />
          <Pressable style={styles.avatarEdit}>
            <Ionicons name="camera-outline" size={14} color={Colors.white} />
          </Pressable>
        </View>

        <Field label="Full Name" value={fullName} onChangeText={setFullName} />
        <Field label="Date of Birth" value={dob} onChangeText={setDob} icon="calendar-outline" />
        <Field label="Location" value={location} onChangeText={setLocation} icon="location-outline" />
        <Field label="Interested Event" value={interests} onChangeText={setInterests} icon="heart-outline" />

        <AppButton label="Save Changes" variant="dark" style={styles.submitButton} onPress={() => router.back()} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Field({
  label,
  value,
  onChangeText,
  icon,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={styles.field}>
      <AppText variant="body3" color={Colors.textFaint} style={styles.fieldLabel}>
        {label}
      </AppText>
      <View style={styles.inputRow}>
        <TextInput value={value} onChangeText={onChangeText} style={styles.input} />
        {icon && <Ionicons name={icon} size={18} color={Colors.textFaint} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxl, alignItems: 'center' },
  avatarWrap: { marginTop: Spacing.md },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  avatarEdit: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  field: { alignSelf: 'stretch', marginTop: Spacing.xl },
  fieldLabel: { marginBottom: 6 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: Spacing.sm,
  },
  input: { flex: 1, fontSize: 15, color: Colors.textPrimary },
  submitButton: { alignSelf: 'stretch', marginTop: Spacing.xxl },
});
