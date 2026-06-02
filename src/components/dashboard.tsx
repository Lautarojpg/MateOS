import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity, useWindowDimensions, View
} from "react-native";
import BibliotecaScreen from "../app/apuntes";
import EnfoqueScreen from "../app/enfoque";
import MenuCuestionarioScreen from "../app/menuCuestionario";
import TiendaScreen from "../app/tienda";
import PdfViewer from "../app/lector";
import TemporizadorScreen from "../app/temporizador";
import CrearCuestionarioScreen from "../app/crearCuestionario";
import CuestionarioPlayScreen from "../app/cuestionario";
import MascotaCelular from "../app/mascotaCelular";
// ── Tipos ──────────────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { screen: "inicio", icon: "🏠", label: "Inicio" },
  { screen: "enfoque", icon: "🎯", label: "Enfoque" },
  { screen: "apuntes", icon: "📚", label: "Apuntes" },
  { screen: "cuestionario", icon: "❓", label: "Cuestionarios" },
  { screen: "tienda", icon: "🛒", label: "Tienda" },
] as const;

type Screen = typeof MENU_ITEMS[number]["screen"] | "lector" | "mascota" | "temporizador" | "crearCuestionario" | "cuestionarioPlay";
type TipoEvento = "parcial" | "entrega" | "coloquio" | "clase" | "reunion";

type Evento = {
  id: number;
  titulo: string;
  materia: string;
  tipo: TipoEvento;
  hora: string;
};

type EventosMap = { [dia: number]: Evento[] };

// ── Datos iniciales ────────────────────────────────────────────────────────────
const EVENTOS_INICIALES: EventosMap = {
  3: [{ id: 1, titulo: "Parcial Química", materia: "Química", tipo: "parcial", hora: "09:00" }],
  5: [{ id: 2, titulo: "Entrega TP Cálculo", materia: "Cálculo Diferencial", tipo: "entrega", hora: "23:59" }],
  10: [
    { id: 3, titulo: "Parcial Matemática Discreta", materia: "Matemática Discreta", tipo: "parcial", hora: "14:00" },
    { id: 4, titulo: "Coloquio Programación I", materia: "Programación I", tipo: "coloquio", hora: "10:00" },
  ],
  12: [{ id: 5, titulo: "Entrega Proyecto BD", materia: "Base de Datos", tipo: "entrega", hora: "18:00" }],
  17: [{ id: 6, titulo: "Parcial Física II", materia: "Física II", tipo: "parcial", hora: "08:00" }],
  20: [{ id: 7, titulo: "Entrega Informe Lab", materia: "Laboratorio", tipo: "entrega", hora: "20:00" }],
  24: [
    { id: 8, titulo: "Parcial Sistemas Operativos", materia: "Sistemas Operativos", tipo: "parcial", hora: "16:00" },
    { id: 9, titulo: "Reunión de Grupo Proyecto", materia: "Ingeniería de Software", tipo: "reunion", hora: "12:00" },
  ],
  27: [{ id: 10, titulo: "Coloquio Álgebra", materia: "Álgebra Lineal", tipo: "coloquio", hora: "09:30" }],
  30: [{ id: 11, titulo: "Entrega TP Final Redes", materia: "Redes de Computadoras", tipo: "entrega", hora: "23:59" }],
};

// ── Helpers visuales ──────────────────────────────────────────────────────────
const TIPO_CONFIG: Record<TipoEvento, { bg: string; border: string; text: string; label: string; emoji: string }> = {
  parcial: { bg: "#FFF3E0", border: "#FB8C00", text: "#E65100", label: "Parcial", emoji: "📝" },
  entrega: { bg: "#E8F5E9", border: "#43A047", text: "#2E7D32", label: "Entrega", emoji: "📤" },
  coloquio: { bg: "#EDE7F6", border: "#7E57C2", text: "#4527A0", label: "Coloquio", emoji: "🎓" },
  clase: { bg: "#E3F2FD", border: "#1E88E5", text: "#1565C0", label: "Clase", emoji: "📚" },
  reunion: { bg: "#FCE4EC", border: "#E91E63", text: "#880E4F", label: "Reunión", emoji: "👥" },
};

const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const JUNIO_INICIO = 0;
const DIAS_JUNIO = 30;
let nextId = 100;

