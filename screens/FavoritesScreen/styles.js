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
  listContent:   { padding: 12, paddingBottom: 32 },
  row:           { justifyContent: 'space-between' },
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyText:  { color: Colors.textMuted, fontSize: 16, marginBottom: 20 },
  shopButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  shopButtonText: { color: Colors.white, fontWeight: 'bold', fontSize: 14 },
  loadingWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
