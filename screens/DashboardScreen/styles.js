import { StyleSheet } from "react-native";
import { Colors } from "../../lib/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
  },
  hamburgerIcon: { fontSize: 22, color: Colors.text },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: Colors.secondary },
  scroll: {
    padding: 16,
  },
  statCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 20,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statIcon: { marginRight: 16 },
  statNumber: { fontSize: 28, fontWeight: "bold", color: Colors.secondary },
  statLabel: { color: Colors.textMuted, fontSize: 13, marginTop: 2 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginTop: 8,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  categoryRow: {
    marginBottom: 10,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  categoryName: { color: Colors.text, fontSize: 14 },
  categoryCount: { color: Colors.secondary, fontSize: 14, fontWeight: "bold" },
  barTrack: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
