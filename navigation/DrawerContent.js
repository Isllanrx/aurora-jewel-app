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
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../lib/colors';
import { Images } from '../lib/assets';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

const MENU_ITEMS = [
  { key: 'Home',         icon: 'home-outline',       labelKey: 'home'         },
  { key: 'Products',     icon: 'grid-outline',        labelKey: 'products'     },
  { key: 'Cart',         icon: 'cart-outline',        labelKey: 'cart'         },
  { key: 'Favorites',    icon: 'heart-outline',       labelKey: 'favorites'    },
  { key: 'Testimonials', icon: 'chatbubbles-outline', labelKey: 'testimonials' },
  { key: 'Contact',      icon: 'location-outline',    labelKey: 'contact'      },
  { key: 'Dashboard',    icon: 'stats-chart-outline', labelKey: 'dashboard'    },
  { key: 'Profile',      icon: 'person-outline',      labelKey: 'profile'      },
  { key: 'Language',     icon: 'globe-outline',       labelKey: 'language'     },
];

export default function DrawerContent(props) {
  const { navigation, state } = props;
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { getTotalItems } = useCart();
  const [logoError, setLogoError] = useState(false);

  const activeRouteName = state.routeNames[state.index];
  const cartCount = getTotalItems();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        {logoError ? (
          <View style={styles.logoFallback}>
            <Ionicons name="diamond-outline" size={28} color={Colors.secondary} />
          </View>
        ) : (
          <Image
            source={Images.logo}
            style={styles.logo}
            resizeMode="contain"
            onError={() => setLogoError(true)}
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
        {MENU_ITEMS.map(({ key, icon, labelKey }) => {
          const isActive = activeRouteName === key;
          const showBadge = key === 'Cart' && cartCount > 0;
          return (
            <TouchableOpacity
              key={key}
              style={[styles.menuItem, isActive && styles.menuItemActive]}
              onPress={() => navigation.navigate(key)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={icon}
                size={18}
                color={isActive ? Colors.secondary : Colors.textMuted}
                style={styles.menuIcon}
              />
              <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                {t(labelKey)}
              </Text>
              {showBadge && (
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
          try {
            await logout();
          } finally {
            navigation.navigate('Login');
          }
        }}
        activeOpacity={0.7}
      >
        <Ionicons name="log-out-outline" size={18} color={Colors.error} style={styles.menuIcon} />
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
  logoFallback: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: Colors.primary + '22',
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  menuIcon: {
    width: 26,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    marginLeft: 6,
  },
  menuLabelActive: {
    color: Colors.secondary,
    fontWeight: '600',
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
