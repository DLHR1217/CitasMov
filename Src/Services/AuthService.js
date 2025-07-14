import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./conexion";

//  Función para iniciar sesión
export const loginUser = async (email, password) => {
  try {
    // Enviar credenciales al backend
    const response = await api.post("/login", { email, password });

    // Obtener token y datos del usuario de la respuesta
    const { token, user } = response.data;
    if (!token) throw new Error("No se recibió el token");

    console.log("Token recibido:", token);

    // Guardar token en AsyncStorage para usarlo luego
    await AsyncStorage.setItem("userToken", token);

    // Opcional: obtener perfil actualizado con /me
    const perfil = await api.get("/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Perfil recibido:", perfil.data);

    // Extraer los datos del usuario (puede venir en perfil.data.user o directamente en perfil.data)
    const userData = perfil.data.user || perfil.data;

    // Guardar los datos del usuario para usarlos luego (ej: rol)
    await AsyncStorage.setItem("usuario", JSON.stringify(userData));

    // Devolver éxito
    return { success: true, token };
  } catch (error) {
    // Manejo de errores si algo sale mal (ej: credenciales incorrectas, error de red)
    console.error("Error de login:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Error al conectar con el servidor",
    };
  }
};

//  Función para cerrar sesión
export const logoutUser = async () => {
  try {
    // Llamar al backend para invalidar el token
    await api.post("/logout");

    // Borrar token del almacenamiento
    await AsyncStorage.removeItem("userToken");

    return { succes: true };
  } catch (error) {
    console.error(
      "error al cerrar sesion",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response
        ? error.response.data.message
        : "Error al cerrar sesión",
    };
  }
};

//  Función para registrar un nuevo usuario
export const registerUser = async (name, email, role, password, password_confirmation) => {
  try {
    // Enviar datos del nuevo usuario al backend
    const response = await api.post("/registrar", {
      name,
      email,
      role,
      password,
      password_confirmation,
    });

    const { token } = response.data;

    // Guardar token tras registro exitoso
    await AsyncStorage.setItem("userToken", token);

    return { success: true, token };
  } catch (error) {
    // Mostrar errores si algo falla (ej: correo ya registrado, validaciones)
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
