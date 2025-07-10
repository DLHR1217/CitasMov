import React, { useEffect, useState } from "react";
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { listarPacientes, eliminarPaciente } from "../../Src/Services/PacienteService";
import PacienteCard from "../../components/PacienteCard"; 

export default function ListarPaciente() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const cargarPacientes = async () => {
    setLoading(true);
    try {
      const result = await listarPacientes();
      if (result.success) {
        setPacientes(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los pacientes");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los pacientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", cargarPacientes);
    return unsubscribe;
  }, [navigation]);

  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar paciente",
      "¿Estás seguro que deseas eliminar este paciente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarPaciente(id);
              if (result.success) {
                cargarPacientes();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el paciente");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el paciente");
            }
          },
        },
      ]
    );
  };

  const handleEditar = (paciente) => {
    navigation.navigate("EditarPaciente", { paciente });
  };

  const handleCrear = () => {
    navigation.navigate("EditarPaciente");
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
        data={pacientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PacienteCard
            paciente={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay pacientes registrados</Text>}
      />
      <TouchableOpacity style={styles.boton} onPress={handleCrear}>
        <Text style={styles.botonTexto}>Crear Paciente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  boton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
