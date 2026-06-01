import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from "../components/header";

const preguntas = [
  {
    pregunta: "En tu plan de estudios de estructuras algebraicas, ¿qué relación existe entre un Monoide y un Magma?",
    opciones: [
      "A. Son estructuras con propiedades opuestas",
      "B. El término Monoide tiene la misma definición que Magma",
      "C. Un Monoide no cumple con la ley de composición interna"
    ],
    respuestaCorrecta: 1 
  },
  {
    pregunta: "En una distribución normal estándar (Probabilidad y Estadística), ¿cuáles son los valores de la media y la desviación típica?",
    opciones: [
      "A. Media 1 y desviación estándar 0",
      "B. Media 0 y desviación estándar 1",
      "C. Media 0 y desviación estándar 0"
    ],
    respuestaCorrecta: 1 
  },
  {
    pregunta: "¿Qué sucede con tu mascota en MateOS si abandonás el Modo Enfoque para entrar a una red social?",
    opciones: [
      "A. Se enferma visualmente por perder el foco",
      "B. Entra en modo pausa automáticamente",
      "C. Gana experiencia por descansar"
    ],
    respuestaCorrecta: 0 
  },
  {
    pregunta: "En Cálculo Diferencial, ¿cuál es la derivada de la función f(x) = x²?",
    opciones: [
      "A. x",
      "B. 2x",
      "C. 2x²"
    ],
    respuestaCorrecta: 1 
  },
  {
    pregunta: "En Bioquímica, dentro de la estructura del ADN, ¿con qué base nitrogenada se empareja siempre la Adenina (A)?",
    opciones: [
      "A. Citosina (C)",
      "B. Guanina (G)",
      "C. Timina (T)"
    ],
    respuestaCorrecta: 2 
  },
  {
    pregunta: "Según las reglas de MateOS, ¿cuánto tiempo dura el temporizador de la 'Pausa Activa' obligatoria?",
    opciones: [
      "A. 5 minutos",
      "B. 10 minutos",
      "C. 15 minutos"
    ],
    respuestaCorrecta: 0 
  },
  {
    pregunta: "En Lógica, ¿cómo se le llama a una proposición compuesta que es siempre verdadera independientemente de sus valores de verdad?",
    opciones: [
      "A. Contradicción",
      "B. Tautología",
      "C. Falacia"
    ],
    respuestaCorrecta: 1 
  },
  {
    pregunta: "En el desarrollo de una app con React Native, ¿para qué se utiliza el hook 'useState'?",
    opciones: [
      "A. Para navegar entre pantallas",
      "B. Para guardar datos en la base de datos",
      "C. Para crear variables que actualizan la pantalla al cambiar"
    ],
    respuestaCorrecta: 2 
  },
  {
    pregunta: "En el diseño de un Sistema de Información, ¿cuáles son los tres componentes fundamentales?",
    opciones: [
      "A. Personas, Procesos y Tecnología",
      "B. Hardware, Software y Redes",
      "C. Entradas, Salidas y Código"
    ],
    respuestaCorrecta: 0 
  },
  {
    pregunta: "¿Qué acción realiza el sistema de MateOS cuando el usuario llega a la última página del lector PDF inteligente?",
    opciones: [
      "A. Cierra la aplicación para descansar la vista",
      "B. Procesa el texto para desbloquear un cuestionario de repaso",
      "C. Envía el PDF por correo electrónico al profesor"
    ],
    respuestaCorrecta: 1 
  }
];

