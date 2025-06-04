import { colors, spacing } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: spacing.xs,
  },
  avatarInverse: {
    backgroundColor: colors.white,
  },
  avatarText: {
    color: colors.white,
    fontWeight: "600",
  },
  avatarTextInverse: {
    color: colors.primary,
  },
  size_s: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  size_m: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  size_l: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
});
