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
  return (
    <ImageBackground
      source={require("../../assets/images/descarga.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >

      <View style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onFinalize}>
            <Text style={styles.backBtnText}>◀ Volver</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Carpi</Text>
          <View style={{ width: 60 }} /> 
        </View>

        <View style={styles.hud}>
        <View style={styles.hudCard}>
            <Text style={styles.hudIcon}>⚡</Text>
            <Text style={styles.hudText}>100</Text>
        </View>

        <View style={styles.hudCard}>
            <Text style={styles.hudIcon}>🧉</Text>
            <Text style={styles.hudText}>0</Text>
        </View>
        </View>

        <View style={styles.mascotArea}>
        <Image
            source={require("../../assets/sprite/carpincho.gif")}
            style={styles.spriteImage}
            resizeMode="contain"
        />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 40 : 20,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
  },
  backBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  backBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  hud: {
  position: "absolute",
  top: 70,
  right: 20,
  flexDirection: "row",
  gap: 10,
  zIndex: 100,
},

hudCard: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.2)",
},

hudIcon: {
  fontSize: 18,
  marginRight: 5,
},

hudText: {
  color: "#FFF",
  fontSize: 14,
  fontWeight: "700",
},

mascotArea: {
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
  paddingBottom: 70,
},

spriteImage: {
  width: 180,
  height: 180,
},
});
