import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import { registerUser } from "../../Src/Services/AuthService"; // ajusta el path si es diferente

export default function RegistroScreen({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");

    const handleRegister = async () => {
        if (!nombre || !email || !role || !password || !confirmarPassword) {
            return Alert.alert("Error", "Todos los campos son obligatorios");
        }

        if (password !== confirmarPassword) {
            return Alert.alert("Error", "Las contraseñas no coinciden");
        }

        const result = await registerUser(nombre, email,role, password, confirmarPassword);

        if (result.success) {
            Alert.alert("Éxito", "Registro exitoso", [
                { text: "OK", onPress: () => navigation.navigate("Inicio") },
            ]);
        } else {
            Alert.alert("Error", result.message || "No se pudo registrar");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre Completo"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Rol"
                value={role}
                onChangeText={setRole}
                autoCapitalize="none"

            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                secureTextEntry
                value={confirmarPassword}
                onChangeText={setConfirmarPassword}
            />

            <BottonComponent title="Registrarse" onPress={handleRegister} />
            <BottonComponent
                title="Iniciar Sesión"
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
});
