import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  onNavigate?: (screen: string, params?: any) => void;
};

export default function EnfoqueScreen({ onNavigate }: Props) {
  const [selectedMode, setSelectedMode] = useState(2);
  const [selectedMateria, setSelectedMateria] = useState("Química");
  const [mostrarMaterias, setMostrarMaterias] = useState(false);

  const modos = [
    {
      id: 1,
      nombre: "Pomodoro",
      descripcion: "25 min de enfoque + 5 min descanso",
      tiempo: "25 min",
      minutos: 25,
      icono: "⏱️",
      color: "#2E7D32",
    },
    {
      id: 2,
      nombre: "Enfoque Profundo",
      descripcion: "50 min de trabajo concentrado",
      tiempo: "50 min",
      minutos: 50,
      icono: "🧠",
      color: "#00ACC1",
    },
    {
      id: 3,
      nombre: "Sesión Rápida",
      descripcion: "10 min para tareas cortas",
      tiempo: "10 min",
      minutos: 10,
      icono: "⚡",
      color: "#FB8C00",
    },
  ];

  const materias = [
    "Álgebra",
    "Física",
    "Química",
    "Economía",
    "Taller",
    "Otro",
  ];

  const modoSeleccionado = modos.find(
    (m) => m.id === selectedMode
  );
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <Text style={styles.title}>Enfoque</Text>

      {/* MODOS DE ENFOQUE */}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Modo de Enfoque</Text>

        <Text style={styles.cardDescription}>
          Elige el tipo de sesión que mejor se adapte a tu tarea
        </Text>

        {modos.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.modeCard,
              selectedMode === item.id && styles.selectedMode,
            ]}
            onPress={() => setSelectedMode(item.id)}
          >
            <View
              style={[
                styles.iconBox,
                { backgroundColor: item.color },
              ]}
            >
              <Text style={styles.iconText}>
                {item.icono}
              </Text>
            </View>

            <View style={styles.modeInfo}>
              <View style={styles.modeHeader}>
                <Text style={styles.modeTitle}>
                  {item.nombre}
                </Text>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {item.tiempo}
                  </Text>
                </View>
              </View>

              <Text style={styles.modeDescription}>
                {item.descripcion}
              </Text>
            </View>

            {selectedMode === item.id && (
              <Text style={styles.check}>
                ✓
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* MATERIA */}

        <View style={styles.card}>
  <Text style={styles.cardTitle}>Materia</Text>

  <Text style={styles.cardDescription}>
    ¿Qué vas a estudiar en esta sesión?
  </Text>

  <TouchableOpacity
    style={styles.select}
    onPress={() =>
      setMostrarMaterias(!mostrarMaterias)
    }
  >
    <Text style={styles.selectText}>
      {selectedMateria}
    </Text>

    <Text style={styles.arrow}>
      ▼
    </Text>
  </TouchableOpacity>

  {mostrarMaterias && (
    <View style={styles.dropdown}>
      {materias.map((materia) => (
        <TouchableOpacity
          key={materia}
          style={styles.dropdownItem}
          onPress={() => {
            setSelectedMateria(materia);
            setMostrarMaterias(false);
          }}
        >
          <Text>{materia}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )}
</View>

      {/* CARPI */}

      <View style={styles.petCard}>
        <View style={styles.petCircle}>
          <Text style={styles.petIcon}>
            🌱
          </Text>
        </View>

        <Text style={styles.petName}>
          Carpi
        </Text>

        <Text style={styles.petLevel}>
          Por Nacer • Nivel 1
        </Text>

        <Text style={styles.petMessage}>
          Carpi está listo para estudiar contigo
        </Text>
      </View>

      {/* BOTÓN */}

    <TouchableOpacity
      style={styles.startButton}
      onPress={() => {
        if (onNavigate) {
          onNavigate("temporizador", {
            minutos: modoSeleccionado?.minutos ?? 25,
            modo: modoSeleccionado?.nombre,
            materia: selectedMateria,
          });
        } else {
          router.push({
            pathname: "/temporizador",
            params: {
              minutos: modoSeleccionado?.minutos ?? 25,
              modo: modoSeleccionado?.nombre,
              materia: selectedMateria,
            },
          });
        }
      }}
    >
      <Text style={styles.playIcon}>▶</Text>

      <Text style={styles.startButtonText}>
        Comenzar Sesión
      </Text>
    </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7F5",
    padding: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#111827",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },

  cardDescription: {
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 16,
    fontSize: 13,
  },

  modeCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
  },

  selectedMode: {
    backgroundColor: "#F0FDF4",
    borderColor: "#22C55E",
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  iconText: {
    fontSize: 22,
  },

  modeInfo: {
    flex: 1,
  },

  modeHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  modeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  badge: {
    marginLeft: 8,
    backgroundColor: "#F5EFE6",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },

  badgeText: {
    fontSize: 11,
    color: "#B45309",
    fontWeight: "600",
  },

  modeDescription: {
    color: "#6B7280",
    marginTop: 4,
    fontSize: 13,
  },

  check: {
    fontSize: 24,
    color: "#22C55E",
    fontWeight: "bold",
  },

  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    width: 150,
  },

  selectText: {
    color: "#111827",
    fontSize: 14,
  },

  arrow: {
    color: "#777",
    fontSize: 12,
  },

  petCard: {
    backgroundColor: "#EEF7F2",
    borderRadius: 18,
    paddingVertical: 24,
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#D8E8DD",
  },

  petCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#D6B55A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  petIcon: {
    fontSize: 30,
  },

  petName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },

  petLevel: {
    color: "#6B7280",
    marginTop: 4,
    fontSize: 13,
  },

  petMessage: {
    marginTop: 12,
    color: "#4B5563",
    textAlign: "center",
  },

  startButton: {
    backgroundColor: "#1F8F3A",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  playIcon: {
    color: "#FFFFFF",
    fontSize: 18,
    marginRight: 8,
  },

  startButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  dropdown: {
  marginTop: 8,
  borderWidth: 1,
  borderColor: "#D1D5DB",
  borderRadius: 10,
  overflow: "hidden",
  },

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
});