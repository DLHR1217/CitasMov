import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearPaciente, editarPaciente } from "../../Src/Services/PacienteService";

export default function EditarPaciente() {
    const navigation = useNavigation();
    const route = useRoute();
    const paciente = route.params?.paciente;

    const [nombre, setNombre] = useState(paciente?.nombre || "");
    const [apellido, setApellido] = useState(paciente?.apellido || "");
    const [documento, setDocumento] = useState(paciente?.documento || "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!paciente;

    const handleGuardar = async () => {
        if (!nombre || !apellido || !documento) {
            Alert.alert("Todos los campos son obligatorios.");
            return;
        }

        setLoading(true);
        try {
            const datos = { nombre, apellido, documento };
            const result = esEdicion
                ? await editarPaciente(paciente.id, datos)
                : await crearPaciente(datos);

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Paciente actualizado" : "Paciente creado");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar el paciente");
            }
        } catch {
            Alert.alert("Error", "Error al guardar el paciente");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{esEdicion ? "Editar Paciente" : "Crear Paciente"}</Text>
            <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
            <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
            <TextInput style={styles.input} placeholder="Documento" value={documento} onChangeText={setDocumento} keyboardType="numeric" />
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
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    botonTexto: {
        color: "#fff",
        fontSize: 16,
    },
});