import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TemporizadorScreen() {
  const { minutos, modo, materia } =
    useLocalSearchParams();

  const tiempoInicial =
    Number(minutos || 25) * 60;

  const [segundos, setSegundos] =
    useState(tiempoInicial);

  const [pausado, setPausado] =
    useState(false);

  useEffect(() => {
    if (pausado) return;

    const intervalo = setInterval(() => {
      setSegundos((prev) => {
        if (prev <= 1) {
          clearInterval(intervalo);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [pausado]);

  const mins = Math.floor(segundos / 60);
  const secs = segundos % 60;

  const tiempo =
    String(mins).padStart(2, "0") +
    ":" +
    String(secs).padStart(2, "0");

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.topBar} />

        <Text style={styles.badge}>
          {modo}
        </Text>

        <Text style={styles.subject}>
          {materia}
        </Text>

        <View style={styles.circle}>
          <Text style={styles.timer}>
            {tiempo}
          </Text>

          <Text style={styles.status}>
            {pausado
              ? "Pausado"
              : "En progreso"}
          </Text>
        </View>

        <View style={styles.stats}>
          <View>
            <Text style={styles.number}>
              0
            </Text>
            <Text style={styles.label}>
              Distracciones
            </Text>
          </View>

          <View>
            <Text style={styles.number}>
              {Math.floor(
                (tiempoInicial - segundos) / 60
              )}
            </Text>

            <Text style={styles.label}>
              Min estudiados
            </Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.secondary}
            onPress={() =>
              setSegundos(tiempoInicial)
            }
          >
            <Text>↺</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pause}
            onPress={() =>
              setPausado(!pausado)
            }
          >
            <Text>
              {pausado
                ? "Continuar"
                : "Pausar"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.stop}
            onPress={() =>
              setSegundos(0)
            }
          >
            <Text style={{ color: "#fff" }}>
              ■
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.petCard}>
        <Text style={styles.pet}>
          🌱 Carpi te acompaña
        </Text>
      </View>

      <View style={styles.tip}>
        <Text>
          Mantén el enfoque para ganar más
          XP y hacer evolucionar a Carpi
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7F5",
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  topBar: {
    height: 5,
    backgroundColor: "#2E7D32",
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 20,
  },

  badge: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontSize: 11,
  },

  subject: {
    textAlign: "center",
    fontWeight: "600",
    marginTop: 10,
  },

  circle: {
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 6,
    borderColor: "#DDE9DF",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  timer: {
    fontSize: 48,
    fontWeight: "700",
    color: "#111",
  },

  status: {
    color: "#777",
    marginTop: 8,
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
  },

  number: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
  },

  label: {
    fontSize: 12,
    color: "#666",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    gap: 10,
  },

  secondary: {
    backgroundColor: "#F2F2F2",
    padding: 12,
    borderRadius: 10,
  },

  pause: {
    backgroundColor: "#EADFCF",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 10,
  },

  stop: {
    backgroundColor: "#E53935",
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 10,
  },

  petCard: {
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 20,
    borderRadius: 18,
  },

  pet: {
    fontSize: 16,
  },

  tip: {
    marginTop: 20,
    backgroundColor: "#EEF7F2",
    padding: 20,
    borderRadius: 18,
    alignItems: "center",
  },
});