import { View, Text, StyleSheet} from "react-native";
import CustomButton from "../../components/BottonComponent"; // Asegúrate que la ruta esté correcta


export default function ListarEspecialidad() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listar Especialidad</Text>
      <CustomButton
        title="Ver Especialidad"
        onPress={() => navigation.navigate("DetalleEspecialidad")}
        style={styles.button}
      />
      <CustomButton
        title="Nuevos Especialidad"
        onPress={() => navigation.navigate("EditarEspecialidad")}
        style={styles.button}
      />
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