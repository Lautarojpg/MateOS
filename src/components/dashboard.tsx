import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BibliotecaScreen from "../app/apuntes";
import EnfoqueScreen from "../app/enfoque";
import TiendaScreen from "../app/tienda";
import PdfViewer from "./pdf-viewer";

// Pantallas disponibles en el dashboard
type Screen = 'inicio' | 'enfoque' | 'lector' | 'apuntes' | 'cuestionario' | 'tienda';

export default function HomeScreen() {
  // Estado local: controla qué panel se muestra, sin cambiar de página
  const [currentScreen, setCurrentScreen] = useState<Screen>('inicio');

  // Navega internamente sin salir del dashboard
  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  // Renderiza el contenido dinámico del panel derecho según el estado
  const renderMainContent = () => {
    switch (currentScreen) {
      case 'enfoque':
        // EnfoqueScreen tiene su propio ScrollView, se monta directo
        return <EnfoqueScreen />;

      case 'lector':
        // PdfViewer tiene flex:1, se adapta al panel
        return <PdfViewer />;

      case 'apuntes':
        // BibliotecaScreen tiene su propio ScrollView
        return <BibliotecaScreen onNavigate={navigateTo} />;

      case 'tienda':
        return <TiendaScreen />;

      case 'inicio':
      default:
        return (
          <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.mainPanelContent}>
            {/* Fila de 4 Tarjetas de Métricas Superiores */}
            <View style={styles.metricsRow}>
              <View style={[styles.metricCard, { backgroundColor: '#E8F5E9' }]}>
                <Text style={styles.metricIcon}>⏱️</Text>
                <View>
                  <Text style={styles.metricValue}>0</Text>
                  <Text style={styles.metricLabel}>min hoy</Text>
                </View>
              </View>

              <View style={[styles.metricCard, { backgroundColor: '#EFEBE9' }]}>
                <Text style={styles.metricIcon}>🎯</Text>
                <View>
                  <Text style={styles.metricValue}>0%</Text>
                  <Text style={styles.metricLabel}>enfoque</Text>
                </View>
              </View>

              <View style={[styles.metricCard, { backgroundColor: '#E8F5E9' }]}>
                <Text style={styles.metricIcon}>✅</Text>
                <View>
                  <Text style={styles.metricValue}>0</Text>
                  <Text style={styles.metricLabel}>completadas</Text>
                </View>
              </View>

              <View style={[styles.metricCard, { backgroundColor: '#FDF5E6' }]}>
                <Text style={styles.metricIcon}>⚠️</Text>
                <View>
                  <Text style={styles.metricValue}>0</Text>
                  <Text style={styles.metricLabel}>pendientes</Text>
                </View>
              </View>
            </View>

            {/* Sección de Acciones Rápidas */}
            <View style={styles.actionsContainer}>
              <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
              <Text style={styles.sectionSubtitle}>Accede rápidamente a las funciones principales</Text>

              <View style={styles.gridAcciones}>
                <TouchableOpacity style={styles.actionButton} onPress={() => navigateTo('enfoque')}>
                  <Text style={styles.actionButtonText}>🎯 Modo Enfoque</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => navigateTo('lector')}>
                  <Text style={styles.actionButtonText}>📖 Leer PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => navigateTo('apuntes')}>
                  <Text style={styles.actionButtonText}>📚 Apuntes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => navigateTo('tienda')}>
                  <Text style={styles.actionButtonText}> 🎓 Tienda</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );
    }
  };

  return (
    <View style={styles.container}>

      {/* ── HEADER SUPERIOR (ESTÁTICO) ── */}
      <View style={styles.header}>
        <Text style={styles.logo}>Inicio</Text>

        <View style={styles.headerActions}>
          <View style={[styles.headerBadge, { backgroundColor: '#F0E6D2' }]}>
            <Text style={styles.badgeTextBrown}>🧉 0</Text>
          </View>
          <View style={[styles.headerBadge, { backgroundColor: '#FFEBE0' }]}>
            <Text style={styles.badgeTextOrange}>🔥 1 días</Text>
          </View>
        </View>
      </View>

      {/* ── CUERPO PRINCIPAL (SIDEBAR + PANEL) ── */}
      <View style={styles.contentBody}>

        {/* ── SIDEBAR IZQUIERDO (ESTÁTICO) ── */}
        <View style={styles.sidebar}>

          {/* Info del Compañero (Carpi) */}
          <View style={styles.profileSection}>
            <View style={styles.avatarPlaceholder}>
              <Image
                source={require('../../assets/sprite/carpincho.gif')}
                style={styles.spriteImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.username}>Carpi</Text>
            <Text style={styles.subtext}>Por Nacer - Nivel 1</Text>
            <Text style={styles.statsMini}>⚡ 100%  🧉 0 XP</Text>
          </View>

          <View style={styles.divider} />

          {/* Menú de Navegación – ahora actualiza estado local */}
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={[styles.menuItem, currentScreen === 'inicio' && styles.menuItemActive]}
              onPress={() => navigateTo('inicio')}
            >
              <Text style={[styles.menuText, currentScreen === 'inicio' && styles.menuTextActive]}>🏠 Inicio</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem, currentScreen === 'enfoque' && styles.menuItemActive]}
              onPress={() => navigateTo('enfoque')}
            >
              <Text style={[styles.menuText, currentScreen === 'enfoque' && styles.menuTextActive]}>🎯 Enfoque</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem, currentScreen === 'apuntes' && styles.menuItemActive]}
              onPress={() => navigateTo('apuntes')}
            >
              <Text style={[styles.menuText, currentScreen === 'apuntes' && styles.menuTextActive]}>📚 Apuntes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem, currentScreen === 'lector' && styles.menuItemActive]}
              onPress={() => navigateTo('lector')}
            >
              <Text style={[styles.menuText, currentScreen === 'lector' && styles.menuTextActive]}>📖 Lector</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.menuItem, currentScreen === 'tienda' && styles.menuItemActive]}
              onPress={() => navigateTo('tienda')}
            >
              <Text style={[styles.menuText, currentScreen === 'tienda' && styles.menuTextActive]}>🎓 Tienda</Text>
            </TouchableOpacity>
          </View>

          {/* Logo inferior */}
          <View style={styles.sidebarFooter}>
            <Text style={styles.footerLogo}>MateOS</Text>
            <Text style={styles.footerSubtext}>Tu compañero de estudio</Text>
          </View>
        </View>

        {/* ── PANEL PRINCIPAL DERECHO (DINÁMICO) ── */}
        {/* View con flex:1 para que cada pantalla ocupe todo el espacio */}
        <View style={styles.mainPanel}>
          {renderMainContent()}
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F1EA",
  },
  header: {
    height: 65,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 2,
    borderBottomColor: "#000000",
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1B5E20",
  },
  headerActions: {
    flexDirection: "row",
    gap: 10,
  },
  headerBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeTextBrown: {
    color: '#5D4037',
    fontWeight: '700',
  },
  badgeTextOrange: {
    color: '#E65100',
    fontWeight: '700',
  },
  contentBody: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 260,
    backgroundColor: "#FFFFFF",
    borderRightWidth: 2,
    borderRightColor: "#000000",
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  avatarPlaceholder: {
    width: 85,
    height: 85,
    borderRadius: 12,
    backgroundColor: '#EFEBE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  spriteImage: {
    width: "100%",
    height: "100%",
  },
  username: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E1C0C',
  },
  subtext: {
    fontSize: 12,
    color: '#795548',
    marginBottom: 6,
  },
  statsMini: {
    fontSize: 11,
    color: '#000000',
    fontWeight: '500',
  },
  divider: {
    height: 2,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  menuContainer: {
    paddingHorizontal: 15,
    flex: 1,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 4,
  },
  menuItemActive: {
    backgroundColor: '#2E7D32',
  },
  menuText: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '600',
  },
  menuTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  sidebarFooter: {
    padding: 20,
    borderTopWidth: 2,
    borderTopColor: '#000',
    alignItems: 'center',
  },
  footerLogo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
  },
  footerSubtext: {
    fontSize: 11,
    color: '#795548',
  },
  // El panel principal ahora es un View con flex:1
  // Cada pantalla maneja su propio scroll internamente
  mainPanel: {
    flex: 1,
  },
  mainPanelContent: {
    padding: 24,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    borderWidth: 2,
    borderColor: '#000000',
  },
  metricIcon: {
    fontSize: 20,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
  },
  metricLabel: {
    fontSize: 12,
    color: '#2E1C0C',
    fontWeight: '600',
  },
  actionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    borderWidth: 2,
    borderColor: '#000000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#5D4037',
    marginBottom: 20,
  },
  gridAcciones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    minWidth: 150,
    height: 60,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
});