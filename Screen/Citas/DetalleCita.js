import React, { useEffect, useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, ActivityIndicator,Alert,
} from "react-native";
import api from "../../Src/Services/conexion"; 

export default function DetalleCita({ route }) {
  const { id } = route.params;
  const [cita, setCita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarCita = async () => {
      try {
        const response = await api.get(`/listarCitas/${id}`);
        setCita(response.data);
      } catch (error) {
        console.error("Error al cargar la cita:", error);
        Alert.alert("Error", "No se pudo obtener la información de la cita.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      cargarCita();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007B8C" />
      </View>
    );
  }

  if (!id || !cita) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: "red" }}>
          {id ? "Cita no encontrada" : "ID de cita no proporcionado"}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📄 Detalle de la Cita</Text>

      <View style={styles.card}>
        <Text style={styles.label}>🧑 Paciente:</Text>
        <Text style={styles.value}>{cita.usuario?.nombre ?? "No disponible"}</Text>

        <Text style={styles.label}>🩺 Médico:</Text>
        <Text style={styles.value}>{cita.medico?.nombre ?? "No disponible"}</Text>

        <Text style={styles.label}>🏥 Consultorio:</Text>
        <Text style={styles.value}>{cita.consultorio?.nombre ?? "No disponible"}</Text>

        <Text style={styles.label}>📅 Fecha y Hora:</Text>
        <Text style={styles.value}>
          {cita.fecha_hora ? new Date(cita.fecha_hora).toLocaleString() : "No disponible"}
        </Text>

        <Text style={styles.label}>📌 Estado:</Text>
        <View
          style={[
            styles.badge,
            cita.estado === "Confirmada" ? styles.confirmada : styles.pendiente,
          ]}
        >
          <Text style={styles.badgeText}>{cita.estado}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
  container: {
    backgroundColor: "#F2F2F2",
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007B8C",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  confirmada: {
    backgroundColor: "#C8E6C9", // Verde claro
  },
  pendiente: {
    backgroundColor: "#FFCDD2", // Rojo claro
  },
  badgeText: {
    color: "#333",
    fontWeight: "bold",
  },
});
