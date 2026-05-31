import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../contexts/CartContext';
import styles from './styles';
import { Colors } from '../../lib/colors';

const CATEGORY_ICONS = {
  relogio: 'time-outline',
  anel:    'diamond-outline',
  cordao:  'link-outline',
};

const CATEGORY_IMAGES = {
  relogio: require('../../assets/relogio.png'),
  anel:    require('../../assets/anel.png'),
  cordao:  require('../../assets/cordao.png'),
};

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const [imgError, setImgError] = useState(false);

  function formatBRL(value) {
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  const imageSource = item.imageSource
    ?? (item.image_url ? { uri: item.image_url } : CATEGORY_IMAGES[item.category] ?? CATEGORY_IMAGES.relogio);

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        {imgError ? (
          <View style={[styles.image, { justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.surface }]}>
            <Ionicons
              name={CATEGORY_ICONS[item.category] ?? 'image-outline'}
              size={28}
              color={Colors.textMuted}
            />
          </View>
        ) : (
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="contain"
            onError={() => setImgError(true)}
          />
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.price}>{formatBRL(item.price)}</Text>
        <Text style={styles.subtotal}>
          Subtotal: {formatBRL(item.price * item.quantity)}
        </Text>

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => removeFromCart(item.id)}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Ionicons name="trash-outline" size={18} color={Colors.error} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
