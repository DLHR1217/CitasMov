import api from "./conexion"; // Importa la instancia de Axios configurada para hacer peticiones a la API

//  Listar todas las especialidades desde el backend
export const listarEspecialidades = async () => {
    try {
        const response = await api.get("/listarEspecialidad"); // Petición GET a la ruta correspondiente
        return { success: true, data: response.data }; // Retorna los datos obtenidos
    } catch (error) {
        // Captura y muestra cualquier error
        console.error("Error al listar especialidades:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

//  Eliminar una especialidad por su ID
export const eliminarEspecialidad = async (id) => {
    try {
        await api.delete(`/eliminarEspecialidad/${id}`); // Petición DELETE al endpoint con el ID
        return { success: true }; // Éxito sin necesidad de retornar data
    } catch (error) {
        console.error("Error al eliminar especialidad:", error.response ? error.response.data : error.message);

        const rawMessage = error.response?.data?.message || "";

        // Detecta si el error es por clave foránea (relaciones con otros registros)
        const esClaveForanea = rawMessage.includes("SQLSTATE[23000]");

        return {
            success: false,
            message: esClaveForanea
                ? "No se puede eliminar la especialidad porque está asociada a uno o más médicos."
                : rawMessage || "Error de conexión",
        };
    }
};

//  Crear una nueva especialidad
export const crearEspecialidad = async (data) => {
    try {
        const response = await api.post("/crearEspecialidad", data); // Envía los datos como cuerpo de la solicitud POST
        return { success: true, data: response.data }; // Retorna los datos del nuevo registro
    } catch (error) {
        console.error("Error al crear especialidad:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

//  Editar una especialidad existente por su ID
export const editarEspecialidad = async (id, data) => {
    try {
        const response = await api.put(`/editarEspecialidad/${id}`, data); // PUT con ID en la URL y datos en el body
        return { success: true, data: response.data }; // Retorna datos actualizados
    } catch (error) {
        console.error("Error al editar especialidad:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};
