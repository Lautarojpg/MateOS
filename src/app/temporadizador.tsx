import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TemporizadorScreen() {
  const [segundos, setSegundos] = useState(25 * 60);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundos((prev) => {
        if (prev <= 0) {
          clearInterval(intervalo);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const minutos = Math.floor(segundos / 60);
  const secs = segundos % 60;

  const tiempo =
    `${minutos}`.padStart(2, "0") +
    ":" +
    `${secs}`.padStart(2, "0");

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{tiempo}</Text>
      <Text>En progreso</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  timer: {
    fontSize: 60,
    fontWeight: "bold",
  },
});