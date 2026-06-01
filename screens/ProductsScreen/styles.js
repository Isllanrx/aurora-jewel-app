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
});
