import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BotonComponent from "../../components/BottonComponent";
import api from "../../Src/Services/conexion";
import { logoutUser } from "../../Src/Services/AuthService";

export default function PantallaPerfil({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        if (!token) {
          console.log("No se encontró token, redirigiendo al login");
          return;
        }

        console.log("Intentando cargar perfil con token:", token);
        const response = await api.get("/me");
        console.log("Respuesta del perfil:", response.data);
        setUsuario(response.data.user);
      } catch (error) {
        console.error("Error al cargar perfil:", error);

        const mensajeError =
          error.response?.data?.message ||
          "No se pudo cargar el perfil. Intenta nuevamente.";

        Alert.alert("Error", mensajeError, [
          {
            text: "OK",
            onPress: async () => {
              await AsyncStorage.removeItem("userToken");
            },
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007B8C" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          No se pudo cargar la información del perfil
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👤 Perfil de Usuario</Text>

      <View style={styles.profileBox}>
        <Info label="Nombre" value={usuario.name} />
        <Info label="Email" value={usuario.email} />
        <Info label="Rol" value={usuario.role} />
      </View>

      <BotonComponent title="Editar Perfil" onPress={() => Alert.alert("Editar perfil pronto disponible")} />
      <BotonComponent title="Cerrar Sesión" onPress={handleLogout} />
    </ScrollView>
  );
}

function Info({ label, value }) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value || "No disponible"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 20,
  },
  container: {
    padding: 24,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007B8C",
    textAlign: "center",
    marginBottom: 24,
  },
  profileBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  infoItem: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    color: "#777",
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    color: "#222",
    marginTop: 4,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
