// src/screens/PlayerInfoScreen.styles.ts
import { colors, spacing } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.background,
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
  titleContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  title: {
    color: colors.primary,
    textAlign: "center",
  },
  subtitle: {
    width: "80%",
    textAlign: "center",
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: spacing.lg,
    padding: spacing.lg,
    // sombra iOS
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    // elevación Android
    elevation: 4,
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.text,
  },
  subLabel: {
    marginBottom: spacing.md,
  },
  separator: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ccc",
    marginVertical: spacing.md,
  },
  questionsContainer: {
    gap: spacing.md,
  },
  button: {
    marginTop: spacing.lg,
    alignSelf: "flex-end",
  },
});
