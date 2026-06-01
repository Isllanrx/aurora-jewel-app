import { Ionicons } from "@expo/vector-icons";
import { Alert, FlatList, Platform, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItem from "../../components/CartItem";
import { useCart } from "../../contexts/CartContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { Colors } from "../../lib/colors";
import styles from "./styles";

export default function CartScreen({ navigation }) {
  const { cartItems, clearCart, getTotalPrice } = useCart();
  const { t } = useLanguage();

  function handleCheckout() {
    const msg = t("orderSuccess");

    if (Platform.OS === "web") {
      window.alert(msg);
      clearCart();
      navigation.navigate("Home");
    } else {
      Alert.alert(t("success"), msg, [
        {
          text: "OK",
          onPress: () => {
            clearCart();
            navigation.navigate("Home");
          },
        },
      ]);
    }
  }

  function handleClear() {
    if (Platform.OS === "web") {
      if (window.confirm(t("clearCartMsg"))) {
        clearCart();
      }
    } else {
      Alert.alert(t("clearCartTitle"), t("clearCartMsg"), [
        { text: t("cancel"), style: "cancel" },
        { text: t("remove"), style: "destructive", onPress: clearCart },
      ]);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("myCart")}</Text>
        {cartItems.length > 0 ? (
          <TouchableOpacity onPress={handleClear}>
            <Text style={styles.clearBtn}>{t("clearBtn")}</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyWrapper}>
          <Ionicons name="cart-outline" size={64} color={Colors.textMuted} style={{ marginBottom: 12 }} />
          <Text style={styles.emptyText}>{t("emptyCart")}</Text>
          <TouchableOpacity style={styles.shopButton} onPress={() => navigation.navigate("Products")} activeOpacity={0.8}>
            <Text style={styles.shopButtonText}>{t("continueShopping")}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => <CartItem item={item} />}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>{t("total")}</Text>
              <Text style={styles.totalValue}>{getTotalPrice()}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout} activeOpacity={0.8}>
              <Text style={styles.checkoutBtnText}>{t("checkout")}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
