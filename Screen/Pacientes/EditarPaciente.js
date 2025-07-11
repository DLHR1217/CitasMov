import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { crearPaciente, editarPaciente } from "../../Src/Services/PacienteService";
import { listarTiposDocumento } from "../../Src/Services/TipoDocumenService";

export default function EditarPaciente() {
  const navigation = useNavigation();
  const route = useRoute();
  const paciente = route.params?.paciente;

  const [nombre, setNombre] = useState(paciente?.nombre || "");
  const [documento, setDocumento] = useState(paciente?.numero_documento || "");
  const [email, setEmail] = useState(paciente?.email || "");
  const [telefono, setTelefono] = useState(paciente?.telefono || "");
  const [tipoDocumentoId, setTipoDocumentoId] = useState(paciente?.tipo_documento_id || "");
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [loading, setLoading] = useState(false);

  const esEdicion = !!paciente;

  useEffect(() => {
    const cargarTiposDocumento = async () => {
      try {
        const result = await listarTiposDocumento();
        if (result.success) {
          setTiposDocumento(result.data);
        } else {
          Alert.alert("Error", "No se pudieron cargar los tipos de documento.");
        }
      } catch (error) {
        Alert.alert("Error", "Error al obtener los tipos de documento.");
      }
    };
    cargarTiposDocumento();
  }, []);

  const handleGuardar = async () => {
    if (!nombre  || !documento || !email || !telefono || !tipoDocumentoId) {
      Alert.alert("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);
    try {
      const datos = {
        nombre,
        numero_documento: documento,
        email,
        telefono,
        tipo_documento_id: tipoDocumentoId,
      };

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
      <TextInput style={styles.input} placeholder="Número de Documento" value={documento} onChangeText={setDocumento} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipoDocumentoId}
          onValueChange={(itemValue) => setTipoDocumentoId(itemValue)}
        >
          <Picker.Item label="Seleccione tipo de documento" value="" />
          {tiposDocumento.map((tipo) => (
            <Picker.Item key={tipo.id} label={tipo.nombre} value={tipo.id} />
          ))}
        </Picker>
      </View>

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
    backgroundColor: "#f2f2f2", // Fondo gris claro para mejor contraste
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#007B8C",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#007B8C",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007B8C",
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: "center",
    elevation: 3,
  },
  boton: {
    backgroundColor: "#007B8C",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
