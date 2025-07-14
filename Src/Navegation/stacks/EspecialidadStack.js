import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//  Importa las pantallas relacionadas con Especialidades
import ListarEspecialidad from "../../../Screen/Especialidad/ListarEspecialidad";
import DetalleEspecialidad from "../../../Screen/Especialidad/DetalleEspecialidad";
import EditarEspecialidad from "../../../Screen/Especialidad/EditarEspecialidad";

//  Crea un stack navigator específico para Especialidad
const Stack = createStackNavigator();

//  Este componente agrupa y organiza las rutas de navegación relacionadas con "Especialidad"
export default function EspecialidadStack () {
    return (
        <Stack.Navigator>
            {/* Pantalla principal: muestra todas las especialidades */}
            <Stack.Screen 
                name="ListarEspecialidad"
                component={ListarEspecialidad}
                options={{ title: "Especialidad" }} // Título que se muestra en el header
            />
            
            {/* Pantalla para ver detalles de una especialidad específica */}
            <Stack.Screen 
                name="DetalleEspecialidad"
                component={DetalleEspecialidad}
                options={{ title: "Detalle Especialidad" }}
            />

            {/* Pantalla para crear o editar una especialidad */}
            <Stack.Screen 
                name="EditarEspecialidad"
                component={EditarEspecialidad}
                options={{ title: "Nuevo/Editar Especialidad" }}
            />
        </Stack.Navigator>
    );
}
