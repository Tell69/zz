import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#e3f2fd',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 30,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
    descripcion: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
        textAlign: 'center',
    },
    boton: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 15,
        width: '100%',
        alignItems: 'center',
    },
    botonDispositivos: {
        backgroundColor: '#9C27B0',
    },
    botonTexto: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});