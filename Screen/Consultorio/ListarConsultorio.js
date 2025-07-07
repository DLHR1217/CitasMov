import { View, Text, Button } from "react-native";
import CustomButton from "../../components/BottonComponent"; // Asegúrate que la ruta esté correcta


export default function ListarConsultorio() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Listar Consultorio</Text>
      <Button
        title="Ver Consultorio"
        onPress={() => navigation.navigate("DetalleConsultorio")}
      />
      <Button
        title="Nuevos Consultorio"
        onPress={() => navigation.navigate("EditarConsultorio")}
      />
    </View>
  );
}
