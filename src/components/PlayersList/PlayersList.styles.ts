import { colors, spacing } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    gap: 15,
  },
  emptyText: {
    width: "80%",
    textAlign: "center",
    lineHeight: 24,
    color: colors.placeholder,
  },
  list: {
    marginTop: spacing.sm,
    flex: 1,
  },
  itemContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 8,
  },
  playerInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  sub: {
    marginTop: spacing.xs,
    color: colors.placeholder,
  },
  addIconContainer: {
    marginLeft: spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ccc",
    marginVertical: 4,
    marginHorizontal: spacing.md,
  },
});
