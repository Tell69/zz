import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  formulario: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  botonAgregar: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 5,
  },
  botonActualizar: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 5,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  areaLista: {
    flex: 1,
  },
  usuarioItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  textoUsuario: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  botones: {
    flexDirection: 'row',
    gap: 5,
  },
  botonEditar: {
    backgroundColor: '#FFC107',
    padding: 8,
    borderRadius: 5,
  },
  botonEliminar: {
    backgroundColor: '#DC3545',
    padding: 8,
    borderRadius: 5,
  },
  botonTextoMini: {
    fontSize: 14,
    color: '#fff',
  },
});