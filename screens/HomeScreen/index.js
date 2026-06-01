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
import { Ionicons } from '@expo/vector-icons';
import { Images } from '../../lib/assets';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';
import styles from './styles';
import { Colors } from '../../lib/colors';

const CATEGORIES = [
  { key: 'relogio', icon: 'time-outline',    label: 'Relógios' },
  { key: 'anel',    icon: 'diamond-outline', label: 'Anéis'    },
  { key: 'cordao',  icon: 'link-outline',    label: 'Cordões'  },
];

const STATS = [
  { number: '500+', label: 'Clientes' },
  { number: '150+', label: 'Produtos'  },
  { number: '5.0',  label: 'Avaliação' },
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
          style={styles.headerBtn}
          onPress={() => navigation.openDrawer()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="menu" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aurora Joias</Text>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation.navigate('Cart')}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="cart-outline" size={24} color={Colors.text} />
          {cartCount > 0 && <View style={styles.cartDot} />}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroTag}>
            <Text style={styles.heroTagText}>{t('exclusiveCollection')}</Text>
          </View>
          <Text style={styles.heroTitle}>
            {t('heroPure')}{'\n'}
            <Text style={styles.heroGold}>{t('heroElegance')}</Text>
          </Text>
          <Text style={styles.heroSubtitle}>{t('heroDescription')}</Text>
          {bannerError ? (
            <View style={[styles.heroImage, { justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.card, borderRadius: 12 }]}>
              <Ionicons name="image-outline" size={48} color={Colors.textMuted} />
            </View>
          ) : (
            <Image
              source={Images.banner}
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
                <Text style={styles.heroBtnTextPrimary}>{t('viewCollection')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.heroBtnWrapper}>
              <TouchableOpacity
                style={styles.heroBtnSecondary}
                onPress={() => navigation.navigate('Testimonials')}
                activeOpacity={0.8}
              >
                <Text style={styles.heroBtnTextSecondary}>{t('testimonials')}</Text>
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
          <Text style={styles.sectionTitle}>{t('categories')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <Text style={styles.seeAll}>{t('viewAll')}</Text>
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
              <Ionicons name={item.icon} size={26} color={Colors.secondary} style={{ marginBottom: 6 }} />
              <Text style={styles.categoryLabel}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
