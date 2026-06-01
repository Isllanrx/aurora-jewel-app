import { StyleSheet } from "react-native";
import { Colors } from "../../lib/colors";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  alertBox: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 15,
    color: Colors.text,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  okBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  okBtnText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 15,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: "center",
  },
  cancelBtnText: {
    color: Colors.textMuted,
    fontWeight: "600",
    fontSize: 15,
  },
  confirmBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 12,
    marginLeft: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmBtnText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 15,
  },
});
