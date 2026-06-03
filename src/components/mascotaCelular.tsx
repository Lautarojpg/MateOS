import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from "react-native";

type Props = {
  onFinalize?: () => void;
};

export default function MascotaCelular({ onFinalize }: Props) {
  const [energia] = useState(100);
  const [mates] = useState(0);
  const [isEnojado, setIsEnojado] = useState(false);

  // Alternate between happy and angry sprite every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsEnojado((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const spriteSource = isEnojado
    ? require("../../assets/sprite/VictorioSpriteEnojado.gif")
    : require("../../assets/sprite/VictorioSprite.gif");

  return (
    <ImageBackground
      source={require("../../assets/images/descarga.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      {/* Subtle darkening so text stays readable */}
      <View style={styles.overlay}>

        {/* ─── TOP BAR ─────────────────────────────── */}
        <View style={styles.topBar}>
          {/* Back button — left */}
          <TouchableOpacity style={styles.backBtn} onPress={onFinalize}>
            <Text style={styles.backBtnText}>◀ Volver</Text>
          </TouchableOpacity>

          {/* Name — centre */}
          <Text style={styles.name}>Carpi</Text>

          {/* Stats badges — right */}
          <View style={styles.badges}>
            <View style={[styles.badge, styles.badgeGreen]}>
              <Text style={styles.badgeText}>⚡ {energia}%</Text>
            </View>
            <View style={[styles.badge, styles.badgeBrown]}>
              <Text style={styles.badgeText}>🧉 {mates}</Text>
            </View>
          </View>
        </View>

        {/* ─── GIF centrado en pantalla ─────────────── */}
        <View style={styles.spriteWrapper}>
          <Image
            source={spriteSource}
            style={styles.sprite}
            resizeMode="contain"
          />
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.30)",
    paddingTop: Platform.OS === "ios" ? 50 : 28,
  },

  // ── Top bar ──────────────────────────────────────
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backBtn: {
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  backBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  badges: {
    gap: 6,
    alignItems: "flex-end",
  },
  badge: {
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: 20,
  },
  badgeGreen: {
    backgroundColor: "#2E7D32",
  },
  badgeBrown: {
    backgroundColor: "#5D4037",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  // ── Sprite ────────────────────────────────────────
  spriteWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sprite: {
    width: 220,
    height: 220,
  },
});
