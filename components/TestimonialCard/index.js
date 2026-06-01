import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import { Images } from "../../lib/assets";
import { Colors } from "../../lib/colors";
import styles from "./styles";

const AVATAR_IMAGES = [Images.pic1, Images.pic2, Images.pic3];

export default function TestimonialCard({ testimonial, index = 0 }) {
  const { user_name, review, rating, avatar_url } = testimonial;
  const [imgError, setImgError] = useState(false);

  const initials = user_name
    ? user_name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "--";

  const showImage = !imgError && (avatar_url || AVATAR_IMAGES[index % 3]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          {showImage ? (
            <Image source={avatar_url ? { uri: avatar_url } : AVATAR_IMAGES[index % 3]} style={styles.avatarImage} onError={() => setImgError(true)} />
          ) : (
            <Text style={styles.avatarText}>{initials}</Text>
          )}
        </View>
        <View>
          <Text style={styles.userName}>{user_name}</Text>
          <View style={styles.starsRow}>
            {Array.from({ length: rating ?? 5 }).map((_, i) => (
              <Ionicons key={i} name="star" size={13} color={Colors.secondary} />
            ))}
          </View>
        </View>
      </View>
      <Text style={styles.review}>{review}</Text>
    </View>
  );
}
