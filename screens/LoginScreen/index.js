import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './styles';
import { Colors } from '../../lib/colors';

function buildSchema(t) {
  return Yup.object({
    email: Yup.string().email(t('invalidEmail')).required(t('required')),
    password: Yup.string().min(6, t('passwordMin')).required(t('required')),
  });
}

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const { t } = useLanguage();
  const [loading,  setLoading]  = useState(false);
  const [logoError, setLogoError] = useState(false);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: buildSchema(t),
    onSubmit: async ({ email, password }) => {
      setLoading(true);
      try {
        await login(email, password);
        navigation.replace('Main');
      } catch (err) {
        Alert.alert(t('error'), err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = formik;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.logoWrapper}>
          {logoError ? (
            <View style={[styles.logo, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#1C1C1C', borderRadius: 45 }]}>
              <Text style={{ fontSize: 36 }}>💎</Text>
            </View>
          ) : (
            <Image
              source={require('../../assets/logo_joias.png')}
              style={styles.logo}
              resizeMode="contain"
              onError={() => setLogoError(true)}
            />
          )}
          <Text style={styles.brandName}>Aurora Joias</Text>
          <Text style={styles.tagline}>Elegância e Sofisticação</Text>
        </View>

        <Text style={styles.title}>{t('loginTitle')}</Text>
        <Text style={styles.subtitle}>{t('loginSubtitle')}</Text>

        <Text style={styles.label}>{t('email')}</Text>
        <TextInput
          style={[styles.input, touched.email && errors.email && styles.inputError]}
          placeholder="seu@email.com"
          placeholderTextColor={Colors.textMuted}
          autoCapitalize="none"
          keyboardType="email-address"
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
        />
        {touched.email && errors.email && (
          <Text style={styles.errorText}>{errors.email}</Text>
        )}

        <Text style={styles.label}>{t('password')}</Text>
        <TextInput
          style={[styles.input, touched.password && errors.password && styles.inputError]}
          placeholder="••••••••"
          placeholderTextColor={Colors.textMuted}
          secureTextEntry
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
        />
        {touched.password && errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading
            ? <ActivityIndicator color={Colors.white} />
            : <Text style={styles.buttonText}>{t('login')}</Text>
          }
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>{t('noAccount')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>{t('register')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
