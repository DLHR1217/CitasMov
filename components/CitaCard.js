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
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    info: {
        flex: 1,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    detalle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    actions: {
        flexDirection: 'row',
        marginLeft: 8,
    },
    iconBtn: {
        marginLeft: 12,
    },
});
