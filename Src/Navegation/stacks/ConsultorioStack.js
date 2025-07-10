import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarConsultorio from "../../../Screen/Consultorio/ListarConsultorio";
import DetalleConsultorio from "../../../Screen/Consultorio/DetalleConsultorio";
import EditarConsultorios from "../../../Screen/Consultorio/EditarConsultorio";

const Stack = createStackNavigator();

export default function ConsultorioStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarConsultorio"
                component={ListarConsultorio}
                options={{ title: "Consultorios" }}
            />
             <Stack.Screen 
                name= "DetalleConsultorio"
                component={DetalleConsultorio}
                options={{ title: "DetalleConsultorio" }}
            />
             <Stack.Screen 
                name= "EditarConsultorio"
                component={EditarConsultorios}
                options={{ title: "Nuevo/Editar Consultorio" }}
            />
        </Stack.Navigator>
    );
}