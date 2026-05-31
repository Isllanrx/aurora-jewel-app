import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Colors } from '../lib/colors';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

const MENU_ITEMS = [
  { key: 'Home',          icon: '🏠' },
  { key: 'Products',      icon: '💎' },
  { key: 'Cart',          icon: '🛒' },
  { key: 'Favorites',     icon: '❤️' },
  { key: 'Testimonials',  icon: '⭐' },
  { key: 'Contact',       icon: '📍' },
  { key: 'Dashboard',     icon: '📊' },
  { key: 'Profile',       icon: '👤' },
  { key: 'Language',      icon: '🌐' },
];

const LABEL_KEYS = {
  Home:         'home',
  Products:     'products',
  Cart:         'cart',
  Favorites:    'favorites',
  Testimonials: 'testimonials',
  Contact:      'contact',
  Dashboard:    'dashboard',
  Profile:      'profile',
  Language:     'language',
};

export default function DrawerContent(props) {
  const { navigation, state } = props;
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { getTotalItems } = useCart();
  const [logoError, setLogoError] = useState(false);

  const activeRouteName = state.routeNames[state.index];

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        {logoError ? (
          <View style={[styles.logo, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#1C1C1C' }]}>
            <Text style={{ fontSize: 28 }}>💎</Text>
          </View>
        ) : (
          <Image
            source={require('../assets/logo_joias.png')}
            style={styles.logo}
            onError={() => setLogoError(true)}
            resizeMode="contain"
          />
        )}
        <Text style={styles.brandName}>Aurora Joias</Text>
        {user && (
          <Text style={styles.userEmail} numberOfLines={1}>
            {user.user_metadata?.name || user.email}
          </Text>
        )}
      </View>

      <View style={styles.divider} />

      <ScrollView style={styles.menuList} showsVerticalScrollIndicator={false}>
        {MENU_ITEMS.map(({ key, icon }) => {
          const isActive = activeRouteName === key;
          const cartCount = key === 'Cart' ? getTotalItems() : 0;
          return (
            <TouchableOpacity
              key={key}
              style={[styles.menuItem, isActive && styles.menuItemActive]}
              onPress={() => navigation.navigate(key)}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>{icon}</Text>
              <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                {t(LABEL_KEYS[key])}
              </Text>
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          await logout();
          navigation.navigate('Login');
        }}
        activeOpacity={0.7}
      >
        <Text style={styles.logoutIcon}>🚪</Text>
        <Text style={styles.logoutText}>{t('logout')}</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Aurora Joias v1.0.0</Text>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: 'center',
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  brandName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.secondary,
    letterSpacing: 1,
  },
  userEmail: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 4,
    maxWidth: 180,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  menuList: {
    flex: 1,
    paddingHorizontal: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 2,
  },
  menuItemActive: {
    backgroundColor: Colors.primary + '33',
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  menuIcon: {
    fontSize: 18,
    width: 28,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    marginLeft: 6,
  },
  menuLabelActive: {
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  logoutIcon: {
    fontSize: 18,
    width: 28,
  },
  logoutText: {
    fontSize: 15,
    color: Colors.error,
    marginLeft: 6,
  },
  version: {
    textAlign: 'center',
    color: Colors.textMuted,
    fontSize: 11,
    paddingBottom: 16,
  },
});
