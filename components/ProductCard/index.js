import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../../contexts/CartContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { Colors } from "../../lib/colors";
import styles from "./styles";

const CATEGORY_ICONS = {
  relogio: "time-outline",
  anel: "diamond-outline",
  cordao: "link-outline",
};

export default function ProductCard({ product, onPress }) {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  function handleAdd(e) {
    e.stopPropagation?.();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function formatBRL(value) {
    return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imageWrapper}>
        {imgError ? (
          <View style={[styles.image, styles.imgFallback]}>
            <Ionicons name={CATEGORY_ICONS[product.category] ?? "image-outline"} size={40} color={Colors.textMuted} />
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
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>{formatBRL(product.price)}</Text>
        {product.original_price && <Text style={styles.originalPrice}>{formatBRL(product.original_price)}</Text>}
      </View>

      <TouchableOpacity style={[styles.addBtn, added && styles.addBtnAdded]} onPress={handleAdd} activeOpacity={0.8}>
        <Text style={styles.addBtnText}>{added ? t("addedToCart") : `+ ${t("addToCart")}`}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
