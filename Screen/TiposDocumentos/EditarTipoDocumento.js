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
    view: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },              

    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    boton: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    botonTexto: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    boton: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    botonTexto: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    error: {
        color: "red",
        marginTop: 10,
        textAlign: "center",
    },
    loading: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    loadingText: {
        color: "#fff",
        fontSize: 18,
        marginBottom: 10,
    },
    botonCargando: {
        backgroundColor: "#ccc",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    botonTextoCargando: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    


});
