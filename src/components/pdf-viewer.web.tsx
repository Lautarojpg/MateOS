import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image, Animated } from "react-native";
import { router } from "expo-router";

const STORAGE_KEY = "pdf_last_page_web_IMG06_ImageRestoration";

export default function PdfViewer() {
  const pdfAsset = require("../../assets/pdf/IMG06_ImageRestoration.pdf");
  
  // Robust resolving for Metro web asset format
  const pdfUrl = typeof pdfAsset === "string" 
    ? pdfAsset 
    : pdfAsset?.uri || pdfAsset?.default || "/assets/pdf/IMG06_ImageRestoration.pdf";

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageInputValue, setPageInputValue] = useState<string>("1");
  const [showFinalized, setShowFinalized] = useState(false);
  const [fadeAnim] = useState(() => new Animated.Value(0));

  // Load last saved page from localStorage on mount
  useEffect(() => {
    try {
      const savedPage = localStorage.getItem(STORAGE_KEY);
      if (savedPage) {
        const pageNum = parseInt(savedPage, 10);
        if (!isNaN(pageNum) && pageNum > 0) {
          setCurrentPage(pageNum);
          setPageInputValue(pageNum.toString());
        }
      }
    } catch (e) {
      console.error("Failed to load page from localStorage", e);
    }
  }, []);

  // Dynamically detect total pages by fetching PDF asset in browser
  useEffect(() => {
    const detectPages = async () => {
      try {
        const response = await fetch(pdfUrl);
        const text = await response.text();
        const matches = text.match(/\/Type\s*\/Page\b/g);
        if (matches) {
          setTotalPages(matches.length);
        } else {
          const countMatch = text.match(/\/Count\s+(\d+)/);
          if (countMatch && countMatch[1]) {
            setTotalPages(parseInt(countMatch[1], 10));
          } else {
            setTotalPages(18); // Safe fallback for this specific slides PDF
          }
        }
      } catch (e) {
        console.error("Failed to parse PDF page count on web", e);
        setTotalPages(18); // Safe fallback
      }
    };
    detectPages();
  }, [pdfUrl]);

  // Save page to localStorage and update state
  const goToPage = (page: number) => {
    if (page < 1 || (totalPages > 0 && page > totalPages)) return;
    setCurrentPage(page);
    setPageInputValue(page.toString());
    try {
      localStorage.setItem(STORAGE_KEY, page.toString());
    } catch (e) {
      console.error("Failed to save page to localStorage", e);
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

  const handleFinalize = () => {
    try {
      // Clear saved page in localStorage so next session starts from page 1
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear page from localStorage on finalize", e);
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
      router.replace("/");
    }, 2000);
    return () => clearTimeout(timer);
  }, [showFinalized]);

  // We append standard PDF open parameters:
  // - page=currentPage (displays only that specific page)
  // - toolbar=0 (hides standard print/download/nav controls)
  // - navpanes=0 (hides thumbnails/bookmarks pane)
  // - scrollbar=0 (hides standard view scrollbar)
  // - view=Fit (Fits the entire page—both width and height—inside the container cleanly)
  const fullIframeUrl = `${pdfUrl}#page=${currentPage}&toolbar=0&navpanes=0&scrollbar=0&view=Fit`;

  const isLastPage = totalPages > 0 && currentPage >= totalPages;

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
            <Text style={styles.btnText}>◀ Anterior</Text>
          </TouchableOpacity>

          <View style={styles.pageTracker}>
            <Text style={styles.trackerLabel}>Pág.</Text>
            <TextInput
              style={styles.pageInput}
              value={pageInputValue}
              onChangeText={handleInputChange}
              onSubmitEditing={handleInputSubmit}
              onBlur={handleInputSubmit}
              keyboardType="number-pad"
            />
            <Text style={styles.trackerTotal}>/ {totalPages || "..."}</Text>
          </View>

          {/* Siguiente Button: disabled if we are on the last page */}
          <TouchableOpacity 
            style={[styles.btn, isLastPage && styles.btnDisabled]} 
            onPress={handleNext}
            disabled={isLastPage}
          >
            <Text style={styles.btnText}>Siguiente ▶</Text>
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
            {isLastPage ? "Lectura completada" : "Leyendo ahora"}
          </Text>
        </View>
      </View>

      {/* Embedded Iframe Container with Absolute Transparent Overlay */}
      <View style={styles.iframeContainer}>
        <iframe
          key={currentPage} // Forces iframe to reload to load the specific page parameter
          src={fullIframeUrl}
          width="100%"
          height="100%"
          style={{
            border: "none",
            backgroundColor: "#1e1e1e",
          }}
          title="Visualizador de PDF"
        />
        {/* Absolute transparent overlay blocking all mouse/touch scroll & click interactions within the iframe */}
        <View style={styles.overlay} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    width: "100%",
    height: "100%",
  },
  controlsBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1e1e1e",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexWrap: "wrap",
    gap: 12,
  },
  docInfo: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: 250,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  docTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  btn: {
    backgroundColor: "#2a2a2a",
    borderWidth: 1,
    borderColor: "#444",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btnDisabled: {
    borderColor: "#222",
    opacity: 0.4,
  },
  btnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  finalizeBtn: {
    backgroundColor: "#10B981",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  finalizeBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  pageTracker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  trackerLabel: {
    color: "#aaa",
    fontSize: 13,
    marginRight: 6,
  },
  trackerTotal: {
    color: "#aaa",
    fontSize: 13,
    marginLeft: 6,
  },
  pageInput: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    width: 40,
    padding: 0,
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
    marginRight: 6,
  },
  statusText: {
    color: "#10B981",
    fontSize: 12,
    fontWeight: "600",
  },
  iframeContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative", // Required to position the absolute overlay correctly
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 10,
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
    width: 220,
    height: 220,
  },
  finalizedText: {
    color: "#10B981",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    textShadowColor: "rgba(16, 185, 129, 0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
});
