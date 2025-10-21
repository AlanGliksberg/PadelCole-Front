import { colors, spacing } from "@/src/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  container: {
    position: "absolute",
    marginHorizontal: width * 0.05,
    marginTop: height * 0.17,
    width: "90%",
    height: 600,
    backgroundColor: colors.white,
    borderRadius: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    overflow: "hidden",
    display: "flex",
    gap: 15,
  },
  headerRow: {
    width: "100%",
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    right: -5,
    top: -8,
  },
  headerRoundButton: {
    minWidth: 60,
    width: 120,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    gap: spacing.xs,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginRight: 40,
  },
  headerRoundButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },

  headerButtons: {
    position: "absolute",
    right: -5,
    top: -8,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  addMyselfHeaderButton: {
    marginRight: spacing.xs,
  },

  tabsContainer: {
    flex: 1,
    gap: spacing.md,
    minHeight: 450,
  },
  tabsHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabButtonActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    color: colors.description,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: "bold",
  },
  tabContent: {
    flex: 1,
    minHeight: 400,
  },
});
