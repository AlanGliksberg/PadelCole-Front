import { colors, spacing } from "@/src/theme";
import { Dimensions, StyleSheet } from "react-native";

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
});
