import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";

export default function BibliotecaScreen() {
    const [selectedApunte, setSelectedApunte] = useState(1);

    const { width } = useWindowDimensions();

    const isSmallScreen = width < 380;

    const apuntes = [
        {
            id: 1,
            nombre: "Química - Unidad 1",
            materia: "Química",
            paginas: 24,
            icono: "📄",
        },
        {
            id: 2,
            nombre: "Matemática Discreta",
            materia: "Matemática",
            paginas: 37,
            icono: "📘",
        },
        {
            id: 3,
            nombre: "Base de Datos",
            materia: "Informática",
            paginas: 52,
            icono: "📕",
        },
    ];

    const apunteSeleccionado = apuntes.find(
        (a) => a.id === selectedApunte
    );

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{
                padding: isSmallScreen ? 12 : 16,
                paddingBottom: 30,
            }}
        >
            <Text
                style={[
                    styles.title,
                    {
                        fontSize: isSmallScreen ? 24 : 28,
                    },
                ]}
            >
                Biblioteca
            </Text>

            {/* MIS APUNTES */}

            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    Mis Apuntes
                </Text>

                <Text style={styles.cardDescription}>
                    Selecciona un PDF para leerlo
                </Text>

                {apuntes.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.apunteCard,
                            selectedApunte === item.id &&
                            styles.selectedApunte,
                        ]}
                        onPress={() =>
                            setSelectedApunte(item.id)
                        }
                    >
                        <View
                            style={[
                                styles.iconBox,
                                {
                                    width: isSmallScreen ? 42 : 50,
                                    height: isSmallScreen ? 42 : 50,
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    fontSize: isSmallScreen
                                        ? 18
                                        : 22,
                                }}
                            >
                                {item.icono}
                            </Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text
                                style={[
                                    styles.apunteTitle,
                                    {
                                        fontSize:
                                            isSmallScreen
                                                ? 14
                                                : 15,
                                    },
                                ]}
                            >
                                {item.nombre}
                            </Text>

                            <Text
                                style={[
                                    styles.apunteInfo,
                                    {
                                        fontSize:
                                            isSmallScreen
                                                ? 12
                                                : 13,
                                    },
                                ]}
                            >
                                {item.materia} •{" "}
                                {item.paginas} páginas
                            </Text>
                        </View>

                        {selectedApunte === item.id && (
                            <Text style={styles.check}>
                                ✓
                            </Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            {/* LECTOR */}

            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    Lector PDF
                </Text>

                <Text style={styles.cardDescription}>
                    Visualiza el apunte seleccionado
                </Text>

                <View
                    style={[
                        styles.readerBox,
                        {
                            height:
                                width < 380
                                    ? 180
                                    : width < 450
                                        ? 220
                                        : 260,
                        },
                    ]}
                >
                    <Text
                        style={{
                            fontSize:
                                isSmallScreen ? 34 : 42,
                        }}
                    >
                        📖
                    </Text>

                    <Text
                        style={[
                            styles.readerTitle,
                            {
                                fontSize:
                                    isSmallScreen ? 15 : 16,
                            },
                        ]}
                    >
                        {apunteSeleccionado?.nombre}
                    </Text>

                    <Text style={styles.readerText}>
                        Aquí se mostrará el PDF utilizando
                        react-native-pdf.
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.openButton}
                >
                    <Text style={styles.openButtonText}>
                        Abrir PDF
                    </Text>
                </TouchableOpacity>
            </View>

            {/* SUBIR PDF */}

            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    Subir Apunte
                </Text>

                <Text style={styles.cardDescription}>
                    Agrega nuevos PDFs a tu biblioteca
                </Text>

                <TouchableOpacity
                    style={[
                        styles.uploadArea,
                        {
                            height:
                                isSmallScreen ? 120 : 140,
                        },
                    ]}
                >
                    <Text
                        style={{
                            fontSize:
                                isSmallScreen ? 26 : 32,
                        }}
                    >
                        ⬆️
                    </Text>

                    <Text
                        style={[
                            styles.uploadTitle,
                            {
                                fontSize:
                                    isSmallScreen ? 15 : 16,
                            },
                        ]}
                    >
                        Seleccionar PDF
                    </Text>

                    <Text style={styles.uploadText}>
                        Toca aquí para elegir un archivo
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F7F5",
    },

    title: {
        fontWeight: "700",
        color: "#111827",
        marginBottom: 20,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111827",
    },

    cardDescription: {
        color: "#6B7280",
        marginTop: 4,
        marginBottom: 16,
        fontSize: 13,
    },

    apunteCard: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 14,
        padding: 12,
        marginBottom: 10,
    },

    selectedApunte: {
        backgroundColor: "#F0FDF4",
        borderColor: "#22C55E",
    },

    iconBox: {
        borderRadius: 12,
        backgroundColor: "#1F8F3A",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    apunteTitle: {
        fontWeight: "600",
        color: "#111827",
    },

    apunteInfo: {
        color: "#6B7280",
        marginTop: 4,
    },

    check: {
        fontSize: 22,
        color: "#22C55E",
        fontWeight: "bold",
    },

    readerBox: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        backgroundColor: "#FAFAFA",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        paddingHorizontal: 20,
    },

    readerTitle: {
        marginTop: 12,
        fontWeight: "600",
        color: "#111827",
        textAlign: "center",
    },

    readerText: {
        color: "#6B7280",
        marginTop: 8,
        textAlign: "center",
    },

    openButton: {
        backgroundColor: "#1F8F3A",
        height: 52,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },

    openButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "600",
    },

    uploadArea: {
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#22C55E",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0FDF4",
    },

    uploadTitle: {
        marginTop: 8,
        fontWeight: "600",
        color: "#111827",
    },

    uploadText: {
        marginTop: 4,
        color: "#6B7280",
        fontSize: 13,
        textAlign: "center",
        paddingHorizontal: 16,
    },
});