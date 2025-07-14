import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { crearMedico, editarMedico } from "../../Src/Services/MedicoService";
import { listarEspecialidades } from "../../Src/Services/EspecialidadService";

export default function EditarMedico() {
    const navigation = useNavigation();
    const route = useRoute();
    const medico = route.params?.medico;

    const [nombre, setNombre] = useState(medico?.nombre || "");
    const [especialidad_id, setEspecialidadId] = useState(medico?.especialidad_id?.toString() || "");
    const [especialidades, setEspecialidades] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const cargarEspecialidades = async () => {
            const result = await listarEspecialidades();
            if (result.success) {
                setEspecialidades(result.data);
            }
        };
        cargarEspecialidades();
    }, []);

    const esEdicion = !!medico;

    const handleGuardar = async () => {
        if (!nombre || !especialidad_id) {
            Alert.alert("Por favor, complete todos los campos.");
            return;
        }

        setLoading(true);
        try {
            const data = { nombre, especialidad_id: parseInt(especialidad_id) };
            const result = esEdicion ? await editarMedico(medico.id, data) : await crearMedico(data);

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Médico actualizado" : "Médico creado");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "Error al guardar el médico");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar el médico");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{esEdicion ? "Editar Médico" : "Crear Médico"}</Text>
            <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
            <Picker selectedValue={especialidad_id} onValueChange={setEspecialidadId} style={[styles.input, styles.picker]}  >
                <Picker.Item label="Seleccione especialidad" value="" />
                {especialidades.map(e => (
                    <Picker.Item key={e.id} label={e.nombre} value={e.id.toString()} />
                ))}
            </Picker>
            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.botonTexto}>{esEdicion ? "Actualizar Médico" : "Crear Médico"}</Text>}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#f0f4f8",
    },

    titulo: {
        fontSize: 28,
        fontWeight: "700",
        color: "#007B8C",
        marginBottom: 28,
        textAlign: "center",
    },

    input: {
        height: 50,
        backgroundColor: "#ffffff",
        borderColor: "#007B8C",
        borderWidth: 1,
        borderRadius: 14,
        paddingHorizontal: 18,
        marginBottom: 20,
        fontSize: 16,
        color: "#333",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },

    picker: {
        height: 50,
        backgroundColor: "#ffffff",
        borderColor: "#007B8C",
        borderWidth: 1,
        borderRadius: 14,
        paddingHorizontal: 10,
        marginBottom: 20,
        justifyContent: "center",
        fontSize: 16,
        elevation: 2,
    },

    boton: {
        backgroundColor: "#007B8C",
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
    },

    botonTexto: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});
