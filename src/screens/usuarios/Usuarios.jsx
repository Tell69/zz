import React, { useState, useCallback, useEffect } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import styles from "./Usuarios.styles";
import Contenedor from "../../components/contenedor/Contenedor";
import { useSQLiteContext } from "expo-sqlite";
import { getUsuarios, saveUsuario, editarUsuario, eliminarUsuario } from "../../servicios/Database";

const Usuarios = ({ navigation }) => {
    const db = useSQLiteContext();
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [editId, setEditId] = useState(null);

    const cargarUsuarios = useCallback(async () => {
        try {
            const listaUsuarios = await getUsuarios(db);
            setUsuarios(listaUsuarios);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        }
    }, [db]);

    useEffect(() => {
        cargarUsuarios();
    }, [cargarUsuarios]);

    const manejarGuardarUsuario = async () => {
        if (!nombre || !correo) return;
        
        try {
            if (editId) {
                await editarUsuario(db, editId, nombre, correo);
                setEditId(null);
            } else {
                await saveUsuario(db, nombre, correo);
            }
            setNombre('');
            setCorreo('');
            cargarUsuarios();
        } catch (error) {
            console.error("Error al guardar usuario:", error);
        }
    };

    return (
        <Contenedor>
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Gestión de Usuarios</Text>
                <View style={styles.formulario}>
                    <TextInput
                        onChangeText={setNombre}
                        value={nombre}
                        placeholder="Nombre"
                        style={styles.input}
                    />
                    <TextInput
                        onChangeText={setCorreo}
                        value={correo}
                        placeholder="Correo"
                        style={styles.input}
                    />
                    <TouchableOpacity 
                        style={editId ? styles.botonActualizar : styles.botonAgregar} 
                        onPress={manejarGuardarUsuario}
                    >
                        <Text style={styles.botonTexto}>{editId ? 'Actualizar' : 'Agregar'}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.areaLista}>
                    {usuarios.map((usuario) => (
                        <View key={usuario.id} style={styles.usuarioItem}>
                            <Text style={styles.textoUsuario}>
                                {usuario.nombre} - {usuario.correo}
                            </Text>
                            <View style={styles.botones}>
                                <TouchableOpacity 
                                    style={styles.botonEditar} 
                                    onPress={() => {
                                        setNombre(usuario.nombre);
                                        setCorreo(usuario.correo);
                                        setEditId(usuario.id);
                                    }}
                                >
                                    <Text style={styles.botonTextoMini}>✏️</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.botonEliminar} 
                                    onPress={async () => {
                                        await eliminarUsuario(db, usuario.id);
                                        cargarUsuarios();
                                    }}
                                >
                                    <Text style={styles.botonTextoMini}>🗑️</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                
                <TouchableOpacity 
                    style={styles.botonDispositivos} 
                    onPress={() => navigation.navigate('Dispositivos')}
                >
                    <Text style={styles.botonTexto}>Gestionar Dispositivos</Text>
                </TouchableOpacity>
            </View>
        </Contenedor>
    );
};

export default Usuarios;