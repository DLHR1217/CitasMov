import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, FontAwesome5, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Componente principal de la pantalla de inicio
export default function InicioScreen() {
  const navigation = useNavigation(); // Hook para navegar entre pantallas
  const [rol, setRol] = useState(null); // Estado local para almacenar el rol del usuario

  // Hook de efecto para obtener el rol al cargar la pantalla
  useEffect(() => {
    const obtenerRol = async () => {
      try {
        const datos = await AsyncStorage.getItem("usuario"); // Trae los datos del usuario desde almacenamiento local
        if (datos) {
          const parsed = JSON.parse(datos); // Parsea el JSON guardado
          console.log("Usuario guardado en AsyncStorage:", parsed);
          setRol(parsed.role); // Guarda el rol directamente en el estado
        }
      } catch (error) {
        console.error("Error al obtener el rol:", error);
        Alert.alert("Error", "No se pudo obtener el rol del usuario.");
      }
    };

    obtenerRol();
  }, []);

  // Interfaz de usuario
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        {/* Título de bienvenida */}
        <Text style={styles.title}>Bienvenido al Club</Text>

        {/* Muestra el rol actual */}
        <Text style={styles.status}>
          Rol actual: <Text style={styles.rol}>{rol?.toUpperCase() || "..."}</Text>
        </Text>

        {/* Grid de tarjetas de navegación */}
        <View style={styles.grid}>
          {/* Tarjeta accesible para todos los roles */}
          <Card
            text="Citas"
            icon={<Ionicons name="calendar" size={30} color="#007B8C" />}
            onPress={() => navigation.navigate("Citas")}
          />

          {/* Tarjetas exclusivas para administradores */}
          {rol === "admin" && (
            <>
              <Card
                text="Consultorio"
                icon={<MaterialIcons name="local-hospital" size={30} color="#007B8C" />}
                onPress={() => navigation.navigate("Consultorio")}
              />
              <Card
                text="Especialidad"
                icon={<AntDesign name="profile" size={30} color="#007B8C" />}
                onPress={() => navigation.navigate("Especialidad")}
              />
              <Card
                text="Horario Médico"
                icon={<MaterialIcons name="schedule" size={30} color="#007B8C" />}
                onPress={() => navigation.navigate("HorarioMedico")}
              />
              <Card
                text="Médico"
                icon={<FontAwesome5 name="user-md" size={30} color="#007B8C" />}
                onPress={() => navigation.navigate("Medicos")}
              />
              <Card
                text="Paciente"
                icon={<Ionicons name="people" size={30} color="#007B8C" />}
                onPress={() => navigation.navigate("Paciente")}
              />
              <Card
                text="Tipo Documento"
                icon={<AntDesign name="idcard" size={30} color="#007B8C" />}
                onPress={() => navigation.navigate("TipoDocumento")}
              />
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

// Componente reutilizable para crear cada tarjeta del grid
function Card({ text, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {icon}
      <Text style={styles.cardText}>{text}</Text>
    </TouchableOpacity>
  );
}

// Estilos visuales
const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: "#E9F7F8", // Fondo claro
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007B8C",
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 24,
  },
  rol: {
    fontWeight: "bold",
    color: "#007B8C", // Color principal para destacar el rol
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap", // Permite que los ítems pasen a otra línea
    justifyContent: "space-between", // Espaciado uniforme
  },
  card: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  cardText: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});
