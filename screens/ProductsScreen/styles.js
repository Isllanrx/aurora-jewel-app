import { StyleSheet, Platform } from 'react-native';
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  filterRow: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterLabel: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.4,
    marginBottom: 6,
  },
  pickerWrapper: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  picker: {
    color: Colors.text,
    height: 48,
    backgroundColor: Platform.OS === 'android' ? Colors.card : 'transparent',
  },
  pickerItem: {
    backgroundColor: Colors.card,
    color: Colors.text,
    fontSize: 14,
  },
  listContent: {
    padding: 12,
    paddingBottom: 32,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.textMuted,
    marginTop: 60,
    fontSize: 15,
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  row: {
    justifyContent: 'space-between',
  },

  /* Web-only: botão que abre o modal de seleção */
  webPickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  webPickerText: {
    color: Colors.text,
    fontSize: 14,
  },

  /* Modal overlay */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    width: 280,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  modalTitle: {
    color: Colors.secondary,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 4,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 8,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  modalOptionActive: {
    backgroundColor: Colors.primary + '22',
  },
  modalOptionText: {
    color: Colors.text,
    fontSize: 15,
  },
  modalOptionTextActive: {
    color: Colors.secondary,
    fontWeight: '600',
  },
});
