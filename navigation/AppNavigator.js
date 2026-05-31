import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Colors } from '../lib/colors';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import DrawerContent from './DrawerContent';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TestimonialsScreen from '../screens/TestimonialsScreen';
import ContactScreen from '../screens/ContactScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LanguageScreen from '../screens/LanguageScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HamburgerButton({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={styles.hamburger}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Text style={styles.hamburgerIcon}>☰</Text>
    </TouchableOpacity>
  );
}

function CartButton({ navigation }) {
  const { getTotalItems } = useCart();
  const count = getTotalItems();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={styles.cartBtn}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Text style={styles.cartIcon}>🛒</Text>
      {count > 0 && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const SCREEN_OPTIONS = (navigation) => ({
  headerStyle: { backgroundColor: Colors.surface },
  headerTintColor: Colors.text,
  headerTitleStyle: { color: Colors.secondary, fontWeight: 'bold', fontSize: 18 },
  headerLeft: () => <HamburgerButton navigation={navigation} />,
  headerRight: () => <CartButton navigation={navigation} />,
});

function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: Colors.surface, width: 260 },
      }}
    >
      <Drawer.Screen name="Home"          component={HomeScreen} />
      <Drawer.Screen name="Products"      component={ProductsScreen} />
      <Drawer.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Drawer.Screen name="Cart"          component={CartScreen} />
      <Drawer.Screen name="Favorites"     component={FavoritesScreen} />
      <Drawer.Screen name="Dashboard"     component={DashboardScreen} />
      <Drawer.Screen name="Testimonials"  component={TestimonialsScreen} />
      <Drawer.Screen name="Contact"       component={ContactScreen} />
      <Drawer.Screen name="Profile"       component={ProfileScreen} />
      <Drawer.Screen name="Language"      component={LanguageScreen} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={user ? 'Main' : 'Login'}
    >
      <Stack.Screen name="Login"    component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main"     component={MainDrawer} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  hamburger: {
    marginLeft: 14,
    padding: 4,
  },
  hamburgerIcon: {
    fontSize: 22,
    color: Colors.text,
  },
  cartBtn: {
    marginRight: 14,
    padding: 4,
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
});
