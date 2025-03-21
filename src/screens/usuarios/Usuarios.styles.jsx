import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    contenedor: {
        flex: 1,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    formulario: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
    },
    botonAgregar: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    botonActualizar: {
        backgroundColor: '#2196F3',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    botonDispositivos: {
        backgroundColor: '#9C27B0',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 15,
    },
    botonTexto: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    areaLista: {
        flex: 1,
    },
    usuarioItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    textoUsuario: {
        fontSize: 16,
        flex: 1,
    },
    botones: {
        flexDirection: 'row',
    },
    botonEditar: {
        backgroundColor: '#FFC107',
        padding: 8,
        borderRadius: 5,
        marginRight: 8,
    },
    botonEliminar: {
        backgroundColor: '#F44336',
        padding: 8,
        borderRadius: 5,
    },
    botonTextoMini: {
        fontSize: 18,
    },
});