import React, { useState, useCallback, useEffect } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Contenedor from "../../components/contenedor/Contenedor";
import { useSQLiteContext } from "expo-sqlite";
import { getUsuarios, getDispositivos, saveDispositivo, editarDispositivo, eliminarDispositivo } from "../../servicios/Database";

const Dispositivos = () => {
    const db = useSQLiteContext();
    const [nombre, setNombre] = useState('');
    const [modelo, setModelo] = useState('');
    const [usuarioId, setUsuarioId] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [dispositivos, setDispositivos] = useState([]);
    const [editId, setEditId] = useState(null);

    const cargarDatos = useCallback(async () => {
        try {
            const listaUsuarios = await getUsuarios(db);
            setUsuarios(listaUsuarios);
            
            if (listaUsuarios.length > 0 && !usuarioId) {
                setUsuarioId(listaUsuarios[0].id.toString());
            }
            
            const listaDispositivos = await getDispositivos(db);
            setDispositivos(listaDispositivos);
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    }, [db, usuarioId]);

    useEffect(() => {
        cargarDatos();
    }, [cargarDatos]);

    const manejarGuardarDispositivo = async () => {
        if (!nombre || !modelo || !usuarioId) return;
        
        try {
            if (editId) {
                await editarDispositivo(db, editId, nombre, modelo, parseInt(usuarioId));
                setEditId(null);
            } else {
                await saveDispositivo(db, nombre, modelo, parseInt(usuarioId));
            }
            setNombre('');
            setModelo('');
            cargarDatos();
        } catch (error) {
            console.error("Error al guardar dispositivo:", error);
        }
    };

    const prepararEdicion = (dispositivo) => {
        setNombre(dispositivo.nombre);
        setModelo(dispositivo.modelo);
        setUsuarioId(dispositivo.usuario_id.toString());
        setEditId(dispositivo.id);
    };

    return (
        <Contenedor>
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Gestión de Dispositivos</Text>
                
                <View style={styles.formulario}>
                    <TextInput
                        onChangeText={setNombre}
                        value={nombre}
                        placeholder="Nombre del dispositivo"
                        style={styles.input}
                    />
                    <TextInput
                        onChangeText={setModelo}
                        value={modelo}
                        placeholder="Modelo"
                        style={styles.input}
                    />
                    
                    <Text style={styles.labelPicker}>Propietario:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={usuarioId}
                            onValueChange={(itemValue) => setUsuarioId(itemValue)}
                            style={styles.picker}
                        >
                            {usuarios.map(usuario => (
                                <Picker.Item 
                                    key={usuario.id} 
                                    label={usuario.nombre} 
                                    value={usuario.id.toString()} 
                                />
                            ))}
                        </Picker>
                    </View>
                    
                    <TouchableOpacity 
                        style={editId ? styles.botonActualizar : styles.botonAgregar} 
                        onPress={manejarGuardarDispositivo}
                    >
                        <Text style={styles.botonTexto}>{editId ? 'Actualizar' : 'Agregar'}</Text>
                    </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.areaLista}>
                    {dispositivos.map((dispositivo) => (
                        <View key={dispositivo.id} style={styles.dispositivoItem}>
                            <View style={styles.infoDispositivo}>
                                <Text style={styles.nombreDispositivo}>{dispositivo.nombre}</Text>
                                <Text style={styles.detalleDispositivo}>Modelo: {dispositivo.modelo}</Text>
                                <Text style={styles.detalleDispositivo}>Propietario: {dispositivo.nombre_propietario}</Text>
                            </View>
                            <View style={styles.botones}>
                                <TouchableOpacity 
                                    style={styles.botonEditar} 
                                    onPress={() => prepararEdicion(dispositivo)}
                                >
                                    <Text style={styles.botonTextoMini}>✏️</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.botonEliminar} 
                                    onPress={async () => {
                                        await eliminarDispositivo(db, dispositivo.id);
                                        cargarDatos();
                                    }}
                                >
                                    <Text style={styles.botonTextoMini}>🗑️</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </Contenedor>
    );
};

const styles = StyleSheet.create({
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

export default Dispositivos;