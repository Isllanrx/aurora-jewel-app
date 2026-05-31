import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../lib/colors';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import DrawerContent from './DrawerContent';

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
      style={styles.headerBtn}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons name="menu" size={24} color={Colors.text} />
    </TouchableOpacity>
  );
}

function CartButton({ navigation }) {
  const { getTotalItems } = useCart();
  const count = getTotalItems();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={styles.headerBtn}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons name="cart-outline" size={24} color={Colors.text} />
      {count > 0 && (
        <View style={styles.cartBadge}>
          <Ionicons name="ellipse" size={6} color={Colors.primary} />
        </View>
      )}
    </TouchableOpacity>
  );
}

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
  headerBtn: {
    padding: 4,
    marginHorizontal: 14,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
