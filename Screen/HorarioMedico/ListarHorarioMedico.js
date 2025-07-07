import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/BottonComponent"; // Asegúrate de que la ruta sea correcta

export default function ListarHorarioMedico({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Horarios Médicos</Text>

      <View style={styles.card}>

        <CustomButton
          title=" Ver Horarios"
          onPress={() => navigation.navigate("DetalleHorarioMedico")}
          style={styles.button}
        />

        <CustomButton
          title=" Nuevo Horario"
          onPress={() => navigation.navigate("EditarHorarioMedico")}
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
