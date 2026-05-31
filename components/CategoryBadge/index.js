import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const LABELS = { relogio: 'Relógio', anel: 'Anel', cordao: 'Cordão' };

export default function CategoryBadge({ category }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{LABELS[category] ?? category}</Text>
    </View>
  );
}
