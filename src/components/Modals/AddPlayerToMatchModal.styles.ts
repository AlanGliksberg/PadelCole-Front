import { colors, spacing, typography } from "@/src/theme";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    position: "absolute",
    marginHorizontal: width * 0.05,
    marginTop: height * 0.15,
    width: "90%",
    height: 600,
    maxHeight: "70%",
    backgroundColor: colors.white,
    borderRadius: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    overflow: "hidden",
    display: "flex",
    gap: 20,
  },
  headerRow: {
    width: "100%",
    position: "relative",
    marginBottom: spacing.sm,
  },
  title: {
    width: "100%",
  },
  closeButton: {
    position: "absolute",
    right: -5,
    top: -8,
  },
  searchContainer: {},
  list: {
    marginTop: spacing.sm,
    flex: 1
  },
  itemContainer: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 8,
  },
  name: {
    fontSize: typography.body,
    fontWeight: "600",
  },
  sub: {
    marginTop: 4,
    color: colors.placeholder,
  },
  separator: {
    height: spacing.xs,
  },
});
