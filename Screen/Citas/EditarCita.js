import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearCita, editarCita } from "../../Src/Services/CitaService";

export default function EditarCita() {
    const navigation = useNavigation();
    const route = useRoute();

    const cita = route.params?.cita;

    const [paciente_id, setPacientesId] = useState(cita?.paciente_id?.toString() || "");
    const [medico_id, setMedicoId] = useState(cita?.medico_id?.toString() || "");
    const [consultorio_id, setConsultorioId] = useState(cita?.consultorio_id?.toString() || "");
    const [fecha_hora, setFechaHora] = useState(cita?.fecha_hora || "");
    const [estado, setEstado] = useState(cita?.estado || "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!cita;

    const handleGuardar = async () => {
        if (!paciente_id || !medico_id || !consultorio_id || !fecha_hora || !estado) {
            Alert.alert("Error", "Todos los campos son obligatorios");
            return;
        }

        setLoading(true);
        try {
            const data = {
                paciente_id: parseInt(paciente_id),
                medico_id: parseInt(medico_id),
                consultorio_id: parseInt(consultorio_id),
                fecha_hora,
                estado,
            };

            const result = esEdicion
                ? await editarCita(cita.id, data)
                : await crearCita(data);

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Cita actualizada" : "Cita creada");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "Error al guardar la cita");
            }
        } catch (error) {
            Alert.alert("Error", "Error al guardar la cita");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{esEdicion ? "Editar Cita" : "Crear Cita"}</Text>

            <TextInput
                style={styles.input}
                placeholder="ID del paciente"
                value={paciente_id}
                keyboardType="numeric"
                onChangeText={setPacientesId}
            />
            <TextInput
                style={styles.input}
                placeholder="ID del médico"
                value={medico_id}
                keyboardType="numeric"
                onChangeText={setMedicoId}
            />
            <TextInput
                style={styles.input}
                placeholder="ID del consultorio"
                value={consultorio_id}
                keyboardType="numeric"
                onChangeText={setConsultorioId}
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha y hora (YYYY-MM-DD HH:MM)"
                value={fecha_hora}
                onChangeText={setFechaHora}
            />
            <TextInput
                style={styles.input}
                placeholder="Estado"
                value={estado}
                onChangeText={setEstado}
            />

            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.botonTexto}>{esEdicion ? "Actualizar" : "Crear"}</Text>
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
    },
    botonTexto: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
    },
});
