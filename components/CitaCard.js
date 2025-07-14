import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CitaCard({ cita, onEdit, onDelete }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>Paciente: {cita.paciente?.nombre}</Text>
                <Text style={styles.detalle}>Médico: {cita.medico?.nombre}</Text>
                <Text style={styles.detalle}>Consultorio: {cita.consultorio?.nombre}</Text>
                <Text style={styles.detalle}>Fecha: {cita.fecha_hora}</Text>
                <Text style={styles.detalle}>Estado: {cita.estado}</Text>
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
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 16,
    borderLeftWidth: 5,
    borderLeftColor: '#007B8C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 4,
  },
  info: {
    flex: 1,
    paddingRight: 12,
  },
  nombre: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004D56',
    marginBottom: 4,
  },
  detalle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  iconBtn: {
    marginLeft: 10,
    backgroundColor: '#E0F7FA',
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
});

