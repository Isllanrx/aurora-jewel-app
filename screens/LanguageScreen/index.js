import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './styles';
import { Colors } from '../../lib/colors';

const LANGUAGES = [
  { code: 'pt', label: 'PT', nameKey: 'portuguese', nativeName: 'Português' },
  { code: 'en', label: 'EN', nameKey: 'english',    nativeName: 'English'   },
  { code: 'es', label: 'ES', nameKey: 'spanish',    nativeName: 'Español'   },
];

export default function LanguageScreen({ navigation }) {
  const { language, changeLanguage, t } = useLanguage();
  const [selected,    setSelected]    = useState(language);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleSave() {
    changeLanguage(selected);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('languageTitle')}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          Selecione o idioma do aplicativo
        </Text>

        {LANGUAGES.map(({ code, label, nameKey, nativeName }) => {
          const isActive = selected === code;
          return (
            <TouchableOpacity
              key={code}
              style={[styles.option, isActive && styles.optionActive]}
              onPress={() => setSelected(code)}
              activeOpacity={0.7}
            >
              <View style={[styles.langCode, isActive && styles.langCodeActive]}>
                <Text style={[styles.langCodeText, isActive && styles.langCodeTextActive]}>
                  {label}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.langName, isActive && styles.langNameActive]}>
                  {t(nameKey)}
                </Text>
                <Text style={styles.langNative}>{nativeName}</Text>
              </View>
              {isActive && (
                <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
              )}
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveBtnText}>{t('save')}</Text>
        </TouchableOpacity>

        {showSuccess && (
          <Text style={styles.successMsg}>{t('languageSaved')}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
