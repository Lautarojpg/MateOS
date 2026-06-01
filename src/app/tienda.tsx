import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function TiendaScreen() {
    const productos = [
        {
            id: 1,
            nombre: "Maceta de Barro",
            descripcion: "Un hogar cálido para Carpi",
            precio: 30,
            icono: "🪴",
        },
        {
            id: 2,
            nombre: "Regadera",
            descripcion: "Mantiene feliz a tu compañero",
            precio: 45,
            icono: "🚿",
        },
        {
            id: 3,
            nombre: "Fertilizante",
            descripcion: "Acelera el crecimiento",
            precio: 60,
            icono: "🌿",
        },
        {
            id: 4,
            nombre: "Sombrero",
            descripcion: "Accesorio decorativo",
            precio: 75,
            icono: "🎩",
        },
        {
            id: 5,
            nombre: "Fondo Bosque",
            descripcion: "Nuevo escenario para Carpi",
            precio: 120,
            icono: "🌳",
        },
    ];

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <Text style={styles.title}>
                Tienda
            </Text>

            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>
                    Tus Mates
                </Text>

                <Text style={styles.balanceValue}>
                    🧉 185
                </Text>
            </View>

            {productos.map((item) => (
                <View
                    key={item.id}
                    style={styles.productCard}
                >
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>
                            {item.icono}
                        </Text>
                    </View>

                    <Text style={styles.productTitle}>
                        {item.nombre}
                    </Text>

                    <Text style={styles.productDescription}>
                        {item.descripcion}
                    </Text>

                    <View style={styles.priceBadge}>
                        <Text style={styles.priceText}>
                            🧉 {item.precio}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.buyButton}
                    >
                        <Text style={styles.buyButtonText}>
                            Comprar
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
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
        color: "#111827",
        marginBottom: 20,
    },

    balanceCard: {
        backgroundColor: "#EEF7F2",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#D8E8DD",
    },

    balanceLabel: {
        color: "#6B7280",
        fontSize: 14,
    },

    balanceValue: {
        marginTop: 8,
        fontSize: 28,
        fontWeight: "700",
        color: "#1F8F3A",
    },

    productCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        alignItems: "center",
    },

    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#EEF7F2",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },

    icon: {
        fontSize: 38,
    },

    productTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111827",
    },

    productDescription: {
        marginTop: 6,
        color: "#6B7280",
        textAlign: "center",
        fontSize: 13,
    },

    priceBadge: {
        marginTop: 14,
        backgroundColor: "#F5EFE6",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 10,
    },

    priceText: {
        color: "#B45309",
        fontWeight: "700",
        fontSize: 15,
    },

    buyButton: {
        marginTop: 16,
        backgroundColor: "#1F8F3A",
        width: "100%",
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },

    buyButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "600",
    },
});