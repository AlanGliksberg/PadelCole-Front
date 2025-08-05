import { StyleSheet } from "react-native";
import { colors, spacing } from "@/src/theme";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  filtersCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    // Sombra iOS
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    // Elevación Android
    elevation: 2,
  },
  filterItem: {
    minWidth: 110,
    marginRight: 8,
  },
});
