import { useState } from 'react';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from './AppButton';
import { AppText } from './AppText';
import { Colors, Radius, Spacing } from '@/constants/theme';
import type { EventItem } from '@/data/types';
import { categories } from '@/data/categories';

type EventFormProps = {
  mode: 'add' | 'edit';
  initialEvent?: EventItem;
  onSubmit: (values: { title: string; category: string; description: string }) => void;
};

export function EventForm({ mode, initialEvent, onSubmit }: EventFormProps) {
  const [title, setTitle] = useState(initialEvent?.title ?? '');
  const [category, setCategory] = useState(initialEvent?.category ?? '');
  const [dateLabel] = useState(
    initialEvent ? '10AM - 06 PM, 12 November 2022' : ''
  );
  const [description, setDescription] = useState(initialEvent?.description ?? '');

  const coverImage = initialEvent?.heroImage ?? initialEvent?.image;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {coverImage ? (
        <View style={styles.coverRow}>
          <Image source={coverImage} style={styles.coverThumb} />
          <View style={styles.coverThumb}>
            <Ionicons name="add" size={22} color={Colors.textFaint} />
          </View>
        </View>
      ) : (
        <Pressable style={styles.coverUpload}>
          <Ionicons name="add-circle-outline" size={28} color={Colors.textFaint} />
          <AppText variant="body3" color={Colors.textFaint} style={{ marginTop: 6 }}>
            Add Cover Photos
          </AppText>
        </Pressable>
      )}

      <AppText variant="h5" style={styles.sectionTitle}>
        Event Details
      </AppText>

      <Field label="Event Name">
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Type your event name"
          placeholderTextColor={Colors.placeholder}
          style={styles.input}
        />
      </Field>

      <Field label="Event Type">
        <View style={styles.chipRow}>
          {categories.map((c) => (
            <Pressable
              key={c.id}
              onPress={() => setCategory(c.id)}
              style={[styles.chip, category === c.id && styles.chipActive]}>
              <AppText variant="body4" color={category === c.id ? Colors.white : Colors.textPrimary}>
                {c.label}
              </AppText>
            </Pressable>
          ))}
        </View>
      </Field>

      <Field label="Select Date and Time">
        <Pressable style={styles.dateRow}>
          <AppText variant="body1" color={dateLabel ? Colors.textPrimary : Colors.placeholder}>
            {dateLabel || 'Choose event Date'}
          </AppText>
          <Ionicons name="calendar-outline" size={18} color={Colors.textFaint} />
        </Pressable>
      </Field>

      <Field label="Event Description">
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Type your event description..."
          placeholderTextColor={Colors.placeholder}
          style={[styles.input, styles.textArea]}
          multiline
        />
      </Field>

      <AppButton
        label={mode === 'add' ? 'Publish Now' : 'Save Changes'}
        variant="dark"
        style={styles.submitButton}
        onPress={() => onSubmit({ title, category, description })}
      />
    </ScrollView>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.field}>
      <AppText variant="body3" color={Colors.textFaint} style={styles.fieldLabel}>
        {label}
      </AppText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxl },
  coverUpload: {
    height: 140,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
  },
  coverRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.md },
  coverThumb: {
    width: 72,
    height: 72,
    borderRadius: Radius.md,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: { marginTop: Spacing.xl, marginBottom: Spacing.sm },
  field: { marginTop: Spacing.md },
  fieldLabel: { marginBottom: 6 },
  input: {
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: Colors.grey,
    paddingHorizontal: 14,
    color: Colors.textPrimary,
  },
  textArea: { height: 110, paddingTop: 14, textAlignVertical: 'top' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.pill,
    backgroundColor: Colors.grey,
  },
  chipActive: { backgroundColor: Colors.primary },
  dateRow: {
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: Colors.grey,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  submitButton: { marginTop: Spacing.xl },
});
