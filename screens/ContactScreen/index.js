import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './styles';

const CONTACTS = [
  { icon: '📍', titleKey: 'address',  textKey: null,  text: 'Rua das Joias, 123\nVila Velha, ES\nCEP: 29100-000' },
  { icon: '📞', titleKey: 'phones',   textKey: null,  text: '(27) 99999-9999\n(27) 3333-3333'                   },
  { icon: '✉️', titleKey: 'emailLabel',textKey: null, text: 'contato@aurorajoias.com.br'                        },
  { icon: '🕐', titleKey: 'hours',    textKey: null,  text: null, keys: ['weekdays','saturday'] },
];

export default function ContactScreen({ navigation }) {
  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Text style={styles.hamburgerIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('contactTitle')}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {CONTACTS.map(({ icon, titleKey, text, keys }) => (
          <View key={titleKey} style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.cardIcon}>{icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{t(titleKey)}</Text>
                <Text style={styles.cardText}>
                  {keys ? keys.map(k => t(k)).join('\n') : text}
                </Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapIcon}>🗺️</Text>
          <Text style={styles.mapText}>Mapa — integre com expo-location</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
