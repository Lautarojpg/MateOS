import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      {/* HEADER SUPERIOR */}
      <View style={styles.header}>
        <Text style={styles.logo}>Inicio</Text>

        <View style={styles.headerActions}>
          <View style={[styles.headerBadge, { backgroundColor: '#F0E6D2', borderColor: '#000', borderWidth: 1 }]}>
            <Text style={styles.badgeTextBrown}>🧉 0</Text>
          </View>
          <View style={[styles.headerBadge, { backgroundColor: '#FFEBE0', borderColor: '#000', borderWidth: 1 }]}>
            <Text style={styles.badgeTextOrange}>🔥 1 días</Text>
          </View>
        </View>
      </View>

      {/* CUERPO PRINCIPAL (SIDEBAR + CONTENIDO) */}
      <View style={styles.contentBody}>

        {/* SIDEBAR IZQUIERDO (Limpio, sin bordes toscos de botones) */}
        <View style={styles.sidebar}>
          
          {/* Info del Compañero (Carpi) */}
          <View style={styles.profileSection}>
            <View style={styles.avatarPlaceholder}>
              {/* RUTA DE TU SPRITE: Cambiá este require por la ruta local de tu PNG exportado */}
              <Image 
                source={require('../../assets/sprite/carpincho.gif')}
                style={styles.spriteImage}
                resizeMode="contain" 
              />
            </View>
            <Text style={styles.username}>Carpi</Text>
            <Text style={styles.subtext}>Por Nacer - Nivel 1</Text>
            <Text style={styles.statsMini}>⚡ 100%  🧉0 XP</Text>
          </View>

          <View style={styles.divider} />

          {/* Menú de Navegación */}
          <View style={styles.menuContainer}>
            <TouchableOpacity style={[styles.menuItem, styles.menuItemActive]}>
              <Text style={[styles.menuText, styles.menuTextActive]}>🏠 Inicio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>🎯 Enfoque</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>📅 Calendario</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>📖 Lector</Text>
            </TouchableOpacity>
          </View>

          {/* Logo inferior */}
          <View style={styles.sidebarFooter}>
            <Text style={styles.footerLogo}>MateOS</Text>
            <Text style={styles.footerSubtext}>Tu compañero de estudio</Text>
          </View>
        </View>

        {/* PANEL PRINCIPAL DERECHO */}
        <ScrollView style={styles.mainPanel} contentContainerStyle={styles.mainPanelContent}>
          
          {/* Fila de 4 Tarjetas de Métricas Superiores (Con bordes negros marcados) */}
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

          {/* Sección de Contenido Inferior (Acciones Rápidas) */}
          <View style={styles.actionsContainer}>
            <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
            <Text style={styles.sectionSubtitle}>Accede rápidamente a las funciones principales</Text>

            <View style={styles.gridAcciones}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>🎯 Modo Enfoque</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>📖 Leer PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>📅 Calendario</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F1EA", // Fondo marfil/marrón muy suave para calidez
  },
  header: {
    height: 65,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 2,
    borderBottomColor: "#000000", // Borde negro nítido inferior
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1B5E20", // Verde bosque oscuro
  },
  headerActions: {
    flexDirection: "row",
    gap: 10,
  },
  headerBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8, // Badges más rectangulares para un look estructurado
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeTextBrown: { 
    color: '#5D4037', 
    fontWeight: '700' 
  },
  badgeTextOrange: { 
    color: '#E65100', 
    fontWeight: '700' 
  },
  badgeTextGreen: { 
    color: '#2E7D32', 
    fontWeight: '700' 
  },
  contentBody: {
    flex: 1,
    flexDirection: "row",
  },
  
  // SIDEBAR STYLES (Sin bordes en botones individuales)
  sidebar: {
    width: 260,
    backgroundColor: "#FFFFFF",
    borderRightWidth: 2,
    borderRightColor: "#000000", // Separación principal bien definida
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
    backgroundColor: '#EFEBE9', // Fondo marrón grisáceo suave
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
    color: '#2E1C0C', // Marrón oscuro
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
    backgroundColor: '#000000',
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
    backgroundColor: '#2E7D32', // Verde activo
  },
  menuText: {
    fontSize: 15,
    color: '#000000', // Texto del menú en negro
    fontWeight: '600',
  },
  menuTextActive: {
    color: '#FFFFFF', // Texto activo en blanco sobre fondo verde
    fontWeight: '700',
  },
  sidebarFooter: {
    padding: 20,
    borderTopWidth: 2,
    borderTopColor: '#000000',
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

  // MAIN PANEL STYLES
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
    borderColor: '#000000', // Borde negro marcado para las métricas
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

  // ACCIONES RAPIDAS (Con bordes negros limpios)
  actionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    borderWidth: 2,
    borderColor: '#000000', // Borde negro marcado
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
    borderColor: '#000000', // Botones del panel con borde negro nítido
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