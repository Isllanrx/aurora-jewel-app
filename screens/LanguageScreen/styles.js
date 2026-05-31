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
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.secondary },
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
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '18',
  },
  langCode: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  langCodeActive: {
    backgroundColor: Colors.primary + '33',
    borderColor: Colors.primary,
  },
  langCodeText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  langCodeTextActive: {
    color: Colors.secondary,
  },
  langName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  langNameActive: {
    color: Colors.secondary,
  },
  langNative: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
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
