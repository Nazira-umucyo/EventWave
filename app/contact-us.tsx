import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { AppText } from '@/components/AppText';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Colors, Radius, Spacing } from '@/constants/theme';

export default function ContactUsScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // No backend yet — this will POST to a support endpoint once Firebase
    // Functions (or similar) is wired in.
    Alert.alert('Message sent', "Thanks for reaching out — we'll get back to you soon.");
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="Contact Us" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <AppText variant="body1" color={Colors.textFaint} style={styles.subtitle}>
            Questions, feedback, or an issue with an event? Send us a message and we&apos;ll respond by email.
          </AppText>

          <View style={styles.form}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor={Colors.placeholder}
              style={styles.input}
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Your email"
              placeholderTextColor={Colors.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="How can we help?"
              placeholderTextColor={Colors.placeholder}
              style={[styles.input, styles.textArea]}
              multiline
            />
          </View>

          <AppButton
            label="Send Message"
            variant="dark"
            style={styles.button}
            disabled={!name || !email || !message}
            onPress={handleSend}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.sm, paddingBottom: Spacing.xl },
  subtitle: { marginBottom: Spacing.lg, lineHeight: 20 },
  form: { gap: Spacing.md },
  input: {
    minHeight: 52,
    borderRadius: Radius.md,
    backgroundColor: Colors.grey,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: Colors.textPrimary,
  },
  textArea: { height: 120, textAlignVertical: 'top' },
  button: { marginTop: Spacing.xl },
});
