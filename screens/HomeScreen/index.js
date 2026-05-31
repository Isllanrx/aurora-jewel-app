import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';
import styles from './styles';

const CATEGORIES = [
  { key: 'relogio', icon: '⌚', label: 'Relógios' },
  { key: 'anel',    icon: '💍', label: 'Anéis'    },
  { key: 'cordao',  icon: '📿', label: 'Cordões'  },
];

const STATS = [
  { number: '500+',  label: 'Clientes Felizes' },
  { number: '150+',  label: 'Produtos Exclusivos' },
  { number: '5★',    label: 'Avaliação Média' },
];

export default function HomeScreen({ navigation }) {
  const { t } = useLanguage();
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();
  const [bannerError, setBannerError] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.hamburger}
          onPress={() => navigation.openDrawer()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.hamburgerIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aurora Joias</Text>
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => navigation.navigate('Cart')}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View style={styles.cartBadgeWrap}>
            <Text style={styles.cartIcon}>🛒</Text>
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroTag}>
            <Text style={styles.heroTagText}>✦ Coleção Exclusiva</Text>
          </View>
          <Text style={styles.heroTitle}>
            Pura{'\n'}
            <Text style={styles.heroGold}>Elegância</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            Descubra peças únicas que unem tradição artesanal e design contemporâneo.
          </Text>
          {bannerError ? (
            <View style={[styles.heroImage, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#1C1C1C', borderRadius: 12 }]}>
              <Text style={{ fontSize: 64 }}>⌚</Text>
            </View>
          ) : (
            <Image
              source={require('../../assets/orient_banner-removebg-preview.png')}
              style={styles.heroImage}
              resizeMode="contain"
              onError={() => setBannerError(true)}
            />
          )}
          <View style={styles.heroButtons}>
            <View style={styles.heroBtnWrapper}>
              <TouchableOpacity
                style={styles.heroBtnPrimary}
                onPress={() => navigation.navigate('Products')}
                activeOpacity={0.8}
              >
                <Text style={styles.heroBtnTextPrimary}>Ver Coleção</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.heroBtnWrapper}>
              <TouchableOpacity
                style={styles.heroBtnSecondary}
                onPress={() => navigation.navigate('Testimonials')}
                activeOpacity={0.8}
              >
                <Text style={styles.heroBtnTextSecondary}>Depoimentos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {STATS.map(({ number, label }) => (
            <View key={label} style={styles.statCard}>
              <Text style={styles.statNumber}>{number}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <Text style={styles.seeAll}>Ver todos →</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.key}
          contentContainerStyle={styles.categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => navigation.navigate('Products', { category: item.key })}
              activeOpacity={0.7}
            >
              <Text style={styles.categoryIcon}>{item.icon}</Text>
              <Text style={styles.categoryLabel}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
