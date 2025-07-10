import React, { useState } from "react";
import { View, Text, Alert,TextInput, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {crearEspecialidad,editarEspecialidad} from "../../Src/Services/EspecialidadService";

export default function EditarEspecialidad() {
    const navigation = useNavigation();
    const route = useRoute();
    const especialidad = route.params?.especialidad;

    const [nombre, setNombre] = useState(especialidad?.nombre || "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!especialidad;

    const handleGuardar = async () => {
        if (!nombre) {
            Alert.alert("Por favor, ingrese el nombre.");
            return;
        }

        setLoading(true);
        try {
            const data = { nombre };
            const result = esEdicion
                ? await editarEspecialidad(especialidad.id, data)
                : await crearEspecialidad(data);

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Especialidad actualizada" : "Especialidad creada");
                navigation.goBack();
            } else {
                let mensaje = result.message;
                if (typeof mensaje === "object" && mensaje !== null) {
                    mensaje = Object.values(mensaje).join("\n");
                }
                Alert.alert("Error", mensaje || "Error al guardar");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar la especialidad");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
                {esEdicion ? "Editar Especialidad" : "Crear Especialidad"}
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.botonTexto}>
                        {esEdicion ? "Actualizar" : "Crear"}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
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
});
