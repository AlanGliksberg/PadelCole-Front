import { colors, spacing } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: spacing.lg,
  },
  matchesScroll: {
    overflow: "hidden",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: 40,
    paddingHorizontal: spacing.lg,
    marginTop: 50,
    marginHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  emptyTitle: {
    textAlign: "center",
    fontWeight: "600",
  },
  emptySubtitle: {
    textAlign: "center",
    color: colors.placeholder,
  },
});
