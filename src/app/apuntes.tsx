import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function BibliotecaScreen() {
    const [selectedApunte, setSelectedApunte] = useState(1);

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

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <Text style={styles.title}>
                Biblioteca
            </Text>

            {/* LISTA DE APUNTES */}

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
                        <View style={styles.iconBox}>
                            <Text style={styles.iconText}>
                                {item.icono}
                            </Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={styles.apunteTitle}>
                                {item.nombre}
                            </Text>

                            <Text style={styles.apunteInfo}>
                                {item.materia} • {item.paginas} páginas
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

                <View style={styles.readerBox}>
                    <Text style={styles.readerIcon}>
                        📖
                    </Text>

                    <Text style={styles.readerTitle}>
                        {apuntes.find(
                            (a) => a.id === selectedApunte
                        )?.nombre}
                    </Text>

                    <Text style={styles.readerText}>
                        Aquí se mostrará el PDF utilizando
                        react-native-pdf.
                    </Text>
                </View>

                <TouchableOpacity style={styles.openButton}>
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

                <TouchableOpacity style={styles.uploadArea}>
                    <Text style={styles.uploadIcon}>
                        ⬆️
                    </Text>

                    <Text style={styles.uploadTitle}>
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
        padding: 16,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 20,
        color: "#111827",
    },

    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 18,
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
        padding: 14,
        marginBottom: 10,
    },

    selectedApunte: {
        backgroundColor: "#F0FDF4",
        borderColor: "#22C55E",
    },

    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: "#1F8F3A",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },

    iconText: {
        fontSize: 22,
    },

    apunteTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111827",
    },

    apunteInfo: {
        fontSize: 13,
        color: "#6B7280",
        marginTop: 4,
    },

    check: {
        fontSize: 24,
        color: "#22C55E",
    },

    readerBox: {
        height: 220,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        backgroundColor: "#FAFAFA",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },

    readerIcon: {
        fontSize: 42,
        marginBottom: 10,
    },

    readerTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
    },

    readerText: {
        color: "#6B7280",
        marginTop: 8,
        textAlign: "center",
        paddingHorizontal: 20,
    },

    openButton: {
        backgroundColor: "#1F8F3A",
        height: 52,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },

    openButtonText: {
        color: "#FFF",
        fontWeight: "600",
        fontSize: 15,
    },

    uploadArea: {
        height: 140,
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#22C55E",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0FDF4",
    },

    uploadIcon: {
        fontSize: 32,
        marginBottom: 8,
    },

    uploadTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
    },

    uploadText: {
        marginTop: 4,
        color: "#6B7280",
        fontSize: 13,
    },
});