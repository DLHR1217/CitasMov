import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarCita from "../../../Screen/Citas/ListarCita";
import DetalleCita from "../../../Screen/Citas/DetalleCita";
import EditarCita from "../../../Screen/Citas/EditarCita";

const Stack = createStackNavigator();

export default function CitaStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarCita"
                component={ListarCita}
                options={{ title: "Citas" }}
            />
             <Stack.Screen 
                name= "DetalleCita"
                component={DetalleCita}
                options={{ title: "DetalleCita" }}
            />
             <Stack.Screen 
                name= "EditarCita"
                component={EditarCita}
                options={{ title: "Nuevo/EditarCita" }}
            />
        </Stack.Navigator>
    );
}