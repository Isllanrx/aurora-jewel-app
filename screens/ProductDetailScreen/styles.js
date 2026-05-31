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
  backIcon: {
    fontSize: 22,
    color: Colors.text,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondary,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  favBtn: {
    padding: 4,
  },
  favIcon: {
    fontSize: 22,
  },
  imageWrapper: {
    backgroundColor: Colors.surface,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 240,
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  info: {
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  priceGap: {
    width: 10,
  },
  price: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  originalPrice: {
    fontSize: 16,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.card,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryText: {
    color: Colors.textMuted,
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
  descTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textMuted,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    color: Colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  footer: {
    padding: 16,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  addButtonDisabled: {
    opacity: 0.6,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  addedText: {
    color: Colors.success,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
