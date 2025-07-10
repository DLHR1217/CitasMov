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
    const [apellido, setApellido] = useState(medico?.apellido || "");
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
        if (!nombre || !apellido || !especialidad_id) {
            Alert.alert("Por favor, complete todos los campos.");
            return;
        }

        setLoading(true);
        try {
            const data = { nombre, apellido, especialidad_id: parseInt(especialidad_id) };
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
            <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
            <Picker selectedValue={especialidad_id} onValueChange={setEspecialidadId} style={styles.input}>
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
