import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TipoDocumentoCard({ tipoDocumento, onEdit, onDelete }) {
       console.log("TipoDocumento recibido:", tipoDocumento);
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{tipoDocumento.nombre}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={24} color="#1976D2" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={24} color="#D32f2f" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e9f1f1", // un tono más suave que #f2f2f2
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#007B8C",
    marginBottom: 28,
    textAlign: "center",
  },

  input: {
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#007B8C",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 18,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  boton: {
    backgroundColor: "#007B8C",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  botonTexto: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  error: {
    color: "#D32F2F",
    marginBottom: 12,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },

  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 10,
  },

  loadingText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "500",
  },

  botonCargando: {
    backgroundColor: "#90A4AE",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  botonTextoCargando: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});

