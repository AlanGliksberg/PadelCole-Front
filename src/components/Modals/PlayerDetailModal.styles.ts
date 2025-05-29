import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    minHeight: "20%",
    maxHeight: "80%",
    backgroundColor: colors.background,
    borderRadius: spacing.md,
    padding: spacing.md,
    display: "flex",
    flexDirection: "row",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-start",
  },
  nameContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    maxWidth: "90%",
    flexShrink: 1,
  },
  name: {
    flexShrink: 1,
  },
});
