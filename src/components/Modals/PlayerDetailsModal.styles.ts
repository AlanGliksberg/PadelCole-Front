import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  modalContainer: {
    width: "90%",
    minHeight: "20%",
    maxHeight: "80%",
    backgroundColor: colors.background,
    borderRadius: spacing.md,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    backgroundColor: colors.modalHeaderBackground,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "90%",
    flexShrink: 1,
    gap: spacing.sm,
  },
  name: {
    color: colors.white,
    fontSize: typography.h3,
    fontWeight: "700",
    marginLeft: spacing.sm,
    flexShrink: 1,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    flexShrink: 1,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  rowItem: {
    flexDirection: "row",
    flex: 2,
    alignItems: "flex-end",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
});
