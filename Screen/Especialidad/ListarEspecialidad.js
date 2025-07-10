import React, { useEffect, useState } from "react";
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { listarEspecialidades, eliminarEspecialidad } from "../../Src/Services/EspecialidadService";
import EspecialidadCard from "../../components/EspecialidadCard"; // Asegúrate de tener este componente creado

export default function ListarEspecialidad() {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const cargarEspecialidades = async () => {
    setLoading(true);
    try {
      const result = await listarEspecialidades();
      if (result.success) {
        setEspecialidades(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar las especialidades");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las especialidades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", cargarEspecialidades);
    return unsubscribe;
  }, [navigation]);

  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar especialidad",
      "¿Estás seguro que deseas eliminar esta especialidad?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarEspecialidad(id);
              if (result.success) {
                cargarEspecialidades();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar la especialidad");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la especialidad");
            }
          },
        },
      ]
    );
  };

  const handleEditar = (especialidad) => {
    navigation.navigate("EditarEspecialidad", { especialidad });
  };

  const handleCrear = () => {
    navigation.navigate("EditarEspecialidad");
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
        data={especialidades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EspecialidadCard
            especialidad={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay especialidades registradas</Text>}
      />
      <TouchableOpacity style={styles.boton} onPress={handleCrear}>
        <Text style={styles.botonTexto}>Crear Especialidad</Text>
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
