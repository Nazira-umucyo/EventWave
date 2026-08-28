import { useState } from 'react';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { CategoryPill } from '@/components/CategoryPill';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Colors, Spacing } from '@/constants/theme';
import { categories } from '@/data/categories';
import { authStore, useAuthState } from '@/state/auth-store';

const MAX_SELECTION = 3;

export default function EditProfileScreen() {
  const user = useAuthState();
  const [fullName, setFullName] = useState(user.fullName);
  const [about, setAbout] = useState(user.about);
  const [dob, setDob] = useState('18 February, 2001');
  const [location, setLocation] = useState('Uttara, Dhaka, Bangladesh');
  const [interests, setInterests] = useState<string[]>(user.interests);
  const [avatarUri, setAvatarUri] = useState<string | null>(user.avatarUri);

  const toggleInterest = (id: string) => {
    setInterests((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= MAX_SELECTION) return prev;
      return [...prev, id];
    });
  };

  const handlePickAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    authStore.set((s) => ({ ...s, fullName, about, interests, avatarUri }));
    router.back();
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="Edit Profile" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarWrap}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <Ionicons name="person-circle" size={96} color={Colors.textFaint} />
          )}
          <Pressable style={styles.avatarEdit} onPress={handlePickAvatar}>
            <Ionicons name="camera-outline" size={14} color={Colors.white} />
          </Pressable>
        </View>

        <Field label="Full Name" value={fullName} onChangeText={setFullName} />
        <Field label="About Me" value={about} onChangeText={setAbout} multiline />
        <Field label="Date of Birth" value={dob} onChangeText={setDob} icon="calendar-outline" />
        <Field label="Location" value={location} onChangeText={setLocation} icon="location-outline" />

        <View style={styles.field}>
          <AppText variant="body3" color={Colors.textFaint} style={styles.fieldLabel}>
            Interested Event (up to 3)
          </AppText>
          <View style={styles.interestRow}>
            {categories.map((category) => (
              <CategoryPill
                key={category.id}
                label={category.label}
                icon={category.icon as any}
                active={interests.includes(category.id)}
                onPress={() => toggleInterest(category.id)}
              />
            ))}
          </View>
        </View>

        <AppButton label="Save Changes" variant="dark" style={styles.submitButton} onPress={handleSave} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Field({
  label,
  value,
  onChangeText,
  icon,
  multiline,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  icon?: keyof typeof Ionicons.glyphMap;
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <AppText variant="body3" color={Colors.textFaint} style={styles.fieldLabel}>
        {label}
      </AppText>
      <View style={styles.inputRow}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, multiline && styles.inputMultiline]}
          multiline={multiline}
        />
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
  inputMultiline: { minHeight: 60, textAlignVertical: 'top' },
  interestRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  submitButton: { alignSelf: 'stretch', marginTop: Spacing.xxl },
});