import { StyleSheet } from "react-native";
import { Colors } from "../../lib/colors";

export default StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.secondary,
  },
  avatarImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  userName: { color: Colors.text, fontWeight: "bold", fontSize: 15 },
  starsRow: { flexDirection: "row", marginTop: 2 },
  review: {
    color: Colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "italic",
  },
});
