import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Contenedor = ({ children }) => {
  return <View style={styles.contenedor}>{children}</View>;
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e3f2fd', 
  },
});

export default Contenedor;