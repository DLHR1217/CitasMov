import api from "./conexion"; 

//  Listar todos los consultorios
export const listarConsultorios = async () => {
    try {
        // Petición GET al backend para obtener todos los consultorios
        const response = await api.get("/listarConsultorio");
        // Si tiene éxito, retorna los datos recibidos
        return { success: true, data: response.data };
    } catch (error) {
        // Manejo de errores en consola y retorno
        console.error("Error al listar consultorios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};

//  Eliminar un consultorio por ID
export const eliminarConsultorio = async (id) => {
    try {
        // Petición DELETE al endpoint con el ID del consultorio
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

//  Crear un nuevo consultorio
export const crearConsultorio = async (data) => {
    try {
        // Envío de datos del consultorio al backend mediante POST
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

//  Editar un consultorio existente
export const editarConsultorio = async (id, data) => {
    try {
        // Actualización de datos mediante PUT al endpoint con el ID
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
