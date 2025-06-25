import { colors, spacing } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.md,
  },
  backButton: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    marginBottom: 25,
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
  titleContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.primary,
    marginVertical: spacing.sm,
    textAlign: "center",
    marginHorizontal: -spacing.md,
  },
  subtitle: {
    width: "90%",
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
  paragraph1: {
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  paragraph2: {
    textAlign: "center",
  },
});
