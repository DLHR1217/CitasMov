import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearTipoDocumento, editarTipoDocumento } from "../../Src/Services/TipoDocumenService";

export default function EditarTipoDocumento() {
    const navigation = useNavigation();
    const route = useRoute();
    const tipoDocumento = route.params?.tipoDocumento;

    const [nombre, setNombre] = useState(tipoDocumento?.nombre || "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!tipoDocumento;

    const handleGuardar = async () => {
        if (!nombre ) {
            Alert.alert("Todos los campos son obligatorios.");
            return;
        }

        setLoading(true);
        try {
            const datos = { nombre };
            const result = esEdicion
                ? await editarTipoDocumento(tipoDocumento.id, datos)
                : await crearTipoDocumento(datos);

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Tipo de documento actualizado" : "Tipo de documento creado");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar el tipo de documento");
            }
        } catch {
            Alert.alert("Error", "Error al guardar el tipo de documento");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{esEdicion ? "Editar Tipo de Documento" : "Crear Tipo de Documento"}</Text>
            <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.botonTexto}>{esEdicion ? "Actualizar" : "Crear"}</Text>}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e9f1f1", // un tono más suave que #f2f2f2
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#007B8C",
    marginBottom: 28,
    textAlign: "center",
  },

  input: {
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#007B8C",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 18,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  boton: {
    backgroundColor: "#007B8C",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  botonTexto: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  error: {
    color: "#D32F2F",
    marginBottom: 12,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },

  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 10,
  },

  loadingText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "500",
  },

  botonCargando: {
    backgroundColor: "#90A4AE",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  botonTextoCargando: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});


