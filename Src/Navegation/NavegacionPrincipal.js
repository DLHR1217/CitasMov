import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons } from '@expo/vector-icons';

// Pantallas generales
import InicioScreen from './stacks/Inicio';
import PantallaPerfil from '../../Screen/main/PantallaPerfil';
// import ConficStacks from '../stacks/Configuracion';

// Sistema médico (se usarán fuera del Tab)
import CitaStack from './stacks/CitaStack';
import ConsultorioStack from './stacks/ConsultorioStack';
import EspecialidadStack from './stacks/EspecialidadStack';
import HorarioMedicoStack from './stacks/HorarioMedicoStack';
import MedicoStack from './stacks/MedicoStack';
import TipoDocumentoStack from './stacks/TipoDocumentoStack';
import PacienteStack from './stacks/PacienteStack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tabs inferiores: solo Inicio, Perfil y Configuración
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#1976D2',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: { backgroundColor: '#fff' },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={InicioScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PantallaPerfil}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Configuración"
        component={PantallaPerfil} // o cambia si tienes otra
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Stack principal
export default function NavegacionPrincipal() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      {/* Navegación accesible desde otras pantallas */}
      <Stack.Screen name="Citas" component={CitaStack} />
      <Stack.Screen name="Consultorio" component={ConsultorioStack} />
      <Stack.Screen name="Especialidad" component={EspecialidadStack} />
      <Stack.Screen name="Horario Médico" component={HorarioMedicoStack} />
      <Stack.Screen name="Médico" component={MedicoStack} />
      <Stack.Screen name="Paciente" component={PacienteStack} />
      <Stack.Screen name="Tipo Documento" component={TipoDocumentoStack} />
    </Stack.Navigator>
  );
}
