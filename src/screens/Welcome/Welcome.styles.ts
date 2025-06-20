import { colors, spacing } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.md,
    marginTop: 30,
  },
  backButton: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
  buttonText: {
    color: colors.primary,
  },
  card: {
    marginTop: 25,
    backgroundColor: colors.white,
    borderRadius: spacing.lg,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    color: colors.primary,
    marginTop: 40,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: spacing.md,
    textAlign: "center",
  },
  list: {
    marginBottom: spacing.md,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  icon: {
    marginTop: 2,
    marginRight: spacing.sm,
    color: colors.primary,
  },
  itemText: {
    flex: 1,
  },
  itemsHeaderText: {
    marginBottom: spacing.sm,
  },
  itemTitle: {
    fontWeight: "600",
    color: colors.primary,
  },
  button: {
    marginTop: spacing.xl,
    alignSelf: "center",
  },
});
