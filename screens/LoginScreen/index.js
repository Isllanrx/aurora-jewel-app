import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Images } from '../../lib/assets';
import styles from './styles';
import { Colors } from '../../lib/colors';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit({ email, password }) {
    setErrorMsg(null);
    setLoading(true);
    try {
      await login(email, password);
      navigation.replace('Main');
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.logoWrapper}>
          {logoError ? (
            <View style={[styles.logo, { justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.card, borderRadius: 45 }]}>
              <Ionicons name="diamond-outline" size={36} color={Colors.secondary} />
            </View>
          ) : (
            <Image
              source={Images.logo}
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
        <Controller
          control={control}
          name="email"
          rules={{
            required: t('required'),
            pattern: { value: EMAIL_REGEX, message: t('invalidEmail') },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="seu@email.com"
              placeholderTextColor={Colors.textMuted}
              autoCapitalize="none"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        <Text style={styles.label}>{t('password')}</Text>
        <Controller
          control={control}
          name="password"
          rules={{
            required: t('required'),
            minLength: { value: 6, message: t('passwordMin') },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="••••••••"
              placeholderTextColor={Colors.textMuted}
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

        {errorMsg && (
          <View style={styles.banner}>
            <Ionicons name="alert-circle" size={18} color={Colors.white} />
            <Text style={styles.bannerText}>{errorMsg}</Text>
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
