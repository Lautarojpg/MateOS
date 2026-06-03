import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, TextInput, Platform, Image, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

// Dynamically load react-native-pdf to avoid crashing in Expo Go
let Pdf: any = null;
let expoGoWarning = false;
try {
  Pdf = require("react-native-pdf").default;
} catch (e) {
  expoGoWarning = true;
}

const STORAGE_KEY = "pdf_last_page_native_IMG06_ImageRestoration";

type Props = {
  onFinalize?: () => void;
};

export default function PdfViewer({ onFinalize }: Props) {
  const source = require("../../assets/pdf/IMG06_ImageRestoration.pdf");
  
  const [initialPage, setInitialPage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageInputValue, setPageInputValue] = useState<string>("1");
  const [showFinalized, setShowFinalized] = useState(false);
  const [fadeAnim] = useState(() => new Animated.Value(0));

  // Load the last read page from AsyncStorage on mount
  useEffect(() => {
    const loadSavedPage = async () => {
      try {
        const savedPage = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedPage !== null) {
          const pageNum = parseInt(savedPage, 10);
          if (!isNaN(pageNum) && pageNum > 0) {
            setInitialPage(pageNum);
            setCurrentPage(pageNum);
            setPageInputValue(pageNum.toString());
            return;
          }
        }
        setInitialPage(1);
        setCurrentPage(1);
        setPageInputValue("1");
      } catch (e) {
        console.error("Failed to load saved page from AsyncStorage", e);
        setInitialPage(1);
        setCurrentPage(1);
        setPageInputValue("1");
      }
    };
    loadSavedPage();
  }, []);

  // Save page to AsyncStorage and update state
  const goToPage = async (page: number) => {
    if (page < 1 || (totalPages > 0 && page > totalPages)) return;
    
    setInitialPage(page);
    setCurrentPage(page);
    setPageInputValue(page.toString());
    try {
      await AsyncStorage.setItem(STORAGE_KEY, page.toString());
    } catch (e) {
      console.error("Failed to save page to AsyncStorage", e);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (totalPages === 0 || currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const handleFinalize = async () => {
    try {
      // Clear saved page in AsyncStorage so next session starts from page 1
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear page on finalize", e);
    }
    // Show the finalization overlay with sprite
    setShowFinalized(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  // After showing the finalized overlay for 2 seconds, navigate home
  useEffect(() => {
    if (!showFinalized) return;
    const timer = setTimeout(() => {
      if (onFinalize) {
        onFinalize();
      } else {
        router.replace("/");
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [showFinalized]);

  const handleInputChange = (text: string) => {
    setPageInputValue(text);
  };

  const handleInputSubmit = () => {
    const pageNum = parseInt(pageInputValue, 10);
    if (!isNaN(pageNum) && pageNum > 0 && (totalPages === 0 || pageNum <= totalPages)) {
      goToPage(pageNum);
    } else {
      setPageInputValue(currentPage.toString());
    }
  };

  // ── Finalization overlay ──────────────────────────────────────
  if (showFinalized) {
    return (
      <Animated.View style={[styles.finalizedOverlay, { opacity: fadeAnim }]}>
        <Image
          source={require("../../assets/sprite/VictorioSprite.gif")}
          style={styles.finalizedSprite}
          resizeMode="contain"
        />
        <Text style={styles.finalizedText}>🧉 Carpi se tomó 10 mates 🧉</Text>
      </Animated.View>
    );
  }

  if (expoGoWarning || !Pdf) {
    return (
      <View style={styles.container}>
        <View style={styles.controlsBar}>
          <View style={styles.docInfo}>
            <Text style={styles.icon}>📄</Text>
            <Text style={styles.docTitle} numberOfLines={1}>
              IMG06_ImageRestoration.pdf
            </Text>
          </View>
          <TouchableOpacity style={styles.finalizeBtn} onPress={handleFinalize}>
            <Text style={styles.finalizeBtnText}>Cerrar ×</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackIcon}>⚠️</Text>
          <Text style={styles.fallbackTitle}>Entorno Expo Go Detectado</Text>
          <Text style={styles.fallbackText}>
            El visor de PDF nativo utiliza librerías de sistema (`react-native-pdf`) que no están integradas en la app genérica de Expo Go.
          </Text>
          
          <View style={styles.instructionCard}>
            <Text style={styles.instructionTitle}>¿Cómo probar el visor?</Text>
            <Text style={styles.instructionItem}>
              1️⃣ <Text style={styles.boldText}>Compilación de desarrollo:</Text> Ejecutá <Text style={styles.codeText}>npx expo run:android</Text> para compilar e instalar la app nativa en tu celu/emulador.
            </Text>
            <Text style={styles.instructionItem}>
              2️⃣ <Text style={styles.boldText}>Versión Web:</Text> Abrí la app en el navegador (<Text style={styles.codeText}>npm run web</Text>). El visor web está optimizado y funciona al 100%.
            </Text>
          </View>

          <TouchableOpacity style={styles.btnSecondary} onPress={handleFinalize}>
            <Text style={styles.btnSecondaryText}>Volver al Dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (initialPage === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10B981" />
        <Text style={styles.loadingText}>Cargando lector...</Text>
      </View>
    );
  }

  const isLastPage = totalPages > 0 && currentPage >= totalPages;

  return (
    <View style={styles.container}>
      {/* Premium Controls Top Bar */}
      <View style={styles.controlsBar}>
        <View style={styles.docInfo}>
          <Text style={styles.icon}>📄</Text>
          <Text style={styles.docTitle} numberOfLines={1}>
            IMG06_ImageRestoration.pdf
          </Text>
        </View>

        <View style={styles.navigation}>
          <TouchableOpacity 
            style={[styles.btn, currentPage <= 1 && styles.btnDisabled]} 
            onPress={handlePrev}
            disabled={currentPage <= 1}
          >
            <Text style={styles.btnText}>◀</Text>
          </TouchableOpacity>

          <View style={styles.pageTracker}>
            <TextInput
              style={styles.pageInput}
              value={pageInputValue}
              onChangeText={handleInputChange}
              onSubmitEditing={handleInputSubmit}
              onBlur={handleInputSubmit}
              keyboardType="number-pad"
            />
            <Text style={styles.trackerLabel}>/ {totalPages || "..."}</Text>
          </View>

          {/* Siguiente Button: disabled on the last page */}
          <TouchableOpacity 
            style={[styles.btn, isLastPage && styles.btnDisabled]} 
            onPress={handleNext}
            disabled={isLastPage}
          >
            <Text style={styles.btnText}>▶</Text>
          </TouchableOpacity>

          {/* Finalizar Button: only shown once they reach the end of the document */}
          {isLastPage && (
            <TouchableOpacity style={styles.finalizeBtn} onPress={handleFinalize}>
              <Text style={styles.finalizeBtnText}>Finalizar ✓</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.statusIndicator}>
          <View style={styles.dot} />
          <Text style={styles.statusText}>
            {isLastPage ? "Completado" : "Leyendo"}
          </Text>
        </View>
      </View>

      {/* PDF Engine (Single Page Mode) */}
      <View style={styles.pdfContainer}>
        <Pdf
          key={initialPage}
          source={source}
          page={initialPage}
          singlePage={true}
          style={styles.pdf}
          trustAllCerts={false}
          onLoadComplete={(numberOfPages) => {
            setTotalPages(numberOfPages);
          }}
          onPageChanged={(page) => {
            if (page !== currentPage) {
              setCurrentPage(page);
              setPageInputValue(page.toString());
              AsyncStorage.setItem(STORAGE_KEY, page.toString());
            }
          }}
          onError={(error) => {
            console.error("PDF load error:", error);
          }}
          activityIndicator={
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#10B981" />
            </View>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    color: "#aaa",
    fontSize: 14,
  },
  controlsBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1e1e1e",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  docInfo: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: 90,
  },
  icon: {
    fontSize: 14,
    marginRight: 4,
  },
  docTitle: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  btn: {
    backgroundColor: "#2a2a2a",
    borderWidth: 1,
    borderColor: "#444",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  btnDisabled: {
    borderColor: "#222",
    opacity: 0.4,
  },
  btnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  finalizeBtn: {
    backgroundColor: "#10B981",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  finalizeBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  pageTracker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#444",
  },
  trackerLabel: {
    color: "#aaa",
    fontSize: 12,
    marginLeft: 4,
  },
  pageInput: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    width: 25,
    padding: 0,
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
    marginRight: 4,
  },
  statusText: {
    color: "#10B981",
    fontSize: 10,
    fontWeight: "600",
  },
  pdfContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
  pdf: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#121212",
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#121212",
  },
  fallbackIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  fallbackTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  fallbackText: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  instructionCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#333",
    width: "100%",
    maxWidth: 400,
    marginBottom: 24,
    gap: 12,
  },
  instructionTitle: {
    color: "#10B981",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
  },
  instructionItem: {
    color: "#ccc",
    fontSize: 13,
    lineHeight: 18,
  },
  boldText: {
    fontWeight: "bold",
    color: "#fff",
  },
  codeText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    backgroundColor: "#2e2e2e",
    color: "#e0e0e0",
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  btnSecondary: {
    backgroundColor: "#2a2a2a",
    borderWidth: 1,
    borderColor: "#444",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnSecondaryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

  // ── Finalization overlay ──────────────────────────────────────
  finalizedOverlay: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  finalizedSprite: {
    width: 200,
    height: 200,
  },
  finalizedText: {
    color: "#10B981",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    textShadowColor: "rgba(16, 185, 129, 0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
});
