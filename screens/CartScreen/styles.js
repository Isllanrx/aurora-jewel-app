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
  clearBtn: { color: Colors.error, fontSize: 14 },
  listContent: {
    padding: 12,
    paddingBottom: 8,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
  },
  emptyText: { color: Colors.textMuted, fontSize: 16, marginBottom: 20 },
  shopButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  shopButtonText: { color: Colors.white, fontWeight: "bold", fontSize: 14 },
  footer: {
    padding: 16,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  totalLabel: { color: Colors.textMuted, fontSize: 15 },
  totalValue: { color: Colors.secondary, fontSize: 20, fontWeight: "bold" },
  checkoutBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  checkoutBtnText: { color: Colors.white, fontSize: 16, fontWeight: "bold" },
});
