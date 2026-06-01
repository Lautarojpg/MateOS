import { StyleSheet, Text, View } from "react-native";

export default function EnfoqueScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enfoque</Text>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Modo de Enfoque</Text>

        <View style={[styles.mode, styles.selected]}>
          <Text style={styles.icon}>⏱</Text>

          <View style={styles.info}>
            <Text style={styles.modeTitle}>Pomodoro</Text>
            <Text style={styles.modeDescription}>
              25 min de enfoque + 5 min descanso
            </Text>
          </View>

          <Text style={styles.badge}>25 min</Text>
        </View>

        <View style={styles.mode}>
          <Text style={styles.icon}>🧠</Text>

          <View style={styles.info}>
            <Text style={styles.modeTitle}>Enfoque Profundo</Text>
            <Text style={styles.modeDescription}>
              50 min de trabajo concentrado
            </Text>
          </View>

          <Text style={styles.badge}>50 min</Text>
        </View>

        <View style={styles.mode}>
          <Text style={styles.icon}>⚡</Text>

          <View style={styles.info}>
            <Text style={styles.modeTitle}>Sesión Rápida</Text>
            <Text style={styles.modeDescription}>
              10 min para tareas cortas
            </Text>
          </View>

          <Text style={styles.badge}>10 min</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Materia</Text>

        <View style={styles.select}>
          <Text>Selecciona una materia</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },

  mode: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
  },

  selected: {
    borderColor: "green",
  },

  icon: {
    fontSize: 24,
    marginRight: 12,
  },

  info: {
    flex: 1,
  },

  modeTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },

  modeDescription: {
    color: "#666",
    fontSize: 13,
  },

  badge: {
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
  },

  select: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
  },
});