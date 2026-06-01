import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomAlert from "../../components/CustomAlert";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { Colors } from "../../lib/colors";
import { dbSelect, dbUpdate } from "../../lib/supabase";
import styles from "./styles";

export default function ProfileScreen({ navigation }) {
  const { user, token, logout } = useAuth();
  const { t } = useLanguage();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(user?.user_metadata?.name ?? "");
  const [phone, setPhone] = useState(user?.user_metadata?.phone ?? "");
  const [logoutAlert, setLogoutAlert] = useState(false);

  async function fetchProfile() {
    if (!user) return;
    try {
      const data = await dbSelect("profiles", { id: `eq.${user.id}` }, token);
      if (data && data.length > 0) {
        setName(data[0].name ?? "");
        setPhone(data[0].phone ?? "");
      }
    } catch (err) {
      console.warn("Profile fetch error:", err.message);
    }
  }

  useEffect(() => {
    fetchProfile();
    const unsub = navigation.addListener("focus", fetchProfile);
    return unsub;
  }, [user, token, navigation]);

  const initials = name
    ? name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  const joinedDate = user?.created_at ? new Date(user.created_at).toLocaleDateString("pt-BR") : "";

  async function handleSave() {
    setSaving(true);
    try {
      await dbUpdate("profiles", { id: user.id }, { name, phone }, token);
      setEditing(false);
      Alert.alert(t("success"), t("profileUpdated"));
    } catch (err) {
      Alert.alert(t("error"), err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    setLogoutAlert(true);
  }

  async function onConfirmLogout() {
    setLogoutAlert(false);
    await logout();
    navigation.replace("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("profileTitle")}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>{initials ? <Text style={styles.avatarText}>{initials}</Text> : <Ionicons name="person" size={40} color={Colors.secondary} />}</View>
          <Text style={styles.userName}>{name || "Aurora"}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          {joinedDate ? (
            <View style={styles.memberBadge}>
              <Text style={styles.memberText}>
                {t("memberSince")} {joinedDate}
              </Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.sectionTitle}>{t("personalData")}</Text>

        <Text style={styles.label}>{t("name")}</Text>
        <TextInput style={[styles.input, !editing && styles.inputDisabled]} value={name} onChangeText={setName} editable={editing} placeholder="Seu nome" placeholderTextColor={Colors.textMuted} />

        <Text style={styles.label}>{t("phone")}</Text>
        <TextInput
          style={[styles.input, !editing && styles.inputDisabled]}
          value={phone}
          onChangeText={setPhone}
          editable={editing}
          placeholder="(27) 99999-9999"
          placeholderTextColor={Colors.textMuted}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>{t("email")}</Text>
        <TextInput style={[styles.input, styles.inputDisabled]} value={user?.email} editable={false} />

        <View style={styles.buttonRow}>
          {editing ? (
            <>
              <TouchableOpacity style={styles.editBtn} onPress={handleSave} disabled={saving} activeOpacity={0.8}>
                {saving ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.editBtnText}>{t("save")}</Text>}
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutBtn} onPress={() => setEditing(false)} activeOpacity={0.8}>
                <Text style={styles.logoutBtnText}>{t("cancel")}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.editBtn} onPress={() => setEditing(true)} activeOpacity={0.8}>
                <Text style={styles.editBtnText}>{t("editProfile")}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
                <Text style={styles.logoutBtnText}>{t("logout")}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      <CustomAlert
        visible={logoutAlert}
        title={t("logout")}
        message={t("logoutConfirmMsg")}
        onClose={() => setLogoutAlert(false)}
        onConfirm={onConfirmLogout}
        confirmText={t("logout")}
        cancelText={t("cancel")}
        isDestructive
      />
    </SafeAreaView>
  );
}
