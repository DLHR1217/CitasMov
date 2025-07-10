import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearConsultorio, editarConsultorio } from "../../Src/Services/ConsultorioService";

export default function EditarConsultorio() {
    const navigation = useNavigation();
    const route = useRoute();
    const consultorio = route.params?.consultorio;

    const [nombre, setNombre] = useState(consultorio?.nombre || "");
    const [direccion, setDireccion] = useState(consultorio?.direccion || "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!consultorio;

    const handleGuardar = async () => {
        if (!nombre || !direccion) {
            Alert.alert("Por favor, complete todos los campos.");
            return;
        }

        setLoading(true);
        try {
            const data = { nombre, direccion };
            const result = esEdicion
                ? await editarConsultorio(consultorio.id, data)
                : await crearConsultorio(data);
            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Consultorio actualizado" : "Consultorio creado");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "Error al guardar");
            }
        } catch {
            Alert.alert("Error", "No se pudo guardar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{esEdicion ? "Editar Consultorio" : "Crear Consultorio"}</Text>
            <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
            <TextInput style={styles.input} placeholder="Dirección" value={direccion} onChangeText={setDireccion} />
            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.botonTexto}>{esEdicion ? "Actualizar" : "Crear"}</Text>}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
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
    botonTexto: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
