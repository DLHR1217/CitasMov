import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarMedico from "../../../Screen/Medicos/ListarMedico";
import DetalleMedico from "../../../Screen/Medicos/DetalleMedico";
import EditarMedico from "../../../Screen/Medicos/EditarMedico";

const Stack = createStackNavigator();

export default function MedicoStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarMedico"
                component={ListarMedico}
                options={{ title: "Medico" }}
            />
             <Stack.Screen 
                name= "DetalleMedico"
                component={DetalleMedico}
                options={{ title: "Detalle Medico" }}
            />
             <Stack.Screen 
                name= "EditarMedico"
                component={EditarMedico}
                options={{ title: "Nuevo/Editar Medico" }}
            />
        </Stack.Navigator>
    );
}