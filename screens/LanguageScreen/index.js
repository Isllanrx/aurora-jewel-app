import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './styles';

const LANGUAGES = [
  { code: 'pt', flag: '🇧🇷', nameKey: 'portuguese' },
  { code: 'en', flag: '🇺🇸', nameKey: 'english'    },
  { code: 'es', flag: '🇪🇸', nameKey: 'spanish'    },
];

export default function LanguageScreen({ navigation }) {
  const { language, changeLanguage, t } = useLanguage();
  const [selected,  setSelected]  = useState(language);
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
          <Text style={styles.hamburgerIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('languageTitle')}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          Selecione o idioma do aplicativo
        </Text>

        {LANGUAGES.map(({ code, flag, nameKey }) => {
          const isActive = selected === code;
          return (
            <TouchableOpacity
              key={code}
              style={[styles.option, isActive && styles.optionActive]}
              onPress={() => setSelected(code)}
              activeOpacity={0.7}
            >
              <Text style={styles.flag}>{flag}</Text>
              <Text style={[styles.langName, isActive && styles.langNameActive]}>
                {t(nameKey)}
              </Text>
              {isActive && <Text style={styles.checkmark}>✓</Text>}
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
          <Text style={styles.successMsg}>✓ {t('languageSaved')}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
