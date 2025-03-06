import { SQLiteDatabase } from 'expo-sqlite';

export const migrarBaseDatos = async (db) => {
    const VersionBaseDatos = 1;
    
    try {
        let { user_version: versionActual } = await db.getFirstAsync('PRAGMA user_version');
        
        if (versionActual >= VersionBaseDatos) {
            return;
        }
        
        if (versionActual === 0) {
            await db.execAsync(`
                PRAGMA journal_mode = "wal"; 
                CREATE TABLE IF NOT EXISTS usuarios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    nombre TEXT NOT NULL, 
                    correo TEXT NOT NULL
                );
            `);
            versionActual = 1;
        }
        
        await db.execAsync(`PRAGMA user_version = ${VersionBaseDatos}`);
        console.log("Migración de base de datos completada");
    } catch (error) {
        console.error("Error en migración:", error);
    }
};

export const getUsuarios = async (db) => {
    try {
        return await db.getAllAsync('SELECT * FROM usuarios');
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return [];
    }
};


export const saveUsuario = async (db, nombre, correo) => {
    if (!nombre || !correo) return;
    
    try {
        await db.runAsync(
            'INSERT INTO usuarios (nombre, correo) VALUES (?, ?);',
            [nombre, correo]
        );
        console.log("Usuario guardado correctamente");
    } catch (error) {
        console.error("Error al guardar usuario:", error);
        throw error;
    }
};


export const editarUsuario = async (db, id, nombre, correo) => {
    try {
        await db.runAsync(
            'UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?;',
            [nombre, correo, id]
        );
        console.log("Usuario actualizado correctamente");
    } catch (error) {
        console.error("Error al editar usuario:", error);
        throw error;
    }
};


export const eliminarUsuario = async (db, id) => {
    try {
        await db.runAsync('DELETE FROM usuarios WHERE id = ?;', [id]);
        console.log("Usuario eliminado correctamente");
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        throw error;
    }
};