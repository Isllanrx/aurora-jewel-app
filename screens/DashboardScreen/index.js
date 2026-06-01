import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { Colors } from "../../lib/colors";
import { dbRpc, dbSelect } from "../../lib/supabase";
import styles from "./styles";

const BAR_MAX = Dimensions.get("window").width - 80;

export default function DashboardScreen({ navigation }) {
  const { token } = useAuth();
  const { t } = useLanguage();

  const CATEGORY_LABELS = { relogio: t("watches"), anel: t("rings"), cordao: t("necklaces") };
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
      const [products, userCount] = await Promise.all([dbSelect("products"), dbRpc("get_user_count")]);

      const catMap = {};
      for (const p of products) {
        catMap[p.category] = (catMap[p.category] ?? 0) + 1;
      }

      const byCategory = Object.entries(catMap).map(([cat, count]) => ({
        category: cat,
        count,
        label: CATEGORY_LABELS[cat] ?? cat,
      }));

      setStats({
        totalUsers: Number(userCount) || 0,
        totalProducts: products.length,
        byCategory,
      });
    } catch (err) {
      console.warn("Dashboard fetchStats:", err.message);
    } finally {
      setLoading(false);
    }
  }

  const maxCount = Math.max(...stats.byCategory.map((c) => c.count), 1);

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
        <Text style={styles.headerTitle}>{t("dashboardTitle")}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.statCard}>
          <Ionicons name="people-outline" size={36} color={Colors.secondary} style={styles.statIcon} />
          <View>
            <Text style={styles.statNumber}>{stats.totalUsers}</Text>
            <Text style={styles.statLabel}>{t("totalUsers")}</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="grid-outline" size={36} color={Colors.secondary} style={styles.statIcon} />
          <View>
            <Text style={styles.statNumber}>{stats.totalProducts}</Text>
            <Text style={styles.statLabel}>{t("totalProducts")}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{t("productsByCategory")}</Text>

        {stats.byCategory.length === 0 ? (
          <Text style={{ color: Colors.textMuted }}>Sem dados no momento</Text>
        ) : (
          stats.byCategory.map(({ category, count, label }) => (
            <View key={category} style={styles.categoryRow}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryName}>{label}</Text>
                <Text style={styles.categoryCount}>{count}</Text>
              </View>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: Math.round((count / maxCount) * BAR_MAX) }]} />
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
