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
    labelPicker: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
    },
    picker: {
        height: 50,
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
    botonTexto: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    areaLista: {
        flex: 1,
    },
    dispositivoItem: {
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
    infoDispositivo: {
        flex: 1,
    },
    nombreDispositivo: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    detalleDispositivo: {
        color: '#666',
        fontSize: 14,
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