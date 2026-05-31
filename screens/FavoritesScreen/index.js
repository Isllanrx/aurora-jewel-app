import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { dbSelect } from '../../lib/supabase';
import { Images } from '../../lib/assets';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import ProductCard from '../../components/ProductCard';
import styles from './styles';
import { Colors } from '../../lib/colors';

const CATEGORY_IMAGES = {
  relogio: Images.relogio,
  anel:    Images.anel,
  cordao:  Images.cordao,
};

export default function FavoritesScreen({ navigation }) {
  const { user, token } = useAuth();
  const { t } = useLanguage();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    try {
      const rows = await dbSelect('favorites', { 'user_id': `eq.${user.id}` }, token);
      const productIds = rows.map(r => r.product_id);
      if (productIds.length === 0) { setFavorites([]); return; }
      const products = await dbSelect(
        'products',
        { 'id': `in.(${productIds.join(',')})` },
        token
      );
      setFavorites(products);
    } catch (err) {
      console.warn('FavoritesScreen fetch:', err.message);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, [user, token]);

  useEffect(() => { fetchFavorites(); }, [fetchFavorites]);

  function getImage(product) {
    if (product.image_url) return { uri: product.image_url };
    return CATEGORY_IMAGES[product.category] ?? CATEGORY_IMAGES.relogio;
  }

  if (loading) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('myFavorites')}</Text>
        <View style={{ width: 28 }} />
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyWrapper}>
          <Ionicons name="heart-outline" size={64} color={Colors.textMuted} style={{ marginBottom: 12 }} />
          <Text style={styles.emptyText}>{t('emptyFavorites')}</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Products')}
            activeOpacity={0.8}
          >
            <Text style={styles.shopButtonText}>{t('continueShopping')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => String(item.id)}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              product={{ ...item, imageSource: getImage(item) }}
              onPress={() =>
                navigation.navigate('ProductDetail', {
                  product: { ...item, imageSource: getImage(item) },
                })
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
