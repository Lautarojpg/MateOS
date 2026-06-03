import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

export default function MenuCuestionarioScreen() {
  const router = useRouter(); 
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 380;

  return (
    <View style={styles.container}>
      
      <View style={styles.content}>
        <Text style={styles.titulo}>Zona de Repaso</Text>
        <Text style={styles.subtitulo}>Elegí cómo querés poner a prueba tus conocimientos hoy para ganar experiencia.</Text>

        {/* OPCIÓN 1: Crear el propio cuestionario */}
        <TouchableOpacity 
          style={styles.tarjetaOpcion}
          onPress={() => router.push('/crearCuestionario')}
        >
          <Text style={styles.tituloTarjeta}> Crear mi cuestionario</Text>
          <Text style={styles.textoTarjeta}>
            Armá tu propio test personalizado definiendo entre 10 y 30 preguntas para repasar temas específicos.
          </Text>
        </TouchableOpacity>

        {/* OPCIÓN 2: IA (Premium - Funcionalidad de prueba) */}
        <TouchableOpacity 
          style={[styles.tarjetaOpcion, styles.tarjetaPremium]}
          onPress={() => router.push('/cuestionario')} 
        >
          <View style={styles.encabezadoPremium}>
            <Text style={styles.tituloTarjetaIA}> Generado por IA</Text>
            <View style={styles.etiquetaPremium}>
              <Text style={styles.textoEtiqueta}>PREMIUM</Text>
            </View>
          </View>
          <Text style={styles.textoTarjeta}>
            MateOS analiza tu apunte PDF y genera las preguntas de manera automática (Versión de prueba).
          </Text>
        </TouchableOpacity>

        {/* OPCIÓN 3: Ver tus cuestionarios (Estado vacío para el prototipo) */}
        <View style={styles.tarjetaOpcion}>
          <Text style={styles.tituloTarjeta}> Ver tus cuestionarios</Text>
          <Text style={styles.textoTarjeta}>
            Revisá y respondé los test que armaste previamente.
          </Text>
          
          <View style={styles.contenedorVacio}>
            <Text style={styles.textoVacio}>No tenés cuestionarios creados todavía</Text>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7F5",
  },
  content: {
    width: '100%',
    maxWidth: 500, 
    paddingHorizontal: 20, 
    paddingTop: 30, 
    flex: 1, 
    alignSelf: 'center', 
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: "#111827",
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 30,
    lineHeight: 22,
  },
  tarjetaOpcion: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.04)',
    elevation: 2, 
  },
  tituloTarjeta: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  textoTarjeta: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
  },
  tarjetaPremium: {
    borderColor: '#D4AF37', 
    backgroundColor: '#FFFCF2', 
  },
  encabezadoPremium: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 8,
  },
  tituloTarjetaIA: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B8860B', 
  },
  etiquetaPremium: {
    backgroundColor: '#D4AF37',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  textoEtiqueta: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  contenedorVacio: {
    marginTop: 15,
    padding: 16,
    borderWidth: 2,
    borderStyle: 'dashed', 
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#FBFBFB',
    alignItems: 'center',
  },
  textoVacio: {
    color: '#888888',
    fontSize: 14,
    fontWeight: '500',
  },
});