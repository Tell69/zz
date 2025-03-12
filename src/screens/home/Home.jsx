import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './Home.styles';

const Home = ({ navigation }) => {
    return (
        <View style={styles.contenedor}>
            <Image source={require('../../../assets/logo.png')} style={styles.logo} />
            <Text style={styles.titulo}>Bienvenido a la App</Text>
            <Text style={styles.descripcion}>Prueba Anderson Jacome</Text>

            <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Usuarios')}>
                <Text style={styles.botonTexto}>Gestionar Usuarios</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.boton, styles.botonDispositivos]} onPress={() => navigation.navigate('Dispositivos')}>
                <Text style={styles.botonTexto}>Gestionar Dispositivos</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Home;