import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { crearHorarioMedico, editarHorarioMedico } from "../../Src/Services/HoraMedicoService";
import { listarMedicos } from "../../Src/Services/MedicoService";

export default function EditarHorarioMedico() {
    const navigation = useNavigation();
    const route = useRoute();
    const horario = route.params?.horario;

    const [medico_id, setMedicoId] = useState(horario?.medico_id?.toString() || "");
    const [dia, setDia] = useState(horario?.dia || "");
    const [h_inicio, setHoraInicio] = useState(horario?.h_inicio || "");
    const [h_final, setHoraFin] = useState(horario?.h_final || "");
    const [loading, setLoading] = useState(false);
    const [medicos, setMedicos] = useState([]);

    useEffect(() => {
        const cargarMedicos = async () => {
            const result = await listarMedicos();
            if (result.success) setMedicos(result.data);
        };
        cargarMedicos();
    }, []);

    const esEdicion = !!horario;

    const handleGuardar = async () => {
        if (!medico_id || !dia || !h_inicio || !h_final) {
            Alert.alert("Todos los campos son obligatorios.");
            return;
        }

        setLoading(true);
        try {
            const datos = { medico_id: parseInt(medico_id), dia, h_inicio, h_final };
            const result = esEdicion
                ? await editarHorarioMedico(horario.id, datos)
                : await crearHorarioMedico(datos);

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Horario actualizado" : "Horario creado");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar el horario");
            }
        } catch {
            Alert.alert("Error", "Error al guardar el horario");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{esEdicion ? "Editar Horario Médico" : "Crear Horario Médico"}</Text>
            <Picker selectedValue={medico_id} onValueChange={setMedicoId} style={styles.input}>
                <Picker.Item label="Seleccione un médico" value="" />
                {medicos.map((m) => (
                    <Picker.Item key={m.id} label={`${m.nombre} ${m.apellido}`} value={m.id.toString()} />
                ))}
            </Picker>
            <TextInput style={styles.input} placeholder="Día (ej: Lunes)" value={dia} onChangeText={setDia} />
            <TextInput style={styles.input} placeholder="Hora inicio (ej: 08:00)" value={h_inicio} onChangeText={setHoraInicio} />
            <TextInput style={styles.input} placeholder="Hora fin (ej: 12:00)" value={h_final} onChangeText={setHoraFin} />
            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.botonTexto}>{esEdicion ? "Actualizar" : "Crear"}</Text>}
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
