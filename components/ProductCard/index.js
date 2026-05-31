import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './styles';
import { Colors } from '../../lib/colors';

const CATEGORY_ICONS = { relogio: '⌚', anel: '💍', cordao: '📿' };

export default function ProductCard({ product, onPress }) {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [added,    setAdded]    = useState(false);
  const [imgError, setImgError] = useState(false);

  function handleAdd(e) {
    e.stopPropagation?.();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function formatBRL(value) {
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imageWrapper}>
        {imgError ? (
          <View style={[styles.image, styles.imgFallback]}>
            <Text style={styles.imgFallbackIcon}>
              {CATEGORY_ICONS[product.category] ?? '💎'}
            </Text>
          </View>
        ) : (
          <Image
            source={product.imageSource ?? { uri: product.image_url }}
            style={styles.image}
            resizeMode="contain"
            onError={() => setImgError(true)}
          />
        )}
        {product.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.price}>{formatBRL(product.price)}</Text>
        {product.original_price && (
          <Text style={styles.originalPrice}>{formatBRL(product.original_price)}</Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.addBtn, added && styles.addBtnAdded]}
        onPress={handleAdd}
        activeOpacity={0.8}
      >
        <Text style={styles.addBtnText}>
          {added ? `✓ OK` : `+ ${t('addToCart')}`}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
