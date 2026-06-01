import { StyleSheet } from "react-native";
import { Colors } from "../../lib/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginHorizontal: 20,
  },
  professorText: {
    fontSize: 11,
    color: Colors.textMuted,
    flexShrink: 1,
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 'bold',
    marginLeft: 4,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 40,
  },
  logoWrapper: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  brandName: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.secondary,
    marginTop: 12,
    letterSpacing: 1.5,
  },
  tagline: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 4,
  },
  title: {
    fontSize: 22,
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
    letterSpacing: 0.5,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    color: Colors.textMuted,
    paddingHorizontal: 12,
    fontSize: 13,
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  registerText: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  registerLink: {
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
    backgroundColor: Colors.error,
  },
  bannerText: {
    color: Colors.white,
    fontSize: 14,
    marginLeft: 8,
    flexShrink: 1,
  },
  teamFooter: {
    alignItems: 'center',
    marginTop: 36,
    marginBottom: 8,
  },
  teamDivider: {
    width: 48,
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 14,
  },
  teamName: {
    fontSize: 11,
    color: Colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
});
