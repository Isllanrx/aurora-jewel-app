import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { dbSelect } from '../../lib/supabase';
import { Images } from '../../lib/assets';
import { useLanguage } from '../../contexts/LanguageContext';
import ProductCard from '../../components/ProductCard';
import styles from './styles';
import { Colors } from '../../lib/colors';

const LOCAL_PRODUCTS = [
  { id: '1', name: 'Relógio Orient SolarTech', price: 1599, original_price: 1999, image_url: null, category: 'relogio', badge: '-20%',  description: 'Tecnologia solar avançada com 5 anos de garantia.' },
  { id: '2', name: 'Anel Pandora Signature',   price: 4600, original_price: 5800, image_url: null, category: 'anel',    badge: 'Novo',   description: 'Anel em prata esterlina com acabamento em ouro rosé.' },
  { id: '3', name: 'Cordão Swarovski Crystal', price: 13765,original_price:17200, image_url: null, category: 'cordao',  badge: '-25%',   description: 'Cristais lapidados à mão com corrente banhada a ouro.' },
  { id: '4', name: 'Relógio Seiko Presage',    price: 3499, original_price: null, image_url: null, category: 'relogio', badge: null,     description: 'Movimento automático japonês de alta precisão.' },
  { id: '5', name: 'Anel Pandora Timeless',    price: 568,  original_price: null, image_url: null, category: 'anel',    badge: null,     description: 'Design minimalista, perfeito para o dia a dia.' },
  { id: '6', name: 'Cordão Vivara Gold',       price: 3000, original_price: null, image_url: null, category: 'cordao',  badge: null,     description: 'Ouro 18k com certificação de autenticidade.' },
];

const CATEGORY_IMAGES = {
  relogio: Images.relogio,
  anel:    Images.anel,
  cordao:  Images.cordao,
};

export default function ProductsScreen({ navigation, route }) {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState(route.params?.category ?? 'all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilter(category, products);
  }, [category, products]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const data = await dbSelect('products');
      setProducts(data.length > 0 ? data : LOCAL_PRODUCTS);
    } catch (err) {
      console.warn('ProductsScreen fetch:', err.message);
      setProducts(LOCAL_PRODUCTS);
    } finally {
      setLoading(false);
    }
  }

  function applyFilter(cat, list) {
    setFiltered(cat === 'all' ? list : list.filter(p => p.category === cat));
  }

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
        <Text style={styles.headerTitle}>{t('products')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>{t('filterCategory')}</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={category}
            onValueChange={val => setCategory(val)}
            style={styles.picker}
            dropdownIconColor={Colors.secondary}
          >
            <Picker.Item label={t('allCategories')} value="all" />
            <Picker.Item label={t('watches')}       value="relogio" />
            <Picker.Item label={t('rings')}         value="anel" />
            <Picker.Item label={t('necklaces')}     value="cordao" />
          </Picker>
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{t('noProducts')}</Text>
        }
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
    </SafeAreaView>
  );
}
