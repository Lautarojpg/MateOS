import { View, Text } from "react-native";
import Header from "../../components/header";
import { globalStyles } from "../../styles/globalStyles";

export default function HomeScreen() {

  return (
    <View style={globalStyles.container}>

      <Header />

      <View style={globalStyles.content}>
        <Text style={globalStyles.title}>
          Pantalla Inicio
        </Text>
      </View>

    </View>
  );
}