export default function CuestionarioScreen() {
  const [preguntaActual, setPreguntaActual] = useState(0); 
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<number | null>(null);
  const [puntaje, setPuntaje] = useState(0); 
  // NUEVO ESTADO: Guarda el historial de lo que respondió el usuario
  const [respuestasUsuario, setRespuestasUsuario] = useState<number[]>([]); 
  const [cuestionarioTerminado, setCuestionarioTerminado] = useState(false); 

  const manejarSiguiente = () => {
    // 1. Guardamos la respuesta que eligió en su historial
    const nuevasRespuestas = [...respuestasUsuario, opcionSeleccionada as number];
    setRespuestasUsuario(nuevasRespuestas);

    // 2. Evaluamos si es correcta
    if (opcionSeleccionada === preguntas[preguntaActual].respuestaCorrecta) {
      setPuntaje(puntaje + 1);
    }

    // 3. Pasamos a la siguiente o terminamos
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1); 
      setOpcionSeleccionada(null); 
    } else {
      setCuestionarioTerminado(true); 
    }
  };

  if (cuestionarioTerminado) {
    const respuestasIncorrectas = preguntas.length - puntaje;
    const notaFinal = (puntaje / preguntas.length) * 10; 

    return (
      <View style={styles.container}>
        
        {/* Cambiamos el View por un ScrollView para poder deslizar hacia abajo */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.tarjetaResultados}>
            
            <Text style={styles.tituloResultados}>¡Repaso Completado!</Text>
            
            <View style={styles.contenedorEstadisticas}>
              <View style={styles.estadisticaItem}>
                <Text style={styles.iconoEstadistica}>✅</Text>
                <Text style={styles.textoCorrectas}>{puntaje} Correctas</Text>
              </View>
              <View style={styles.estadisticaItem}>
                <Text style={styles.iconoEstadistica}>❌</Text>
                <Text style={styles.textoIncorrectas}>{respuestasIncorrectas} Incorrectas</Text>
              </View>
            </View>

            <View style={styles.contenedorNota}>
              <Text style={styles.textoNotaTitulo}>Puntuación Final</Text>
              <Text style={styles.textoNotaNumero}>{notaFinal}/10</Text>
            </View>

            {/* --- LISTA DE REVISIÓN DE PREGUNTAS --- */}
            <View style={styles.contenedorRevision}>
              <Text style={styles.tituloRevision}>Revisión de respuestas:</Text>
              
              {preguntas.map((item, index) => {
                const respuestaElegida = respuestasUsuario[index];
                const esCorrecta = respuestaElegida === item.respuestaCorrecta;

                return (
                  <View 
                    key={index} 
                    style={[styles.itemRevision, esCorrecta ? styles.itemRevisionCorrecto : styles.itemRevisionIncorrecto]}
                  >
                    <Text style={styles.textoPreguntaRevision}>{index + 1}. {item.pregunta}</Text>
                    
                    <Text style={styles.textoTuRespuesta}>
                      <Text style={{fontWeight: 'bold'}}>Tu respuesta:</Text> {item.opciones[respuestaElegida]}
                    </Text>
                    
                    {/* Si se equivocó, le mostramos cuál era la correcta de verdad */}
                    {!esCorrecta && (
                      <Text style={styles.textoRespuestaCorrecta}>
                        <Text style={{fontWeight: 'bold'}}>Respuesta correcta:</Text> {item.opciones[item.respuestaCorrecta]}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>

            <TouchableOpacity 
              style={styles.botonSiguienteActivo}
              onPress={() => {
                setPreguntaActual(0);
                setPuntaje(0);
                setOpcionSeleccionada(null);
                setRespuestasUsuario([]); // Limpiamos el historial
                setCuestionarioTerminado(false);
              }}
            >
              <Text style={styles.textoSiguiente}>Volver a intentar</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    );
  }

  const preguntaActiva = preguntas[preguntaActual];

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        
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
          onPress={manejarSiguiente} 
        >
          <Text style={styles.textoSiguiente}>
            {preguntaActual === preguntas.length - 1 ? "Finalizar" : "Siguiente"}
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9F5' },
  content: {
    width: '100%', maxWidth: 500, paddingHorizontal: 20, paddingTop: 20, 
    flex: 1, justifyContent: 'center', alignSelf: 'center', 
  },
  scrollContent: {
    width: '100%', maxWidth: 600, alignSelf: 'center', paddingHorizontal: 20, paddingVertical: 30
  },
  progreso: { fontSize: 16, color: '#666666', textAlign: 'center', marginBottom: 20, fontWeight: '600' },
  tarjetaPregunta: {
    backgroundColor: '#FFFFFF', padding: 24, borderRadius: 16, marginBottom: 30,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)', elevation: 3, 
  },
  preguntaTexto: { fontSize: 20, color: '#333333', textAlign: 'center', lineHeight: 28 },
  contenedorOpciones: { gap: 12, marginBottom: 40 },
  botonOpcion: { backgroundColor: '#FFFFFF', padding: 18, borderRadius: 12, borderWidth: 2, borderColor: '#E0E0E0' },
  botonSeleccionado: { borderColor: '#2E7D32', backgroundColor: '#E8F5E9' },
  textoOpcion: { fontSize: 16, color: '#444444' },
  textoOpcionSeleccionada: { color: '#2E7D32', fontWeight: 'bold' },
  botonSiguiente: { padding: 16, borderRadius: 12, alignItems: 'center' },
  botonSiguienteActivo: { backgroundColor: '#2E7D32', width: '100%' },
  botonSiguienteInactivo: { backgroundColor: '#BDBDBD' },
  textoSiguiente: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  
  tarjetaResultados: {
    backgroundColor: '#FFFFFF', padding: 30, borderRadius: 16, alignItems: 'center',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.08)', elevation: 4, 
  },
  tituloResultados: { fontSize: 26, fontWeight: 'bold', color: '#2E7D32', marginBottom: 20 },
  
  contenedorEstadisticas: {
    width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20,
    backgroundColor: '#F5F5F5', padding: 15, borderRadius: 12
  },
  estadisticaItem: { alignItems: 'center' },
  iconoEstadistica: { fontSize: 24, marginBottom: 5 },
  textoCorrectas: { fontSize: 16, fontWeight: 'bold', color: '#2E7D32' },
  textoIncorrectas: { fontSize: 16, fontWeight: 'bold', color: '#D32F2F' }, 
  
  contenedorNota: {
    alignItems: 'center', marginBottom: 30,
    borderTopWidth: 1, borderTopColor: '#E0E0E0', paddingTop: 20, width: '100%'
  },
  textoNotaTitulo: { fontSize: 16, color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 5 },
  textoNotaNumero: { fontSize: 48, fontWeight: '900', color: '#333' },

  // --- ESTILOS DE LA REVISIÓN ---
  contenedorRevision: {
    width: '100%', marginBottom: 30,
  },
  tituloRevision: {
    fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15, alignSelf: 'flex-start'
  },
  itemRevision: {
    padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1
  },
  itemRevisionCorrecto: {
    backgroundColor: '#E8F5E9', borderColor: '#A5D6A7'
  },
  itemRevisionIncorrecto: {
    backgroundColor: '#FFEBEE', borderColor: '#EF9A9A'
  },
  textoPreguntaRevision: {
    fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8
  },
  textoTuRespuesta: {
    fontSize: 14, color: '#444', marginBottom: 4
  },
  textoRespuestaCorrecta: {
    fontSize: 14, color: '#2E7D32', marginTop: 4 // Verde para resaltar cuál era la buena
  }
});