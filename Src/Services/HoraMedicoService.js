import api from "./conexion";

export const listarHorariosMedico = async () => {
    try {
        const response = await api.get("/listarHoMedicos");
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al listar horas médicas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

export const eliminarHorarioMedico = async (id) => {
    try {
        await api.delete(`/eliminarHoMedicos/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar hora médica:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

export const crearHorarioMedico = async (data) => {
    try {
        const response = await api.post("/crearHoMedicos", data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al crear hora médica:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

export const editarHorarioMedico = async (id, data) => {
    try {
        const response = await api.put(`/editarHoMedicos/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar hora médica:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};
