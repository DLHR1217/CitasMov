import api from "./conexion";

export const listarTiposDocumento = async () => {
    try {
        const response = await api.get("/listarTiposDocumento");
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al listar tipos de documento:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

export const eliminarTipoDocumento = async (id) => {
    try {
        await api.delete(`/eliminarTipoDocumento/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar tipo de documento:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

export const crearTipoDocumento = async (data) => {
    try {
        const response = await api.post("/crearTipoDocumento", data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al crear tipo de documento:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

export const editarTipoDocumento = async (id, data) => {
    try {
        const response = await api.put(`/editarTipoDocumento/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar tipo de documento:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};
