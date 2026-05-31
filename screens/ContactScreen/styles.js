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
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 14,
    marginTop: 2,
  },
  cardTitle: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  cardText: {
    color: Colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  mapPlaceholder: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 8,
  },
  mapIcon: { fontSize: 40, marginBottom: 8 },
  mapText: { color: Colors.textMuted, fontSize: 14 },
});
