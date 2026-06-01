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
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
