import { Text, View } from "react-native";
import { useLanguage } from "../../contexts/LanguageContext";
import styles from "./styles";

export default function CategoryBadge({ category }) {
  const { t } = useLanguage();

  const LABELS = {
    relogio: t("catRelogio"),
    anel: t("catAnel"),
    cordao: t("catCordao"),
  };

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{LABELS[category] ?? category}</Text>
    </View>
  );
}
