import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/BottonComponent"; // Ajusta la ruta si es necesario

export default function ListarTipoDocumento({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tipos de Documento</Text>

      <View style={styles.card}>

        <CustomButton
          title="Ver Tipos de Documento"
          onPress={() => navigation.navigate("DetalleTipoDocumento")}
          style={styles.button}
        />

        <CustomButton
          title="Nuevo Tipo de Documento"
          onPress={() => navigation.navigate("EditarTipoDocumento")}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007B8C",
    marginBottom: 30,
  },
  button: {
    width: "80%",
  },
});
