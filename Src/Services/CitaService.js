import api from "./conexion";

export const listarCitas = async () => {
    try {
        const response = await api.get("/listarCitas");
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al listar citas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

export const eliminarCita = async (id) => {
    try {
        await api.delete(`/eliminarCitas/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar cita:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

export const crearCita = async (data) => {
    try {
        const response = await api.post("/crearCitas", data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al crear cita:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

export const editarCita = async (id, data) => {
    try {
        const response = await api.put(`/editarCitas/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar cita:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};
