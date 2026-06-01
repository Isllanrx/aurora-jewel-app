import { StyleSheet } from "react-native";
import { Colors } from "../../lib/colors";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  imageWrapper: {
    backgroundColor: Colors.surface,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
  image: {
    width: 64,
    height: 64,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  name: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    color: Colors.secondary,
    fontSize: 15,
    fontWeight: "bold",
  },
  subtotal: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    backgroundColor: Colors.surface,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  qtyBtnText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  qty: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: "center",
  },
  removeBtn: {
    marginLeft: "auto",
    padding: 4,
  },
  removeIcon: {
    fontSize: 18,
    color: Colors.error,
  },
});
