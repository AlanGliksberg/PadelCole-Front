import { colors } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  topSection: {
    flex: 1,
  },
  emailLink: {
    color: colors.link,
    textDecorationLine: "underline",
  },
});
