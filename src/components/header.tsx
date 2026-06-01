import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { globalStyles } from "../styles/globalStyles";

export default function Header() {

  return (

    <View style={globalStyles.navbar}>

      <Text style={globalStyles.logo}>
        MateOS
      </Text>

      <View style={globalStyles.links}>

        <TouchableOpacity
          onPress={() => router.push("/")}
        >
          <Text style={globalStyles.link}>
            Inicio
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/perfil")}
        >
          <Text style={globalStyles.link}>
            Perfil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/lector")}
        >
          <Text style={globalStyles.link}>
            Lector
          </Text>
        </TouchableOpacity>

      </View>

    </View>

  );
}