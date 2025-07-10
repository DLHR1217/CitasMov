import api from "./conexion";

export const listarEspecialidades = async () => {
    try {
        const response = await api.get("/listarEspecialidad");
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al listar especialidades:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

export const eliminarEspecialidad = async (id) => {
    try {
        await api.delete(`/eliminarEspecialidad/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar especialidad:", error.response ? error.response.data : error.message);

        const rawMessage = error.response?.data?.message || "";

        // Verificamos si es un error por clave foránea
        const esClaveForanea = rawMessage.includes("SQLSTATE[23000]");

        return {
            success: false,
            message: esClaveForanea
                ? "No se puede eliminar la especialidad porque está asociada a uno o más médicos."
                : rawMessage || "Error de conexión",
        };
    }
};


export const crearEspecialidad = async (data) => {
    try {
        const response = await api.post("/crearEspecialidad", data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al crear especialidad:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

export const editarEspecialidad = async (id, data) => {
    try {
        const response = await api.put(`/editarEspecialidad/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar especialidad:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};
