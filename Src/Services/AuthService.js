import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./conexion";

export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/login", { email, password });
        const { token } = response.data;

        await AsyncStorage.setItem("userToken", token);

        return { success: true, token };
    } catch (error) {
        console.error(
            "Error de login:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response
                ? error.response.data.message
                : "Error al conectar",
        };
    }
};

export const logoutUser = async () => {
    try {
        await api.post("/logout");
        await AsyncStorage.removeItem("userToken");
        return { succes: true };
    } catch (error) {
        console.error(
            "error al cerrar sesion",
            error.response ? error.response.data : error.message
        );
        return { success: false, message: error.response ? error.response.data.message : "Error al cerrar sesión" };
    }
}

export const registerUser = async (name, email,role, password, password_confirmation) => {
    try {
        const response = await api.post("/registrar", {
            name,
            email,
            role,
            password,
            password_confirmation,
        });

        const { token } = response.data;

        await AsyncStorage.setItem("userToken", token);

        return { success: true, token };
    } catch (error) {
        console.error(
            "Error al registrar:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response
                ? error.response.data.message
                : "Error de conexión",
        };
    }
};

