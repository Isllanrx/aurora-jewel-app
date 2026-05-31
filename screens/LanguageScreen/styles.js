import { StyleSheet } from 'react-native';
import { Colors } from '../../lib/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
  },
  hamburgerIcon: { fontSize: 22, color: Colors.text },
  headerTitle:   { fontSize: 18, fontWeight: 'bold', color: Colors.secondary },
  scroll: {
    padding: 24,
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'center',
  },
  option: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  optionActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '1A',
  },
  flag:   { fontSize: 36, marginRight: 16 },
  langName: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text,
  },
  langNameActive: { color: Colors.secondary },
  checkmark: {
    fontSize: 20,
    color: Colors.primary,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  saveBtnText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  successMsg: {
    textAlign: 'center',
    color: Colors.success,
    fontSize: 14,
    marginTop: 12,
  },
});
