import { colors, spacing } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "85%",
    maxHeight: "80%",
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between", // mueve la X a la derecha
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  closeBtn: {
    padding: spacing.xs,
  },
  label: {
    marginTop: spacing.sm,
  },
  toggleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: spacing.xs,
  },
  toggleBtn: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.placeholder,
    borderRadius: 4,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  toggleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  text: {
    color: colors.placeholder,
  },
  textActive: {
    color: colors.white,
  },
  categoriesScroll: {
    maxHeight: 200,
    marginTop: spacing.xs,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryColumn: {
    flex: 1,
  },
  levelItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.xs,
  },
  levelText: {
    marginLeft: spacing.sm,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.md,
    gap: 15,
  },
});
