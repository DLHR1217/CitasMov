import api from "./conexion";

export const listarMedicos = async () => {
    try {
        const response = await api.get("/listarMedicos");
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al listar médicos:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

export const eliminarMedico = async (id) => {
    try {
        await api.delete(`/eliminarMedicos/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar médico:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

export const crearMedico = async (data) => {
    try {
        const response = await api.post("/crearMedicos", data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al crear médico:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

export const editarMedico = async (id, data) => {
    try {
        const response = await api.put(`/editarMedicos/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar médico:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};
