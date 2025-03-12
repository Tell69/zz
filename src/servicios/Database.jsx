export const migrarBaseDatos = async (db) => {
    const VersionBaseDatos = 2; 
    
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
        
        if (versionActual === 1) {
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS dispositivos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT NOT NULL,
                    modelo TEXT NOT NULL,
                    usuario_id INTEGER NOT NULL,
                    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
                );
            `);
            versionActual = 2;
        }
        
        await db.execAsync(`PRAGMA user_version = ${VersionBaseDatos}`);
        console.log("Migración de base de datos completada");
    } catch (error) {
        console.error("Error en migración:", error);
    }
};

// Funciones para usuarios
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

// Funciones para dispositivos
export const getDispositivos = async (db) => {
    try {
        return await db.getAllAsync(`
            SELECT d.*, u.nombre as nombre_propietario
            FROM dispositivos d
            JOIN usuarios u ON d.usuario_id = u.id
        `);
    } catch (error) {
        console.error("Error al obtener dispositivos:", error);
        return [];
    }
};

export const getDispositivosPorUsuario = async (db, usuarioId) => {
    try {
        return await db.getAllAsync(
            'SELECT * FROM dispositivos WHERE usuario_id = ?',
            [usuarioId]
        );
    } catch (error) {
        console.error("Error al obtener dispositivos del usuario:", error);
        return [];
    }
};

export const saveDispositivo = async (db, nombre, modelo, usuarioId) => {
    if (!nombre || !modelo || !usuarioId) return;
    
    try {
        await db.runAsync(
            'INSERT INTO dispositivos (nombre, modelo, usuario_id) VALUES (?, ?, ?);',
            [nombre, modelo, usuarioId]
        );
        console.log("Dispositivo guardado correctamente");
    } catch (error) {
        console.error("Error al guardar dispositivo:", error);
        throw error;
    }
};

export const editarDispositivo = async (db, id, nombre, modelo, usuarioId) => {
    try {
        await db.runAsync(
            'UPDATE dispositivos SET nombre = ?, modelo = ?, usuario_id = ? WHERE id = ?;',
            [nombre, modelo, usuarioId, id]
        );
        console.log("Dispositivo actualizado correctamente");
    } catch (error) {
        console.error("Error al editar dispositivo:", error);
        throw error;
    }
};

export const eliminarDispositivo = async (db, id) => {
    try {
        await db.runAsync('DELETE FROM dispositivos WHERE id = ?;', [id]);
        console.log("Dispositivo eliminado correctamente");
    } catch (error) {
        console.error("Error al eliminar dispositivo:", error);
        throw error;
    }
};


export const getUsuariosConDispositivos = async (db) => {
    try {
        return await db.getAllAsync(`
            SELECT u.id, u.nombre, u.correo, COUNT(d.id) as total_dispositivos
            FROM usuarios u
            LEFT JOIN dispositivos d ON u.id = d.usuario_id
            GROUP BY u.id
        `);
    } catch (error) {
        console.error("Error al obtener usuarios con dispositivos:", error);
        return [];
    }
};

export const getDetallesDispositivo = async (db, dispositivoId) => {
    try {
        return await db.getFirstAsync(`
            SELECT d.*, u.nombre as nombre_propietario, u.correo as correo_propietario
            FROM dispositivos d
            JOIN usuarios u ON d.usuario_id = u.id
            WHERE d.id = ?
        `, [dispositivoId]);
    } catch (error) {
        console.error("Error al obtener detalles del dispositivo:", error);
        return null;
    }
};


export const buscarUsuarios = async (db, terminoBusqueda) => {
    try {
        return await db.getAllAsync(`
            SELECT * FROM usuarios 
            WHERE nombre LIKE ? OR correo LIKE ?
        `, [`%${terminoBusqueda}%`, `%${terminoBusqueda}%`]);
    } catch (error) {
        console.error("Error en la búsqueda de usuarios:", error);
        return [];
    }
};

export const buscarDispositivos = async (db, terminoBusqueda) => {
    try {
        return await db.getAllAsync(`
            SELECT d.*, u.nombre as nombre_propietario
            FROM dispositivos d
            JOIN usuarios u ON d.usuario_id = u.id
            WHERE d.nombre LIKE ? OR d.modelo LIKE ? OR u.nombre LIKE ?
        `, [`%${terminoBusqueda}%`, `%${terminoBusqueda}%`, `%${terminoBusqueda}%`]);
    } catch (error) {
        console.error("Error en la búsqueda de dispositivos:", error);
        return [];
    }
};


export const transferirDispositivo = async (db, dispositivoId, nuevoUsuarioId) => {
    try {
        await db.execAsync('BEGIN TRANSACTION');
        
        await db.runAsync(
            'UPDATE dispositivos SET usuario_id = ? WHERE id = ?',
            [nuevoUsuarioId, dispositivoId]
        );
        
        await db.execAsync('COMMIT');
        console.log("Dispositivo transferido correctamente");
        return true;
    } catch (error) {
        await db.execAsync('ROLLBACK');
        console.error("Error al transferir dispositivo:", error);
        throw error;
    }
};
