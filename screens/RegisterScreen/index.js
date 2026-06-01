import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './styles';
import { Colors } from '../../lib/colors';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LANG_CYCLE = ['pt', 'en', 'es'];
const LANG_LABEL = { pt: 'PT', en: 'EN', es: 'ES' };

function getFriendlyError(rawMessage, t) {
  const msg = (rawMessage ?? '').toLowerCase();
  if (msg.includes('already registered') || msg.includes('already been registered') || msg.includes('user already exists')) {
    return t('registerEmailUsed');
  }
  if (msg.includes('invalid') || msg.includes('weak password')) {
    return t('genericAuthError');
  }
  return t('genericAuthError');
}

function Field({ control, errors, name, label, placeholder, keyboardType, secureTextEntry, autoCapitalize, rules, required }) {
  return (
    <>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors[name] && styles.inputError]}
            placeholder={placeholder}
            placeholderTextColor={Colors.textMuted}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize ?? 'none'}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {errors[name] && (
        <Text style={styles.errorText}>{errors[name].message}</Text>
      )}
    </>
  );
}

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const { t, language, changeLanguage } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', email: '', phone: '', password: '', confirmPassword: '' },
  });

  const passwordValue = watch('password');

  function validatePhone(value) {
    const digits = value.replace(/\D/g, '');
    return (digits.length === 10 || digits.length === 11) || t('phoneInvalid');
  }

  function cycleLang() {
    const idx = LANG_CYCLE.indexOf(language);
    const next = LANG_CYCLE[(idx + 1) % LANG_CYCLE.length];
    changeLanguage(next);
  }

  async function onSubmit({ email, password, name, phone }) {
    setFeedback(null);
    setLoading(true);
    try {
      await register(email, password, name, phone);
      setFeedback({ type: 'success', text: t('registerSuccessMsg') });
      setTimeout(() => navigation.navigate('Login'), 2500);
    } catch (err) {
      setFeedback({ type: 'error', text: getFriendlyError(err.message, t) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color={Colors.secondary} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.langBtn} onPress={cycleLang} activeOpacity={0.7}>
            <Ionicons name="globe-outline" size={14} color={Colors.secondary} />
            <Text style={styles.langBtnText}>{LANG_LABEL[language]}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{t('registerTitle')}</Text>
        <Text style={styles.subtitle}>{t('registerSubtitle')}</Text>

        <Field
          control={control}
          errors={errors}
          name="name"
          label={t('name')}
          placeholder="Seu nome completo"
          autoCapitalize="words"
          rules={{ required: t('required'), minLength: { value: 2, message: 'Mínimo 2 caracteres' } }}
          required
        />
        <Field
          control={control}
          errors={errors}
          name="email"
          label={t('email')}
          placeholder="seu@email.com"
          keyboardType="email-address"
          rules={{ required: t('required'), pattern: { value: EMAIL_REGEX, message: t('invalidEmail') } }}
          required
        />
        <Field
          control={control}
          errors={errors}
          name="phone"
          label={t('phone')}
          placeholder="(27) 99999-9999"
          keyboardType="phone-pad"
          rules={{ required: t('required'), validate: validatePhone }}
          required
        />
        <Field
          control={control}
          errors={errors}
          name="password"
          label={t('password')}
          placeholder="••••••••"
          secureTextEntry
          rules={{ required: t('required'), minLength: { value: 6, message: t('passwordMin') } }}
          required
        />
        <Field
          control={control}
          errors={errors}
          name="confirmPassword"
          label={t('confirmPassword')}
          placeholder="••••••••"
          secureTextEntry
          rules={{
            required: t('required'),
            validate: v => v === passwordValue || t('passwordMatch'),
          }}
          required
        />

        {feedback && (
          <View style={[styles.banner, feedback.type === 'success' ? styles.bannerSuccess : styles.bannerError]}>
            <Ionicons
              name={feedback.type === 'success' ? 'checkmark-circle' : 'alert-circle'}
              size={18}
              color={Colors.white}
            />
            <Text style={styles.bannerText}>{feedback.text}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
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
