import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SQLiteProvider } from 'expo-sqlite';
import { migrarBaseDatos } from './src/servicios/Database';
import Home from './src/screens/home/Home';
import Usuarios from './src/screens/usuarios/Usuarios';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <SQLiteProvider databaseName="usuarios.db" onInit={migrarBaseDatos}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home"screenOptions={{ headerStyle: { backgroundColor: '#007bff' },headerTintColor: '#fff',headerTitleStyle: { fontWeight: 'bold' }  }}>
                    <Stack.Screen name="Home" component={Home} options={{ title: 'Inicio' }} />
                    <Stack.Screen name="Usuarios" component={Usuarios} options={{ title: 'Gestión de Usuarios' }} />
                </Stack.Navigator>
            </NavigationContainer>
        </SQLiteProvider>
    );
}