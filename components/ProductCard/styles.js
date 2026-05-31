import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../lib/colors';

const CARD_WIDTH = (Dimensions.get('window').width - 36) / 2;

export default StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.card,
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  imageWrapper: {
    backgroundColor: Colors.surface,
    alignItems: 'center',
    paddingVertical: 12,
  },
  image: {
    width: CARD_WIDTH - 24,
    height: 110,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.primary,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  info: {
    padding: 10,
  },
  name: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 17,
  },
  price: {
    color: Colors.secondary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  originalPrice: {
    color: Colors.textMuted,
    fontSize: 11,
    textDecorationLine: 'line-through',
    marginTop: 1,
  },
  addBtn: {
    backgroundColor: Colors.primary,
    margin: 8,
    marginTop: 0,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addBtnAdded: {
    backgroundColor: Colors.success,
  },
  addBtnText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  imgFallback: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surface,
  },
  imgFallbackIcon: {
    fontSize: 40,
  },
});
