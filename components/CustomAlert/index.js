import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../lib/colors";
import styles from "./styles";

export default function CustomAlert({
  visible,
  title,
  message,
  onClose,
  onConfirm,
  confirmText,
  cancelText,
  isDestructive = false,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          {title && <Text style={styles.title}>{title}</Text>}
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonRow}>
            {onConfirm ? (
              <>
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.7}>
                  <Text style={styles.cancelBtnText}>{cancelText || "Cancelar"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.confirmBtn, isDestructive && { borderColor: Colors.error }]}
                  onPress={onConfirm}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.confirmBtnText, isDestructive && { color: Colors.error }]}>{confirmText || "OK"}</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity style={styles.okBtn} onPress={onClose} activeOpacity={0.7}>
                <Text style={styles.okBtnText}>{confirmText || "OK"}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
