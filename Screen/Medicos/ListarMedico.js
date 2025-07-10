import React, { useEffect, useState } from "react";
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { listarMedicos, eliminarMedico } from "../../Src/Services/MedicoService";
import MedicoCard from "../../components/MedicoCard"; 

export default function ListarMedico() {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const cargarMedicos = async () => {
    setLoading(true);
    try {
      const result = await listarMedicos();
      if (result.success) {
        setMedicos(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los médicos");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los médicos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", cargarMedicos);
    return unsubscribe;
  }, [navigation]);

  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar médico",
      "¿Estás seguro que deseas eliminar este médico?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarMedico(id);
              if (result.success) {
                cargarMedicos();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el médico");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el médico");
            }
          },
        },
      ]
    );
  };

  const handleEditar = (medico) => {
    navigation.navigate("EditarMedico", { medico });
  };

  const handleCrear = () => {
    navigation.navigate("EditarMedico");
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
        data={medicos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MedicoCard
            medico={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay médicos registrados</Text>}
      />
      <TouchableOpacity style={styles.boton} onPress={handleCrear}>
        <Text style={styles.botonTexto}>Crear Médico</Text>
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