// ══════════════════════════════════════════════════════════════════════════════
// Componentes extraídos FUERA de HomeScreen para evitar remounts al re-render
// ══════════════════════════════════════════════════════════════════════════════

// ── Modal: agregar evento ────────────────────────────────────────────────────
type ModalProps = {
  visible: boolean;
  dia: number;
  onClose: () => void;
  onSave: (ev: Omit<Evento, "id">) => void;
};

function ModalAgregarEvento({ visible, dia, onClose, onSave }: ModalProps) {
  // El estado del formulario vive aquí adentro → no depende de HomeScreen
  const [formTitulo, setFormTitulo] = useState("");
  const [formMateria, setFormMateria] = useState("");
  const [formHora, setFormHora] = useState("");
  const [formTipo, setFormTipo] = useState<TipoEvento>("entrega");

  const reset = () => {
    setFormTitulo("");
    setFormMateria("");
    setFormHora("");
    setFormTipo("entrega");
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSave = () => {
    if (!formTitulo.trim()) return;
    onSave({
      titulo: formTitulo.trim(),
      materia: formMateria.trim() || "Sin materia",
      tipo: formTipo,
      hora: formHora.trim() || "00:00",
    });
    reset();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={styles.modalCard}>
            {/* Encabezado */}
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Nuevo evento</Text>
                <Text style={styles.modalSubtitle}>{dia} de Junio 2026</Text>
              </View>
              <TouchableOpacity onPress={handleClose} style={styles.modalCloseBtn}>
                <Text style={styles.modalCloseBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Tipo */}
            <Text style={styles.modalLabel}>Tipo de evento</Text>
            <View style={styles.tipoRow}>
              {(Object.keys(TIPO_CONFIG) as TipoEvento[]).map((t) => {
                const cfg = TIPO_CONFIG[t];
                const sel = formTipo === t;
                return (
                  <TouchableOpacity
                    key={t}
                    style={[
                      styles.tipoChip,
                      { borderColor: sel ? cfg.border : "#DDD", backgroundColor: sel ? cfg.bg : "#F9F9F9" },
                    ]}
                    onPress={() => setFormTipo(t)}
                  >
                    <Text style={styles.tipoChipEmoji}>{cfg.emoji}</Text>
                    <Text style={[styles.tipoChipText, { color: sel ? cfg.text : "#666" }]}>{cfg.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Título */}
            <Text style={styles.modalLabel}>Título *</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Ej: Parcial Química Unidad 3"
              placeholderTextColor="#BDBDBD"
              value={formTitulo}
              onChangeText={setFormTitulo}
            />

            {/* Materia */}
            <Text style={styles.modalLabel}>Materia</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Ej: Química General"
              placeholderTextColor="#BDBDBD"
              value={formMateria}
              onChangeText={setFormMateria}
            />

            {/* Hora */}
            <Text style={styles.modalLabel}>Hora</Text>
            <TextInput
              style={[styles.modalInput, { width: 120 }]}
              placeholder="09:00"
              placeholderTextColor="#BDBDBD"
              value={formHora}
              onChangeText={setFormHora}
              keyboardType="numbers-and-punctuation"
              maxLength={5}
            />

            {/* Botones */}
            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={handleClose}>
                <Text style={styles.modalCancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalSaveBtn, !formTitulo.trim() && styles.modalSaveBtnDisabled]}
                onPress={handleSave}
                disabled={!formTitulo.trim()}
              >
                <Text style={styles.modalSaveBtnText}>Guardar evento</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

// ── Calendario de junio ───────────────────────────────────────────────────────
type CalendarioProps = {
  eventos: EventosMap;
  diaSeleccionado: number;
  onSelectDay: (dia: number) => void;
  isMobile?: boolean;
};

function CalendarioJunio({
  eventos,
  diaSeleccionado,
  onSelectDay,
  isMobile = false,
}: CalendarioProps) {
  const celdas: (number | null)[] = [
    ...Array(JUNIO_INICIO).fill(null),
    ...Array.from({ length: DIAS_JUNIO }, (_, i) => i + 1),
  ];
  while (celdas.length % 7 !== 0) celdas.push(null);
  const semanas: (number | null)[][] = [];
  for (let i = 0; i < celdas.length; i += 7) semanas.push(celdas.slice(i, i + 7));

  return (
    <View style={[styles.calendarCard, isMobile && styles.calendarCardMobile]}>
      <View style={styles.calendarHeader}>
        <Text style={styles.calendarMonthTitle}> Junio 2026</Text>
      </View>

      <View style={styles.calendarWeekRow}>
        {DIAS_SEMANA.map((d) => (
          <Text key={d} style={styles.calendarWeekLabel}>{d}</Text>
        ))}
      </View>

      {semanas.map((semana, si) => (
        <View key={si} style={styles.calendarWeekRow}>
          {semana.map((dia, di) => {
            if (dia === null) return <View key={di} style={styles.calendarDayEmpty} />;
            const tieneEventos = !!eventos[dia];
            const esSeleccionado = dia === diaSeleccionado;
            const esHoy = dia === new Date().getDate();

            return (
              <TouchableOpacity
                key={di}
                style={[
                  styles.calendarDay,
                  isMobile && styles.calendarDayMobile,
                  esSeleccionado && styles.calendarDaySelected,
                  esHoy && !esSeleccionado && styles.calendarDayToday,
                ]}
                onPress={() => onSelectDay(dia)}
              >
                <Text style={[
                  styles.calendarDayText,
                  esSeleccionado && styles.calendarDayTextSelected,
                  esHoy && !esSeleccionado && styles.calendarDayTextToday,
                ]}>
                  {dia}
                </Text>
                {tieneEventos && (
                  <View style={[styles.eventDot, esSeleccionado && styles.eventDotSelected]} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

// ── Lista de eventos del día ──────────────────────────────────────────────────
type ListaProps = {
  eventos: EventosMap;
  diaSeleccionado: number;
  onDelete: (dia: number, id: number) => void;
  onAdd: () => void;
  isMobile?: boolean;
};

function ListaEventosDia({ eventos, diaSeleccionado, onDelete, onAdd, isMobile = false }: ListaProps) {
  const eventosDelDia = eventos[diaSeleccionado] ?? [];

  return (
    <View style={[styles.eventosCard, isMobile && styles.eventosCardMobile]}>
      {/* Encabezado */}
      <View style={styles.eventosDayHeader}>
        <Text style={styles.eventosDayNumber}>{diaSeleccionado}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.eventosDayMonth}>Junio 2026</Text>
          <Text style={styles.eventosDayCount}>
            {eventosDelDia.length === 0 ? "Sin eventos" :
              eventosDelDia.length === 1 ? "1 evento" : `${eventosDelDia.length} eventos`}
          </Text>
        </View>
        <TouchableOpacity style={styles.addEventBtn} onPress={onAdd}>
          <Text style={styles.addEventBtnText}>+ Agregar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista o estado vacío */}
      {eventosDelDia.length === 0 ? (
        <View style={styles.noEventosContainer}>
          <Text style={styles.noEventosText}>Día libre</Text>
          <Text style={styles.noEventosSubtext}>No tenés nada programado</Text>
          <TouchableOpacity style={styles.addEventBtnEmpty} onPress={onAdd}>
            <Text style={styles.addEventBtnEmptyText}>+ Agregar evento</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.eventosLista}>
          {eventosDelDia.map((ev) => {
            const cfg = TIPO_CONFIG[ev.tipo];
            return (
              <View
                key={ev.id}
                style={[styles.eventoItem, { backgroundColor: cfg.bg, borderLeftColor: cfg.border }]}
              >
                <View style={styles.eventoTopRow}>
                  <View style={styles.eventoTopLeft}>
                    <Text style={styles.eventoEmoji}>{cfg.emoji}</Text>
                    <View style={[styles.eventoChip, { borderColor: cfg.border }]}>
                      <Text style={[styles.eventoChipText, { color: cfg.text }]}>{cfg.label}</Text>
                    </View>
                  </View>
                  <View style={styles.eventoTopRight}>
                    <Text style={styles.eventoHora}>{ev.hora}</Text>
                    <TouchableOpacity onPress={() => onDelete(diaSeleccionado, ev.id)} style={styles.deleteBtn}>
                      <Text style={styles.deleteBtnText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.eventoTitulo}>{ev.titulo}</Text>
                <Text style={styles.eventoMateria}>{ev.materia}</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// Componente principal
// ══════════════════════════════════════════════════════════════════════════════
export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [currentScreen, setCurrentScreen] = useState<Screen>("inicio");
  const [screenParams, setScreenParams] = useState<any>(null);
  const [diaSeleccionado, setDiaSeleccionado] = useState<number>(new Date().getDate());
  const [eventos, setEventos] = useState<EventosMap>(EVENTOS_INICIALES);
  const [modalVisible, setModalVisible] = useState(false);

  const navigateTo = (screen: Screen, params?: any) => {
    setCurrentScreen(screen);
    setScreenParams(params);
  };

  const handleAgregarEvento = (ev: Omit<Evento, "id">) => {
    const nuevo: Evento = { id: nextId++, ...ev };
    setEventos((prev) => ({
      ...prev,
      [diaSeleccionado]: [...(prev[diaSeleccionado] ?? []), nuevo],
    }));
    setModalVisible(false);
  };

  const handleBorrarEvento = (dia: number, id: number) => {
    setEventos((prev) => {
      const filtrados = (prev[dia] ?? []).filter((e) => e.id !== id);
      const updated = { ...prev };
      if (filtrados.length === 0) delete updated[dia];
      else updated[dia] = filtrados;
      return updated;
    });
  };

  const renderMainContent = () => {
    switch (currentScreen) {
      case "enfoque": return <EnfoqueScreen onNavigate={(s, p) => navigateTo(s as Screen, p)} />;
      case "temporizador":
        return (
          <TemporizadorScreen
            minutos={screenParams?.minutos}
            modo={screenParams?.modo}
            materia={screenParams?.materia}
            onFinalize={() => navigateTo("enfoque")}
          />
        );
      case "lector": return <PdfViewer onFinalize={() => navigateTo("apuntes")} />;
      case "apuntes": return <BibliotecaScreen onNavigate={(s) => navigateTo(s as Screen)} />;
      case "cuestionario": return <MenuCuestionarioScreen onNavigate={(s) => navigateTo(s as Screen)} />;
      case "crearCuestionario":
        return <CrearCuestionarioScreen onFinalize={() => navigateTo("cuestionario")} />;
      case "cuestionarioPlay":
        return <CuestionarioPlayScreen onFinalize={() => navigateTo("cuestionario")} />;
      case "tienda": return <TiendaScreen />;
      case "mascota":
        return <MascotaCelular onFinalize={() => navigateTo("inicio")} />;
      default:
        return (
          <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.mainPanelContent}>
            {/* Métricas */}
            <View
              style={[
                styles.metricsRow,
                isMobile && styles.metricsRowMobile,
              ]}
            >
              {[
                { icon: "⏱️", val: "0", lbl: "min hoy", bg: "#E8F5E9" },
                { icon: "🎯", val: "0%", lbl: "enfoque", bg: "#EFEBE9" },
                { icon: "✅", val: "0", lbl: "completadas", bg: "#E8F5E9" },
                { icon: "⚠️", val: "0", lbl: "pendientes", bg: "#FDF5E6" },
              ].map((m) => (
                <View key={m.lbl} style={[styles.metricCard, { backgroundColor: m.bg }]}>
                  <Text style={styles.metricIcon}>{m.icon}</Text>
                  <View>
                    <Text style={styles.metricValue}>{m.val}</Text>
                    <Text style={styles.metricLabel}>{m.lbl}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Calendario + lista de eventos */}
            <View
              style={[
                styles.calendarSection,
                isMobile && styles.calendarSectionMobile,
              ]}
            >
              <ListaEventosDia
                eventos={eventos}
                diaSeleccionado={diaSeleccionado}
                onDelete={handleBorrarEvento}
                onAdd={() => setModalVisible(true)}
                isMobile={isMobile}
              />
              <CalendarioJunio
                eventos={eventos}
                diaSeleccionado={diaSeleccionado}
                onSelectDay={setDiaSeleccionado}
                isMobile={isMobile}
              />
            </View>
          </ScrollView>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Modal vive al nivel raíz, no dentro del scroll */}
      <ModalAgregarEvento
        visible={modalVisible}
        dia={diaSeleccionado}
        onClose={() => setModalVisible(false)}
        onSave={handleAgregarEvento}
      />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>Inicio</Text>
        <View style={styles.headerActions}>
          <View style={[styles.headerBadge, { backgroundColor: "#F0E6D2" }]}>
            <Text style={styles.badgeTextBrown}>🧉 0</Text>
          </View>
          <View style={[styles.headerBadge, { backgroundColor: "#FFEBE0" }]}>
            <Text style={styles.badgeTextOrange}>🔥 1 días</Text>
          </View>
        </View>
      </View>

      {/* BODY */}
      <View
        style={[
          styles.contentBody,
          isMobile && styles.contentBodyMobile,
        ]}
      >
        {/* SIDEBAR (Desktop only) */}
        {!isMobile && (
          <View style={styles.sidebar}>
            <View style={styles.profileSection}>
              <View style={styles.avatarPlaceholder}>
                <Image
                  source={require("../../assets/sprite/carpincho.gif")}
                  style={styles.spriteImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.username}>Carpi</Text>
              <Text style={styles.subtext}>Por Nacer - Nivel 1</Text>
              <Text style={styles.statsMini}>⚡ 100%  🧉 0 XP</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.menuContainer}>
              {MENU_ITEMS.map(({ screen, icon, label }) => (
                <TouchableOpacity
                  key={screen}
                  style={[styles.menuItem, currentScreen === screen && styles.menuItemActive]}
                  onPress={() => navigateTo(screen)}
                >
                  <Text style={[styles.menuText, currentScreen === screen && styles.menuTextActive]}>
                    {icon} {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.sidebarFooter}>
              <Text style={styles.footerLogo}>MateOS</Text>
              <Text style={styles.footerSubtext}>Tu compañero de estudio</Text>
            </View>
          </View>
        )}

        {/* PANEL DINÁMICO */}
        <View
          style={[
            styles.mainPanel,
            isMobile && styles.mainPanelMobile,
          ]}
        >
          {renderMainContent()}
        </View>
      </View>

      {/* BOTTOM NAVBAR (Mobile only) */}
      {isMobile && (
        <View style={styles.bottomNavbar}>
          {MENU_ITEMS.map(({ screen, icon, label }) => {
            const isTabActive = currentScreen === screen;
            return (
              <TouchableOpacity
                key={screen}
                style={[styles.navbarItem, isTabActive && styles.navbarItemActive]}
                onPress={() => navigateTo(screen)}
              >
                <Text style={[styles.navbarIcon, isTabActive && styles.navbarIconActive]}>{icon}</Text>
                <Text style={[styles.navbarLabel, isTabActive && styles.navbarLabelActive]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
          {/* Mascot Tab */}
          <TouchableOpacity
            style={[styles.navbarItem, currentScreen === "mascota" && styles.navbarItemActive]}
            onPress={() => navigateTo("mascota")}
          >
            <Text style={[styles.navbarIcon, currentScreen === "mascota" && styles.navbarIconActive]}>🐹</Text>
            <Text style={[styles.navbarLabel, currentScreen === "mascota" && styles.navbarLabelActive]}>
              Mascota
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// ── Estilos ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F1EA" },
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
  logo: { fontSize: 20, fontWeight: "700", color: "#1B5E20" },
  headerActions: { flexDirection: "row", gap: 10 },
  headerBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  badgeTextBrown: { color: "#5D4037", fontWeight: "700" },
  badgeTextOrange: { color: "#E65100", fontWeight: "700" },
  contentBody: { flex: 1, flexDirection: "row" },
  mainPanel: { flex: 1 },
  mainPanelContent: { padding: 20 },

  // Sidebar
  sidebar: {
  width: 260,
  maxWidth: "100%",
  backgroundColor: "#FFFFFF",
  borderRightWidth: 2,
  borderRightColor: "#000000",
  paddingTop: 20,
  justifyContent: "space-between",
},
  profileSection: { alignItems: "center", paddingHorizontal: 20, marginBottom: 15 },
  avatarPlaceholder: { width: 85, height: 85, borderRadius: 12, backgroundColor: "#EFEBE9", justifyContent: "center", alignItems: "center", marginBottom: 10, overflow: "hidden" },
  spriteImage: { width: "100%", height: "100%" },
  username: { fontSize: 16, fontWeight: "700", color: "#2E1C0C" },
  subtext: { fontSize: 12, color: "#795548", marginBottom: 6 },
  statsMini: { fontSize: 11, color: "#000000", fontWeight: "500" },
  divider: { height: 2, backgroundColor: "#F0F0F0", marginVertical: 10, marginHorizontal: 15 },
  menuContainer: { paddingHorizontal: 15, flex: 1 },
  menuItem: { paddingVertical: 12, paddingHorizontal: 15, borderRadius: 8, marginBottom: 4 },
  menuItemActive: { backgroundColor: "#2E7D32" },
  menuText: { fontSize: 15, color: "#000000", fontWeight: "600" },
  menuTextActive: { color: "#FFFFFF", fontWeight: "700" },
  sidebarFooter: { padding: 20, borderTopWidth: 2, borderTopColor: "#000", alignItems: "center" },
  footerLogo: { fontSize: 16, fontWeight: "700", color: "#2E7D32" },
  footerSubtext: { fontSize: 11, color: "#795548" },

  // Métricas
  metricsRow: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 12,
  marginBottom: 20,
},
  metricCard: { flexBasis: "48%", flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 12, gap: 10, borderWidth: 2, borderColor: "#000000" },
  metricIcon: { fontSize: 20 },
  metricValue: { fontSize: 20, fontWeight: "700", color: "#000000" },
  metricLabel: { fontSize: 11, color: "#2E1C0C", fontWeight: "600" },

  // Layout calendario
  calendarSection: { flexDirection: "row", gap: 16, alignItems: "flex-start" },

  // Card eventos
  eventosCard: { flex: 1, backgroundColor: "#FFFFFF", borderRadius: 14, borderWidth: 2, borderColor: "#000000", padding: 18, minHeight: 340 },
  eventosDayHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: "#E0E0E0" },
  eventosDayNumber: { fontSize: 40, fontWeight: "900", color: "#2E7D32", lineHeight: 44 },
  eventosDayMonth: { fontSize: 14, fontWeight: "700", color: "#1B1B1B" },
  eventosDayCount: { fontSize: 12, color: "#777", marginTop: 2 },
  addEventBtn: { backgroundColor: "#2E7D32", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  addEventBtnText: { color: "#FFF", fontSize: 13, fontWeight: "700" },
  eventosLista: { gap: 10 },
  eventoItem: { borderRadius: 10, borderLeftWidth: 4, padding: 12 },
  eventoTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 },
  eventoTopLeft: { flexDirection: "row", alignItems: "center", gap: 6 },
  eventoTopRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  eventoEmoji: { fontSize: 14 },
  eventoChip: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
  eventoChipText: { fontSize: 11, fontWeight: "700" },
  eventoHora: { fontSize: 12, color: "#555", fontWeight: "600" },
  deleteBtn: { width: 22, height: 22, borderRadius: 11, backgroundColor: "rgba(0,0,0,0.07)", justifyContent: "center", alignItems: "center" },
  deleteBtnText: { fontSize: 10, color: "#888", fontWeight: "700" },
  eventoTitulo: { fontSize: 14, fontWeight: "700", color: "#1B1B1B", marginBottom: 2 },
  eventoMateria: { fontSize: 12, color: "#666" },
  noEventosContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 40, gap: 6 },
  noEventosIcon: { fontSize: 40 },
  noEventosText: { fontSize: 18, fontWeight: "700", color: "#333" },
  noEventosSubtext: { fontSize: 13, color: "#888", marginBottom: 8 },
  addEventBtnEmpty: { marginTop: 10, backgroundColor: "#2E7D32", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  addEventBtnEmptyText: { color: "#FFF", fontWeight: "700", fontSize: 14 },

  // Card calendario
  calendarCard: { flex: 1.2, backgroundColor: "#FFFFFF", borderRadius: 14, borderWidth: 2, borderColor: "#000000", padding: 12 },
  calendarHeader: { marginBottom: 8, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: "#E0E0E0" },
  calendarMonthTitle: { fontSize: 17, fontWeight: "800", color: "#1B1B1B" },
  calendarWeekRow: { flexDirection: "row", marginBottom: 2 },
  calendarWeekLabel: { flex: 1, textAlign: "center", fontSize: 10, fontWeight: "700", color: "#888", paddingVertical: 3 },
  calendarDay: { flex: 1, height: 70, justifyContent: "center", alignItems: "center", borderRadius: 6, margin: 1 },
  calendarDayEmpty: { flex: 1, margin: 1 },
  calendarDaySelected: { backgroundColor: "#2E7D32" },
  calendarDayToday: { backgroundColor: "#E8F5E9", borderWidth: 2, borderColor: "#2E7D32" },
  calendarDayText: { fontSize: 11, fontWeight: "500", color: "#333" },
  calendarDayTextSelected: { color: "#FFFFFF", fontWeight: "800" },
  calendarDayTextToday: { color: "#2E7D32", fontWeight: "800" },
  eventDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: "#FB8C00", marginTop: 2 },
  eventDotSelected: { backgroundColor: "#FFFFFF" },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "center", alignItems: "center", padding: 20 },
  modalCard: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 28, width: "100%", maxWidth: 480, borderWidth: 2, borderColor: "#000" },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: "800", color: "#111" },
  modalSubtitle: { fontSize: 13, color: "#2E7D32", fontWeight: "600", marginTop: 2 },
  modalCloseBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: "#F0F0F0", justifyContent: "center", alignItems: "center" },
  modalCloseBtnText: { fontSize: 14, color: "#555", fontWeight: "700" },
  modalLabel: { fontSize: 13, fontWeight: "700", color: "#333", marginBottom: 8, marginTop: 14 },
  modalInput: { backgroundColor: "#F5F5F5", borderRadius: 10, padding: 12, fontSize: 15, borderWidth: 1.5, borderColor: "#E0E0E0", color: "#111" },
  tipoRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tipoChip: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1.5 },
  tipoChipEmoji: { fontSize: 14 },
  tipoChipText: { fontSize: 12, fontWeight: "700" },
  modalBtns: { flexDirection: "row", gap: 12, marginTop: 24 },
  modalCancelBtn: { flex: 1, paddingVertical: 13, borderRadius: 10, borderWidth: 1.5, borderColor: "#DDD", alignItems: "center" },
  modalCancelBtnText: { fontSize: 15, fontWeight: "600", color: "#555" },
  modalSaveBtn: { flex: 2, paddingVertical: 13, borderRadius: 10, backgroundColor: "#2E7D32", alignItems: "center" },
  modalSaveBtnDisabled: { backgroundColor: "#BDBDBD" },
  modalSaveBtnText: { fontSize: 15, fontWeight: "700", color: "#FFF" },

contentBodyMobile: {
  flexDirection: "column",
},

sidebarMobile: {
  width: "100%",
  borderRightWidth: 0,
  borderBottomWidth: 2,
  borderBottomColor: "#000",
  paddingBottom: 15,
},

mainPanelMobile: {
  width: "100%",
},

metricsRowMobile: {
  flexWrap: "wrap",
},

calendarSectionMobile: {
  flexDirection: "column",
},

calendarDayMobile: {
  height: 45,
},

  // Bottom Navbar
  bottomNavbar: {
    height: 115,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 2,
    borderTopColor: "#000000",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 30 : 28,
  },
  calendarCardMobile: {
    width: "100%",
    padding: 8,
  },
  eventosCardMobile: {
    width: "100%",
  },
  navbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  navbarItemActive: {
    borderTopWidth: 3,
    borderTopColor: "#2E7D32",
    marginTop: -3,
  },
  navbarIcon: {
    fontSize: 18,
    color: "#666",
  },
  navbarIconActive: {
    color: "#2E7D32",
  },
  navbarLabel: {
    fontSize: 9,
    color: "#666",
    fontWeight: "600",
    marginTop: 2,
  },
  navbarLabelActive: {
    color: "#2E7D32",
    fontWeight: "700",
  },

  // Mascot Mobile View
  mascotMobileContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    backgroundColor: "#F4F1EA",
  },
  mascotMobileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#000000",
    padding: 24,
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  avatarPlaceholderMobile: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#EFEBE9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#2E7D32",
  },
  spriteImageMobile: {
    width: "80%",
    height: "80%",
  },
  usernameMobile: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2E1C0C",
    marginBottom: 4,
  },
  subtextMobile: {
    fontSize: 14,
    color: "#795548",
    fontWeight: "600",
    marginBottom: 12,
  },
  mascotDivider: {
    height: 2,
    backgroundColor: "#F0F0F0",
    width: "100%",
    marginVertical: 16,
  },
  mascotStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    gap: 12,
  },
  mascotStatItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    flex: 1,
  },
  mascotStatIcon: {
    fontSize: 20,
  },
  mascotStatValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
  },
  mascotStatLabel: {
    fontSize: 10,
    color: "#795548",
    fontWeight: "600",
  },

}); 