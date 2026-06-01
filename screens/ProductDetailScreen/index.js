import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryBadge from "../../components/CategoryBadge";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { Colors } from "../../lib/colors";
import { dbDelete, dbInsert, dbSelect } from "../../lib/supabase";
import styles from "./styles";

export default function ProductDetailScreen({ navigation, route }) {
  const { product } = route.params;
  const { addToCart } = useCart();
  const { user, token } = useAuth();
  const { t } = useLanguage();

  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    async function loadFavoriteStatus() {
      if (!user) return;
      try {
        const rows = await dbSelect("favorites", { user_id: `eq.${user.id}`, product_id: `eq.${product.id}` }, token);
        setIsFav(rows.length > 0);
      } catch (err) {
        console.warn("loadFavoriteStatus:", err.message);
      }
    }
    loadFavoriteStatus();
  }, [user, product.id, token]);

  async function addFavorite() {
    await dbInsert("favorites", { user_id: user.id, product_id: product.id }, token);
    setIsFav(true);
  }

  async function removeFavorite() {
    await dbDelete("favorites", { user_id: user.id, product_id: product.id }, token);
    setIsFav(false);
  }

  async function handleFavToggle() {
    if (!user) {
      const title = t("loginRequired");
      const msg = t("loginRequiredMsg");
      if (Platform.OS === "web") {
        window.alert(`${title}: ${msg}`);
      } else {
        Alert.alert(title, msg);
      }
      return;
    }
    setFavLoading(true);
    try {
      if (isFav) await removeFavorite();
      else await addFavorite();
    } catch (err) {
      Alert.alert(t("error"), err.message);
    } finally {
      setFavLoading(false);
    }
  }

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function formatBRL(value) {
    return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {product.name}
        </Text>
        <TouchableOpacity style={styles.headerBtn} onPress={handleFavToggle} disabled={favLoading}>
          {favLoading ? <ActivityIndicator size="small" color={Colors.primary} /> : <Ionicons name={isFav ? "heart" : "heart-outline"} size={22} color={isFav ? Colors.error : Colors.text} />}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrapper}>
          {imgError ? (
            <View style={[styles.image, { justifyContent: "center", alignItems: "center", backgroundColor: Colors.surface }]}>
              <Ionicons name="image-outline" size={48} color={Colors.textMuted} />
            </View>
          ) : (
            <Image source={product.imageSource ?? { uri: product.image_url }} style={styles.image} resizeMode="contain" onError={() => setImgError(true)} />
          )}
          {product.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{product.badge}</Text>
            </View>
          )}
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatBRL(product.price)}</Text>
            {product.original_price && (
              <>
                <View style={styles.priceGap} />
                <Text style={styles.originalPrice}>{formatBRL(product.original_price)}</Text>
              </>
            )}
          </View>

          <CategoryBadge category={product.category} />

          <View style={styles.divider} />
          <Text style={styles.descTitle}>{t("description")}</Text>
          <Text style={styles.description}>{product.description ?? t("defaultProductDesc")}</Text>
          <View style={{ height: 16 }} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.addButton, added && styles.addButtonDisabled]} onPress={handleAddToCart} disabled={added} activeOpacity={0.8}>
          <Text style={styles.addButtonText}>{added ? t("addedToCart") : t("addToCart")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
