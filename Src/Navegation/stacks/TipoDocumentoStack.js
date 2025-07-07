import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarTipoDocumento from "../../../Screen/TiposDocumentos/ListarTipoDocumento";
import DetalleTipoDocumento from "../../../Screen/TiposDocumentos/DetalleTipoDocumento";
import EditarTipoDocumento from "../../../Screen/TiposDocumentos/EditarTipoDocumento";

const Stack = createStackNavigator();

export default function TipoDocumentoStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarTipoDocumento"
                component={ListarTipoDocumento}
                options={{ title: "TipoDocumento" }}
            />
             <Stack.Screen 
                name= "DetalleTipoDocumento"
                component={DetalleTipoDocumento}
                options={{ title: "Detalle TipoDocumento" }}
            />
             <Stack.Screen 
                name= "EditarTipoDocumento"
                component={EditarTipoDocumento}
                options={{ title: "Nuevo/Editar TipoDocumento" }}
            />
        </Stack.Navigator>
    );
}