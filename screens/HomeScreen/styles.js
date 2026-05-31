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
  hamburger: {
    padding: 4,
  },
  hamburgerIcon: {
    fontSize: 22,
    color: Colors.text,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  cartBtn: {
    padding: 4,
  },
  cartBadgeWrap: {
    position: 'relative',
  },
  cartIcon: {
    fontSize: 22,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  hero: {
    backgroundColor: Colors.surface,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    padding: 20,
  },
  heroTag: {
    backgroundColor: Colors.primary + '33',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  heroTagText: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    lineHeight: 34,
  },
  heroGold: {
    color: Colors.secondary,
  },
  heroSubtitle: {
    color: Colors.textMuted,
    fontSize: 14,
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 20,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  heroButtons: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: -5,
  },
  heroBtnWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  heroBtnPrimary: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  heroBtnSecondary: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  heroBtnTextPrimary: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  heroBtnTextSecondary: {
    color: Colors.secondary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  seeAll: {
    color: Colors.secondary,
    fontSize: 13,
  },
  categories: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginRight: 10,
    minWidth: 90,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  categoryLabel: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  statLabel: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});
