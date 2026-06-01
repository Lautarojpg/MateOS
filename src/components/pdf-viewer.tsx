import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, TextInput } from "react-native";
import Pdf from "react-native-pdf";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "pdf_last_page_native_IMG06_ImageRestoration";

export default function PdfViewer() {
  const source = require("../../assets/pdf/IMG06_ImageRestoration.pdf");
  
  const [initialPage, setInitialPage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageInputValue, setPageInputValue] = useState<string>("1");

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
    
    // Set initialPage to null momentarily to force the Pdf component to re-render at the new page
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

  if (initialPage === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10B981" />
        <Text style={styles.loadingText}>Cargando lector...</Text>
      </View>
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

          <TouchableOpacity 
            style={[styles.btn, totalPages > 0 && currentPage >= totalPages && styles.btnDisabled]} 
            onPress={handleNext}
            disabled={totalPages > 0 && currentPage >= totalPages}
          >
            <Text style={styles.btnText}>▶</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statusIndicator}>
          <View style={styles.dot} />
          <Text style={styles.statusText}>Leyendo</Text>
        </View>
      </View>

      {/* PDF Engine (Single Page Mode) */}
      <View style={styles.pdfContainer}>
        <Pdf
          key={initialPage} // Force full re-render on page jump
          source={source}
          page={initialPage}
          singlePage={true} // Forces single-page view without native multi-page scrolling
          style={styles.pdf}
          trustAllCerts={false}
          onLoadComplete={(numberOfPages) => {
            setTotalPages(numberOfPages);
          }}
          onPageChanged={(page) => {
            // Backup tracker
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
    maxWidth: 100,
  },
  icon: {
    fontSize: 14,
    marginRight: 4,
  },
  docTitle: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  btn: {
    backgroundColor: "#10B981",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  btnDisabled: {
    backgroundColor: "#444",
    opacity: 0.6,
  },
  btnText: {
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
});
