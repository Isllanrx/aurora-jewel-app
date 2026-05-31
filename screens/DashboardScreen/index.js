import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

// Largura máxima da barra em pixels (evita % dinâmico que quebra no Snack web)
const BAR_MAX = Dimensions.get('window').width - 80;
import { SafeAreaView } from 'react-native-safe-area-context';
import { dbSelect } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './styles';
import { Colors } from '../../lib/colors';

const CATEGORY_ICONS  = { relogio: '⌚', anel: '💍', cordao: '📿' };
const CATEGORY_LABELS = { relogio: 'Relógios', anel: 'Anéis', cordao: 'Cordões' };

export default function DashboardScreen({ navigation }) {
  const { token } = useAuth();
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    byCategory: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);
    try {
      // GET de produtos (público)
      const products = await dbSelect('products');

      // GET de perfis de usuários (requer token)
      const profiles = await dbSelect('profiles', {}, token);

      // Agrupa produtos por categoria
      const catMap = {};
      for (const p of products) {
        catMap[p.category] = (catMap[p.category] ?? 0) + 1;
      }

      const byCategory = Object.entries(catMap).map(([cat, count]) => ({
        category: cat,
        count,
        icon:  CATEGORY_ICONS[cat]  ?? '💎',
        label: CATEGORY_LABELS[cat] ?? cat,
      }));

      setStats({
        totalUsers:    profiles.length,
        totalProducts: products.length,
        byCategory,
      });
    } catch (err) {
      console.warn('Dashboard fetchStats:', err.message);
    } finally {
      setLoading(false);
    }
  }

  const maxCount = Math.max(...stats.byCategory.map(c => c.count), 1);

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
          <Text style={styles.hamburgerIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('dashboardTitle')}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>👥</Text>
          <View>
            <Text style={styles.statNumber}>{stats.totalUsers}</Text>
            <Text style={styles.statLabel}>{t('totalUsers')}</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>💎</Text>
          <View>
            <Text style={styles.statNumber}>{stats.totalProducts}</Text>
            <Text style={styles.statLabel}>{t('totalProducts')}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{t('productsByCategory')}</Text>

        {stats.byCategory.length === 0
          ? <Text style={{ color: Colors.textMuted }}>Sem dados no momento</Text>
          : stats.byCategory.map(({ category, count, icon, label }) => (
              <View key={category} style={styles.categoryRow}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryName}>{icon} {label}</Text>
                  <Text style={styles.categoryCount}>{count}</Text>
                </View>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      { width: Math.round((count / maxCount) * BAR_MAX) },
                    ]}
                  />
                </View>
              </View>
            ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}
