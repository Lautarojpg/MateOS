import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";

const STORAGE_KEY = "pdf_last_page_web_IMG06_ImageRestoration";

export default function PdfViewer() {
  const pdfAsset = require("../../assets/pdf/IMG06_ImageRestoration.pdf");
  
  // Robust resolving for Metro web asset format
  const pdfUrl = typeof pdfAsset === "string" 
    ? pdfAsset 
    : pdfAsset?.uri || pdfAsset?.default || "/assets/pdf/IMG06_ImageRestoration.pdf";

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageInputValue, setPageInputValue] = useState<string>("1");

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

  // Save page to localStorage and update state
  const goToPage = (page: number) => {
    if (page < 1) return;
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
    goToPage(currentPage + 1);
  };

  const handleInputChange = (text: string) => {
    setPageInputValue(text);
  };

  const handleInputSubmit = () => {
    const pageNum = parseInt(pageInputValue, 10);
    if (!isNaN(pageNum) && pageNum > 0) {
      goToPage(pageNum);
    } else {
      setPageInputValue(currentPage.toString());
    }
  };

  // We append standard PDF open parameters:
  // - page=currentPage (displays only that specific page)
  // - toolbar=0 (hides standard print/download/nav controls)
  // - navpanes=0 (hides thumbnails/bookmarks pane)
  // - scrollbar=0 (hides standard view scrollbar)
  // - view=FitH (fits horizontally for maximum readability)
  const fullIframeUrl = `${pdfUrl}#page=${currentPage}&toolbar=0&navpanes=0&scrollbar=0&view=FitH`;

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
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleNext}>
            <Text style={styles.btnText}>Siguiente ▶</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statusIndicator}>
          <View style={styles.dot} />
          <Text style={styles.statusText}>Leyendo ahora</Text>
        </View>
      </View>

      {/* Embedded Iframe Container */}
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
    backgroundColor: "#10B981",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnDisabled: {
    backgroundColor: "#444",
    opacity: 0.6,
  },
  btnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
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
  },
});
