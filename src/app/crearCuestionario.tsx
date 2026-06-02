import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  onFinalize?: () => void;
};

export default function CreadorScreen({ onFinalize }: Props) {
  const router = useRouter();

  // --- ESTADOS ---
  const [preguntasGuardadas, setPreguntasGuardadas] = useState<any[]>([]);
  const [preguntaTexto, setPreguntaTexto] = useState('');
  const [opcionA, setOpcionA] = useState('');
  const [opcionB, setOpcionB] = useState('');
  const [opcionC, setOpcionC] = useState('');
  const [opcionCorrecta, setOpcionCorrecta] = useState<number | null>(null);

  // --- LÓGICA 1: AGREGAR PREGUNTA A LA LISTA TEMPORAL ---
  const agregarPregunta = () => {
    if (!preguntaTexto || !opcionA || !opcionB || !opcionC || opcionCorrecta === null) {
      Alert.alert("Faltan datos", "Por favor completá la pregunta, todas las opciones y marcá cuál es la correcta.");
      return;
    }

    if (preguntasGuardadas.length >= 30) {
      Alert.alert("Límite alcanzado", "No podés agregar más de 30 preguntas por cuestionario.");
      return;
    }

    const nuevaPregunta = {
      pregunta: preguntaTexto,
      opciones: [opcionA, opcionB, opcionC],
      respuestaCorrecta: opcionCorrecta
    };

    setPreguntasGuardadas([...preguntasGuardadas, nuevaPregunta]);

    // Limpiamos el formulario para la siguiente
    setPreguntaTexto('');
    setOpcionA('');
    setOpcionB('');
    setOpcionC('');
    setOpcionCorrecta(null);
  };

  // --- LÓGICA 2: SIMULAR SUBIDA A LA BASE DE DATOS ---
  const subirCuestionario = async () => {
    if (preguntasGuardadas.length < 10) {
      Alert.alert("Faltan preguntas", `Necesitás al menos 10 preguntas. Tenés ${preguntasGuardadas.length}.`);
      return;
    }
    
    try {
      // ---------------------------------------------------------
      // ACÁ VA A IR TU LÓGICA REAL EL DÍA DE MAÑANA. Ejemplo:
      // await api.post('/cuestionarios', { preguntas: preguntasGuardadas });
      // ---------------------------------------------------------

      // Mostramos el mensaje de éxito y al darle OK, vuelve al menú
      Alert.alert(
        "¡Subido correctamente! 🎉", 
        "Tu cuestionario fue procesado y ya está listo en el sistema.",
        [
          { 
            text: "Ir al Menú", 
            onPress: () => {
              if (onFinalize) {
                onFinalize();
              } else {
                router.back();
              }
            }
          }
        ]
      );
      
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al subir el cuestionario a nuestros servidores.");
    }
  };

  // --- LÓGICA 3: ELIMINAR UNA PREGUNTA SI TE EQUIVOCASTE ---
  const eliminarPregunta = (indexAEliminar: number) => {
    const nuevaLista = preguntasGuardadas.filter((_, index) => index !== indexAEliminar);
    setPreguntasGuardadas(nuevaLista);
  };

  return (
    <View style={styles.container}>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.encabezado}>
          {onFinalize && (
            <TouchableOpacity 
              style={{ alignSelf: 'flex-start', backgroundColor: '#E8F5E9', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: '#C8E6C9' }} 
              onPress={onFinalize}
            >
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#2E7D32' }}>◀ Volver al Menú</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.titulo}>Crear Cuestionario</Text>
          <Text style={styles.contador}>
            Preguntas añadidas: {preguntasGuardadas.length} / 30
          </Text>
          {preguntasGuardadas.length < 10 && (
            <Text style={styles.avisoMinimo}>(Faltan {10 - preguntasGuardadas.length} para poder subirlo)</Text>
          )}
        </View>

        {/* --- FORMULARIO DE CREACIÓN --- */}
        <View style={styles.tarjetaFormulario}>
          <Text style={styles.label}>Escribí la pregunta:</Text>
          <TextInput 
            style={styles.inputArea}
            placeholder="Ej: ¿Qué patrón de diseño usa React?"
            multiline={true}
            value={preguntaTexto}
            onChangeText={setPreguntaTexto}
          />

          <Text style={styles.label}>Definí las opciones y marcá la correcta:</Text>
          
          <View style={styles.filaOpcion}>
            <TouchableOpacity 
              style={[styles.botonRadio, opcionCorrecta === 0 && styles.botonRadioSeleccionado]}
              onPress={() => setOpcionCorrecta(0)}
            >
              <Text style={opcionCorrecta === 0 ? styles.textoRadioSeleccionado : styles.textoRadio}>A</Text>
            </TouchableOpacity>
            <TextInput style={styles.inputLinea} placeholder="Primera opción..." value={opcionA} onChangeText={setOpcionA} />
          </View>

          <View style={styles.filaOpcion}>
            <TouchableOpacity 
              style={[styles.botonRadio, opcionCorrecta === 1 && styles.botonRadioSeleccionado]}
              onPress={() => setOpcionCorrecta(1)}
            >
              <Text style={opcionCorrecta === 1 ? styles.textoRadioSeleccionado : styles.textoRadio}>B</Text>
            </TouchableOpacity>
            <TextInput style={styles.inputLinea} placeholder="Segunda opción..." value={opcionB} onChangeText={setOpcionB} />
          </View>

          <View style={styles.filaOpcion}>
            <TouchableOpacity 
              style={[styles.botonRadio, opcionCorrecta === 2 && styles.botonRadioSeleccionado]}
              onPress={() => setOpcionCorrecta(2)}
            >
              <Text style={opcionCorrecta === 2 ? styles.textoRadioSeleccionado : styles.textoRadio}>C</Text>
            </TouchableOpacity>
            <TextInput style={styles.inputLinea} placeholder="Tercera opción..." value={opcionC} onChangeText={setOpcionC} />
          </View>

          <TouchableOpacity style={styles.botonAgregar} onPress={agregarPregunta}>
            <Text style={styles.textoBotonAgregar}>+ Sumar Pregunta al listado</Text>
          </TouchableOpacity>
        </View>

        {/* --- VISTA PREVIA DE LO QUE VA CREANDO --- */}
        {preguntasGuardadas.length > 0 && (
          <View style={styles.contenedorRevision}>
            <Text style={styles.tituloRevision}>Preguntas listas para subir:</Text>
            
            {preguntasGuardadas.map((item, index) => (
              <View key={index} style={styles.itemRevision}>
                <View style={styles.encabezadoItemRevision}>
                  <Text style={styles.textoPreguntaRevision}>{index + 1}. {item.pregunta}</Text>
                  <TouchableOpacity onPress={() => eliminarPregunta(index)}>
                    <Text style={styles.textoEliminar}>🗑️</Text>
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.textoRespuestaCorrecta}>
                  ✅ <Text style={{fontWeight: 'bold'}}>Correcta:</Text> {item.opciones[item.respuestaCorrecta]}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* --- BOTÓN FINAL DE SUBIDA --- */}
        <TouchableOpacity 
          style={[styles.botonFinalizar, preguntasGuardadas.length >= 10 ? styles.botonSiguienteActivo : styles.botonSiguienteInactivo]}
          disabled={preguntasGuardadas.length < 10}
          onPress={subirCuestionario}
        >
          <Text style={styles.textoSiguiente}>Subir Cuestionario</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9F5' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, maxWidth: 600, alignSelf: 'center', width: '100%' },
  encabezado: { marginBottom: 20, alignItems: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#2E7D32', marginBottom: 5 },
  contador: { fontSize: 16, color: '#333', fontWeight: '600' },
  avisoMinimo: { fontSize: 14, color: '#E65100', marginTop: 4 },
  
  tarjetaFormulario: {
    backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, marginBottom: 30,
    borderWidth: 1, borderColor: '#E0E0E0', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)', elevation: 2, 
  },
  label: { fontSize: 16, fontWeight: 'bold', color: '#333333', marginBottom: 10, marginTop: 10 },
  inputArea: {
    backgroundColor: '#F5F5F5', borderRadius: 10, padding: 15, fontSize: 16, minHeight: 80,
    textAlignVertical: 'top', borderWidth: 1, borderColor: '#E0E0E0'
  },
  filaOpcion: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  botonRadio: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#F5F5F5',
    justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#E0E0E0'
  },
  botonRadioSeleccionado: { backgroundColor: '#E8F5E9', borderColor: '#2E7D32' },
  textoRadio: { fontSize: 16, color: '#666', fontWeight: 'bold' },
  textoRadioSeleccionado: { color: '#2E7D32', fontWeight: 'bold' },
  inputLinea: { flex: 1, backgroundColor: '#F5F5F5', borderRadius: 10, padding: 12, fontSize: 16, borderWidth: 1, borderColor: '#E0E0E0' },
  
  botonAgregar: { backgroundColor: '#E8F5E9', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 15, borderWidth: 1, borderColor: '#2E7D32' },
  textoBotonAgregar: { color: '#2E7D32', fontSize: 16, fontWeight: 'bold' },
  
  // --- ESTILOS DE LA VISTA PREVIA ---
  contenedorRevision: { width: '100%', marginBottom: 30 },
  tituloRevision: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  itemRevision: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#E0E0E0' },
  encabezadoItemRevision: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  textoPreguntaRevision: { fontSize: 16, fontWeight: '600', color: '#333', flex: 1, paddingRight: 10 },
  textoRespuestaCorrecta: { fontSize: 14, color: '#2E7D32' },
  textoEliminar: { fontSize: 18 },

  botonFinalizar: { padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  botonSiguienteActivo: { backgroundColor: '#2E7D32' },
  botonSiguienteInactivo: { backgroundColor: '#BDBDBD' },
  textoSiguiente: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }
});