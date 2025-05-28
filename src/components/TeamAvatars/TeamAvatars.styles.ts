import { colors, spacing, typography } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: spacing.xs,
  },
  avatarText: {
    color: colors.white,
    fontSize: typography.small,
    fontWeight: "600",
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
