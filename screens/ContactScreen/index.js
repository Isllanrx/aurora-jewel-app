import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './styles';
import { Colors } from '../../lib/colors';

const CONTACTS = [
  { ionIcon: 'location-outline', titleKey: 'address',   text: 'Rua das Joias, 123\nVila Velha, ES\nCEP: 29100-000' },
  { ionIcon: 'call-outline',     titleKey: 'phones',    text: '(27) 99999-9999\n(27) 3333-3333'                   },
  { ionIcon: 'mail-outline',     titleKey: 'emailLabel',text: 'contato@aurorajoias.com.br'                        },
  { ionIcon: 'time-outline',     titleKey: 'hours',     keys: ['weekdays', 'saturday']                            },
];

export default function ContactScreen({ navigation }) {
  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('contactTitle')}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {CONTACTS.map(({ ionIcon, titleKey, text, keys }) => (
          <View key={titleKey} style={styles.card}>
            <View style={styles.cardRow}>
              <Ionicons name={ionIcon} size={22} color={Colors.secondary} style={styles.cardIcon} />
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
          <Ionicons name="map-outline" size={40} color={Colors.textMuted} />
          <Text style={styles.mapText}>Mapa — integre com expo-location</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
