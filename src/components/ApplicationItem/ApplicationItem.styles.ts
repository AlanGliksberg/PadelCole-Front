import { colors, spacing } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  applicationCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  applicationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  playerDetails: {
    marginLeft: spacing.md,
    flex: 1,
  },
  teamSelectContainer: {
    marginTop: spacing.xs,
  },
  teamSelect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minWidth: 70,
    maxWidth: 85,
  },
  teamSelectText: {
    color: colors.text,
  },
  teamDropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginTop: 2,
    zIndex: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 70,
    maxWidth: 85,
  },
  teamOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactText: {
    color: colors.description,
    marginLeft: spacing.xs,
  },
  copyButton: {
    marginLeft: spacing.sm,
    padding: spacing.xs,
  },
  messageContainer: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  message: {
    color: colors.text,
    fontStyle: "italic",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  rejectButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.error + "20",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.error,
  },
  acceptButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
