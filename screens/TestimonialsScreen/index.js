import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dbSelect } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';
import TestimonialCard from '../../components/TestimonialCard';
import styles from './styles';
import { Colors } from '../../lib/colors';

const LOCAL_TESTIMONIALS = [
  { id: '1', user_name: 'João da Silva',   rating: 5, review: 'Comprei um relógio Orient e ficou incrível. Atendimento impecável e entrega rápida!' },
  { id: '2', user_name: 'Maria da Silva',  rating: 5, review: 'Anel Pandora lindo! Qualidade excepcional. Com certeza vou comprar mais peças aqui.' },
  { id: '3', user_name: 'Carlos Henrique', rating: 5, review: 'Presenteei minha esposa com um cordão Swarovski. Ela amou! Embalagem luxuosa e peça perfeita.' },
  { id: '4', user_name: 'Ana Paula',       rating: 5, review: 'Atendimento incrível e preços justos. Aurora Joias é minha joalheria favorita da cidade.' },
  { id: '5', user_name: 'Roberto Souza',   rating: 5, review: 'Relógio Seiko com acabamento impecável. Superou todas as minhas expectativas. Recomendo!' },
];

export default function TestimonialsScreen({ navigation }) {
  const { t } = useLanguage();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    setLoading(true);
    try {
      // GET /rest/v1/testimonials?select=*
      const data = await dbSelect('testimonials');
      setTestimonials(data.length > 0 ? data : LOCAL_TESTIMONIALS);
    } catch (err) {
      console.warn('TestimonialsScreen fetch:', err.message);
      setTestimonials(LOCAL_TESTIMONIALS);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Text style={styles.hamburgerIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('testimonialsTitle')}</Text>
        <View style={{ width: 28 }} />
      </View>

      <FlatList
        data={testimonials}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TestimonialCard testimonial={item} index={index} />
        )}
      />
    </SafeAreaView>
  );
}
