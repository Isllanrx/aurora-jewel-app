import { StyleSheet } from "react-native";
import { Colors } from "../../lib/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingVertical: 32,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: Colors.secondary,
    fontSize: 14,
    marginLeft: 4,
  },
  langBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  langBtnText: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 28,
  },
  label: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 6,
    marginTop: 14,
  },
  required: {
    color: Colors.error,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: Colors.text,
    fontSize: 15,
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 28,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  loginText: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  loginLink: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 20,
  },
  bannerSuccess: {
    backgroundColor: Colors.success,
  },
  bannerError: {
    backgroundColor: Colors.error,
  },
  bannerText: {
    color: Colors.white,
    fontSize: 14,
    marginLeft: 8,
    flexShrink: 1,
  },
});
