import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from "../components/header";

// Sacamos las preguntas afuera del componente para mantener el código ordenado
const preguntas = [
  {
    pregunta: "En el contexto de las estructuras algebraicas, ¿qué relación existe entre un Monoide y un Magma?",
    opciones: [
      "A. Son estructuras con propiedades opuestas",
      "B. El término Monoide tiene la misma definición que Magma",
      "C. Un Monoide no cumple con la ley de composición interna"
    ],
    respuestaCorrecta: 1 // La correcta es la "B" (índice 1)
  },
  {
    pregunta: "En una distribución normal estándar, utilizada frecuentemente en probabilidad y estadística, ¿cuáles son los valores de la media y la desviación típica?",
    opciones: [
      "A. Media 1 y desviación estándar 0",
      "B. Media 0 y desviación estándar 1",
      "C. Media 0 y desviación estándar 0"
    ],
    respuestaCorrecta: 1 // La correcta es la "B" (índice 1)
  },
  {
    pregunta: "¿Qué sucede con tu mascota si abandonás el Modo Enfoque para entrar a una red social?",
    opciones: [
      "A. Se enferma o se estresa visualmente",
      "B. Entra en modo pausa automáticamente",
      "C. Gana experiencia por descansar"
    ],
    respuestaCorrecta: 0 // La correcta es la "A" (índice 0)
  }
];

export default function CuestionarioScreen() {
  // --- LÓGICA DE ESTADOS ---
  const [preguntaActual, setPreguntaActual] = useState(0); // Empieza en la pregunta 0
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<number | null>(null);
  const [puntaje, setPuntaje] = useState(0); // Acumulador de respuestas correctas
  const [cuestionarioTerminado, setCuestionarioTerminado] = useState(false); // Para mostrar la pantalla final

  // --- LÓGICA DE BOTONES ---
  const manejarSiguiente = () => {
    // 1. Verificamos si la opción elegida es la correcta y sumamos puntos
    if (opcionSeleccionada === preguntas[preguntaActual].respuestaCorrecta) {
      setPuntaje(puntaje + 1);
    }

    // 2. Evaluamos si hay más preguntas o si ya terminamos
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1); // Pasamos a la siguiente
      setOpcionSeleccionada(null); // Deseleccionamos el botón para la nueva pregunta
    } else {
      setCuestionarioTerminado(true); // Se acabó el cuestionario
    }
  };

  // --- VISTA FINAL (Cuando termina el cuestionario) ---
  if (cuestionarioTerminado) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <View style={styles.tarjetaResultados}>
            <Text style={styles.tituloResultados}>¡Repaso Completado!</Text>
            <Text style={styles.textoResultados}>
              Acertaste {puntaje} de {preguntas.length} preguntas.
            </Text>
            {/* Acá el día de mañana podés poner la animación de Carpi festejando */}
            <TouchableOpacity 
              style={styles.botonSiguienteActivo}
              // Esto reinicia el cuestionario, pero podrías hacer que vuelva al inicio
              onPress={() => {
                setPreguntaActual(0);
                setPuntaje(0);
                setOpcionSeleccionada(null);
                setCuestionarioTerminado(false);
              }}
            >
              <Text style={styles.textoSiguiente}>Volver a intentar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // --- VISTA PRINCIPAL (Mientras responde las preguntas) ---
  const preguntaActiva = preguntas[preguntaActual];

  return (
    <View style={styles.container}>
      {/* El Navbar arriba de todo */}
      <Header />
      
      <View style={styles.content}>
        
        {/* Indicador dinámico */}
        <Text style={styles.progreso}>
          Pregunta {preguntaActual + 1} de {preguntas.length}
        </Text>

        <View style={styles.tarjetaPregunta}>
          <Text style={styles.preguntaTexto}>
            {preguntaActiva.pregunta}
          </Text>
        </View>

        <View style={styles.contenedorOpciones}>
          {preguntaActiva.opciones.map((opcion, index) => {
            const estaSeleccionada = opcionSeleccionada === index;

            return (
              <TouchableOpacity 
                key={index}
                style={[styles.botonOpcion, estaSeleccionada && styles.botonSeleccionado]}
                onPress={() => setOpcionSeleccionada(index)}
              >
                <Text style={[styles.textoOpcion, estaSeleccionada && styles.textoOpcionSeleccionada]}>
                  {opcion}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity 
          style={[styles.botonSiguiente, opcionSeleccionada !== null ? styles.botonSiguienteActivo : styles.botonSiguienteInactivo]}
          disabled={opcionSeleccionada === null}
          onPress={manejarSiguiente} // Ejecutamos la lógica al tocar
        >
          {/* El texto cambia si es la última pregunta */}
          <Text style={styles.textoSiguiente}>
            {preguntaActual === preguntas.length - 1 ? "Finalizar" : "Siguiente"}
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9F5', 
  },
  content: {
    width: '100%',
    maxWidth: 500, 
    paddingHorizontal: 20, 
    paddingTop: 20, // Un poco de espacio extra debajo del Header
    flex: 1, // Para que ocupe el resto de la pantalla debajo del Header
    justifyContent: 'center', // Centra el contenido verticalmente
    alignSelf: 'center',
  },
  progreso: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  tarjetaPregunta: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3, 
  },
  preguntaTexto: {
    fontSize: 20,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 28, 
  },
  contenedorOpciones: {
    gap: 12, 
    marginBottom: 40,
  },
  botonOpcion: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  botonSeleccionado: {
    borderColor: '#2E7D32', 
    backgroundColor: '#E8F5E9', 
  },
  textoOpcion: {
    fontSize: 16,
    color: '#444444',
  },
  textoOpcionSeleccionada: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  botonSiguiente: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  botonSiguienteActivo: {
    backgroundColor: '#2E7D32',
  },
  botonSiguienteInactivo: {
    backgroundColor: '#BDBDBD', 
  },
  textoSiguiente: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Estilos nuevos para la pantalla final
  tarjetaResultados: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3, 
  },
  tituloResultados: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  textoResultados: {
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
  }
});