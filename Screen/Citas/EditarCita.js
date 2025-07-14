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
    padding: 24,
    backgroundColor: "#f9f9f9",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#007B8C",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 48,
    backgroundColor: "#fff",
    borderColor: "#007B8C",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  boton: {
    backgroundColor: "#007B8C",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});












