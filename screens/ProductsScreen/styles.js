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
  hamburgerIcon: {
    fontSize: 22,
    color: Colors.text,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  cartIcon: {
    fontSize: 22,
  },
  filterRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterLabel: {
    color: Colors.textMuted,
    fontSize: 12,
    marginBottom: 4,
  },
  pickerWrapper: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  picker: {
    color: Colors.text,
    height: 44,
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
  },
  row: {
    justifyContent: 'space-between',
  },
});
