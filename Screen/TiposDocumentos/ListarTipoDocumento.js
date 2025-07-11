import React, { useEffect, useState } from "react";
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { listarTiposDocumento, eliminarTipoDocumento } from "../../Src/Services/TipoDocumenService";
import TipoDocumentoCard from "../../components/TipoDocumentoCard"; 

export default function ListarTipoDocumento() {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const cargarTiposDocumento = async () => {
    setLoading(true);
    try {
      const result = await listarTiposDocumento();
      if (result.success) {
        setTipos(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los tipos de documento");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los tipos de documento");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", cargarTiposDocumento);
    return unsubscribe;
  }, [navigation]);

  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar tipo de documento",
      "¿Estás seguro que deseas eliminar este tipo?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarTipoDocumento(id);
              if (result.success) {
                cargarTiposDocumento();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el tipo de documento");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el tipo de documento");
            }
          },
        },
      ]
    );
  };

  const handleEditar = (tipo) => {
    navigation.navigate("EditarTipoDocumento", { tipo });
  };

  const handleCrear = () => {
    navigation.navigate("EditarTipoDocumento");
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
        data={tipos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TipoDocumentoCard
            tipoDocumento={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay tipos de documento registrados</Text>}
      />
      <TouchableOpacity style={styles.boton} onPress={handleCrear}>
        <Text style={styles.botonTexto}>Crear Tipo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  empty: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
  },
  boton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#007B8C",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 32,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
});

