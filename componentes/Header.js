import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';

const Header = () => (
    <View>
        <Text style={styles.encabezado}>Criptomonedas</Text>
    </View>
);

const styles = StyleSheet.create({
    encabezado: {
        paddingTop: Platform.OS === 'ios' ? 50 : 10,
        fontFamily: 'Lato-Black',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
        color: '#FFF',
        backgroundColor: '#5E49E2',
        paddingBottom: 10,
        marginBottom: 30
    }
});

export default Header;
