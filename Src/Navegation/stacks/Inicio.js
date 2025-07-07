import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function InicioScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido al Club</Text>
      <Text style={styles.status}>Estado: Habilitado</Text>

      <View style={styles.grid}>
        <Card text="Citas" icon={<Ionicons name="calendar" size={30} color="#007B8C" />} onPress={() => navigation.navigate("Citas")} />
        <Card text="Consultorio" icon={<MaterialIcons name="local-hospital" size={30} color="#007B8C" />} onPress={() => navigation.navigate("Consultorio")} />
        <Card text="Especialidad" icon={<AntDesign name="profile" size={30} color="#007B8C" />} onPress={() => navigation.navigate("Especialidad")} />
        <Card text="Horario Médico" icon={<MaterialIcons name="schedule" size={30} color="#007B8C" />} onPress={() => navigation.navigate("HorarioMedico")} />
        <Card text="Médico" icon={<FontAwesome5 name="user-md" size={30} color="#007B8C" />} onPress={() => navigation.navigate("Medicos")} />
        <Card text="Paciente" icon={<Ionicons name="people" size={30} color="#007B8C" />} onPress={() => navigation.navigate("Paciente")} />
        <Card text="Tipo Documento" icon={<AntDesign name="idcard" size={30} color="#007B8C" />} onPress={() => navigation.navigate("TipoDocumento")} />
      </View>
    </View>
  );
}

function Card({ text, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {icon}
      <Text style={styles.cardText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Igual que el primer bloque
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007B8C", // Azul verdoso oscuro
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF", // Blanco limpio
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});

