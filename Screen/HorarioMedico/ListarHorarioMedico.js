import React, { useEffect, useState } from "react";
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { listarHorariosMedico, eliminarHorarioMedico } from "../../Src/Services/HoraMedicoService";
import HorarioMedicoCard from "../../components/HoraMedCard";

export default function ListarHorarioMedico() {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const cargarHorarios = async () => {
    setLoading(true);
    try {
      const result = await listarHorariosMedico();
      if (result.success) {
        setHorarios(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los horarios");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los horarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", cargarHorarios);
    return unsubscribe;
  }, [navigation]);

  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar horario",
      "¿Estás seguro que deseas eliminar este horario médico?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarHorarioMedico(id);
              if (result.success) {
                cargarHorarios();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el horario");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el horario");
            }
          },
        },
      ]
    );
  };

  const handleEditar = (horario) => {
    navigation.navigate("EditarHorarioMedico", { horario });
  };

  const handleCrear = () => {
    navigation.navigate("EditarHorarioMedico");
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={horarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HorarioMedicoCard
            horario={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay horarios registrados</Text>}
      />
      <TouchableOpacity style={styles.boton} onPress={handleCrear}>
        <Text style={styles.botonTexto}>Crear Horario</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },

  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontStyle: "italic",
    color: "#888",
  },

  boton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#007B8C",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
