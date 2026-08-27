import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

import { Colors, Radius, Spacing } from "@/constants/theme";
import { AppText } from "./AppText";

export function SocialAuthRow() {
  const icons: {
    name: React.ComponentProps<typeof FontAwesome5>["name"];
    color: string;
  }[] = [
    { name: "facebook-f", color: "#1877F2" },
    { name: "google", color: "#DB4437" },
    { name: "apple", color: "#000000" },
  ];

  return (
    <View>
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />

        <AppText variant="body2" color={Colors.textFaint}>
          or continue with
        </AppText>

        <View style={styles.dividerLine} />
      </View>

      <View style={styles.iconsRow}>
        {icons.map((item) => (
          <Pressable key={item.name} style={styles.iconButton}>
            <FontAwesome5 name={item.name} size={20} color={item.color} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },

  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.border,
  },

  iconsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },

  iconButton: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
