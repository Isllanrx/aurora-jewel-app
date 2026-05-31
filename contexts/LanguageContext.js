import React, { createContext, useContext, useState } from 'react';
import { translations } from '../lib/i18n';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('pt');

  function t(key) {
    return translations[language]?.[key] ?? key;
  }

  function changeLanguage(lang) {
    if (translations[lang]) {
      setLanguage(lang);
    }
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
