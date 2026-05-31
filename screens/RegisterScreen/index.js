import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './styles';
import { Colors } from '../../lib/colors';

function buildSchema(t) {
  return Yup.object({
    name:  Yup.string().min(2).required(t('required')),
    email: Yup.string().email(t('invalidEmail')).required(t('required')),
    phone: Yup.string()
      .matches(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, t('phoneInvalid'))
      .required(t('required')),
    password:        Yup.string().min(6, t('passwordMin')).required(t('required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('passwordMatch'))
      .required(t('required')),
  });
}

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { name: '', email: '', phone: '', password: '', confirmPassword: '' },
    validationSchema: buildSchema(t),
    onSubmit: async ({ email, password, name, phone }) => {
      setLoading(true);
      try {
        await register(email, password, name, phone);
        Alert.alert(t('success'), 'Conta criada. Verifique seu e-mail.', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } catch (err) {
        Alert.alert(t('error'), err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = formik;

  function Field({ label, fieldName, placeholder, keyboardType, secureTextEntry, autoCapitalize, required }) {
    return (
      <>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
        <TextInput
          style={[styles.input, touched[fieldName] && errors[fieldName] && styles.inputError]}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize ?? 'none'}
          value={values[fieldName]}
          onChangeText={handleChange(fieldName)}
          onBlur={handleBlur(fieldName)}
        />
        {touched[fieldName] && errors[fieldName] && (
          <Text style={styles.errorText}>{errors[fieldName]}</Text>
        )}
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={Colors.secondary} />
          <Text style={styles.backText}>{t('back')}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{t('registerTitle')}</Text>
        <Text style={styles.subtitle}>{t('registerSubtitle')}</Text>

        <Field label={t('name')}            fieldName="name"            placeholder="Seu nome completo" autoCapitalize="words" required />
        <Field label={t('email')}           fieldName="email"           placeholder="seu@email.com"     keyboardType="email-address" required />
        <Field label={t('phone')}           fieldName="phone"           placeholder="(27) 99999-9999"   keyboardType="phone-pad" required />
        <Field label={t('password')}        fieldName="password"        placeholder="••••••••"          secureTextEntry required />
        <Field label={t('confirmPassword')} fieldName="confirmPassword" placeholder="••••••••"          secureTextEntry required />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading
            ? <ActivityIndicator color={Colors.white} />
            : <Text style={styles.buttonText}>{t('register')}</Text>
          }
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>{t('hasAccount')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>{t('login')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
