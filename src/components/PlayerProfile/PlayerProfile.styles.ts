import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    gap: spacing.md,
  },
  profileHeader: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: spacing.md,
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.input,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.primary,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.surface,
  },
  profileInfo: {
    alignItems: "center",
  },
  playerName: {
    fontSize: typography.h2,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  playerEmail: {
    fontSize: typography.body,
    color: colors.description,
    marginBottom: spacing.md,
  },
  playerStats: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.input,
    borderRadius: 8,
    padding: spacing.md,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: typography.h3,
    fontWeight: "bold",
    color: colors.primary,
  },
  statLabel: {
    fontSize: typography.small,
    color: colors.description,
    marginTop: spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
    gap: spacing.xs,
  },
  activeTab: {
    backgroundColor: colors.primary + "15",
  },
  tabText: {
    fontSize: typography.small,
    color: colors.description,
    fontWeight: "500",
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: "bold",
  },
  tabContent: {
    flex: 1,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.h3,
    fontWeight: "bold",
    color: colors.text,
  },
  detailsContainer: {
    gap: spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  detailText: {
    fontSize: typography.body,
    color: colors.text,
    flex: 1,
  },
  skeletonContainer: {
    gap: spacing.md,
  },
  matchesContainer: {
    gap: spacing.md,
  },
  emptyState: {
    alignItems: "center",
    padding: spacing.xl,
  },
  emptyStateText: {
    fontSize: typography.body,
    color: colors.description,
    marginTop: spacing.md,
    textAlign: "center",
  },
  actionsContainer: {
    gap: spacing.sm,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: colors.input,
    borderRadius: 8,
    gap: spacing.sm,
  },
  actionText: {
    fontSize: typography.body,
    color: colors.text,
    flex: 1,
  },
  logoutButton: {
    backgroundColor: colors.error + "10",
  },
  logoutText: {
    color: colors.error,
  },
});
