import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/BottonComponent"; // Asegúrate que la ruta sea correcta

export default function ListarPaciente({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Pacientes</Text>

      <View style={styles.card}>

        <CustomButton
          title=" Ver Pacientes"
          onPress={() => navigation.navigate("DetallePaciente")}
          style={styles.button}
        />

        <CustomButton
          title=" Nuevo Paciente"
          onPress={() => navigation.navigate("EditarPaciente")}
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
