import api from "./conexion";

export const listarConsultorios = async () => {
    try {
        const response = await api.get("/listarConsultorio");
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al listar consultorios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

export const eliminarConsultorio = async (id) => {
    try {
        await api.delete(`/eliminarConsultorio/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar consultorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

export const crearConsultorio = async (data) => {
    try {
        const response = await api.post("/crearConsultorio", data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al crear consultorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

export const editarConsultorio = async (id, data) => {
    try {
        const response = await api.put(`/editarConsultorio/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar consultorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};
