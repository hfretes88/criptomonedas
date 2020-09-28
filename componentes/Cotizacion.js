import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Cotizacion = ({resultado}) => {

    if(Object.keys(resultado).length === 0) return null;
    
    return(
        <View style={styles.resultado}>
            <Text style={[styles.texto, styles.precio]}>
                <Text style={styles.span}>{resultado.PRICE}</Text>
            </Text>
            <Text style={styles.texto}>Precio más alto del día: {' '}
                <Text style={styles.span}>{resultado.HIGHDAY}</Text>
            </Text>
            <Text style={styles.texto}>Precio más bajo del día: {' '}
                <Text style={styles.span}>{resultado.LOWDAY}</Text>
            </Text>
            <Text style={styles.texto}>Variación últimas 24hs: {' '}
                <Text style={styles.span}>{resultado.CHANGEPCT24HOUR} %</Text>
            </Text>
            <Text style={styles.texto}>Última actualización: {' '}
                <Text style={styles.span}>{resultado.LASTUPDATE}</Text>
            </Text>

        </View>
    )
};

const styles = StyleSheet.create({
    resultado:{
        backgroundColor: '#5E49E2',
        padding: 20
    },
    texto:{
        color: '#FFF',
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        marginTop: 10
    },
    precio:{
        fontSize: 28
    },
    span: {
        fontFamily: 'Lato-Black',
    }
});

export default Cotizacion;
