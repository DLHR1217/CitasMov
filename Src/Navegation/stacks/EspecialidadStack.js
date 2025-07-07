import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarEspecialidad from "../../../Screen/Especialidad/ListarEspecialidad";
import DetalleEspecialidad from "../../../Screen/Especialidad/DetalleEspecialidad";
import EditarEspecialidad from "../../../Screen/Especialidad/EditarEspecialidad";

const Stack = createStackNavigator();

export default function EspecialidadStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarEspecialidad"
                component={ListarEspecialidad}
                options={{ title: "Especialidad" }}
            />
             <Stack.Screen 
                name= "DetalleEspecialidad"
                component={DetalleEspecialidad}
                options={{ title: "Detalle Especialidad" }}
            />
             <Stack.Screen 
                name= "EditarEspecialidad"
                component={EditarEspecialidad}
                options={{ title: "Nuevo/Editar Especialidad" }}
            />
        </Stack.Navigator>
    );
}