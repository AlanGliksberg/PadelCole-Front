import { colors, spacing } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {},
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  court: {
    backgroundColor: "#e6fff0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    position: "relative",
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  teamSide: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    gap: spacing.sm,
  },
  teamLabel: {
    color: colors.primary,
  },
  playerSlot: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 80,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 8,
    padding: spacing.sm,
    width: "100%",
    position: "relative",
  },
  avatarContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  playerName: {
    textAlign: "center",
    marginTop: spacing.xs,
    fontWeight: "500",
  },
  playerPoints: {
    textAlign: "center",
    marginTop: spacing.xs,
    color: colors.description,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  plus: {
    fontSize: 32,
    color: colors.primary,
  },
  net: {
    width: 2,
    opacity: 0.7,
    backgroundColor: colors.primary,
  },
  closeButton: {
    position: "absolute",
    top: -12,
    right: -12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});
