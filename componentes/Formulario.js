import React , { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
import axios from 'axios';

const Formulario = ({ moneda, criptomoneda, setMoneda, setCriptomoneda, setConsultarAPI }) => {
    

    const [criptomonedas, setCriptomonedas] = useState([]);

    const obtenerMoneda = moneda => {
        console.log("Moneda Seleccionada: " + moneda);
        setMoneda(moneda);
    }

    const obtenerCriptomoneda = cripto => {
        console.log("Criptomoneda Seleccionada: " + cripto);
        setCriptomoneda(cripto);
    }

    useEffect(() => {
        const consultarAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            console.log(resultado.data.Data);
            setCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    const cotizarPrecio = () => {
        if(moneda.trim()===''||criptomoneda.trim()===''){
            mostrarAlerta();
            return;
        }

        setConsultarAPI(true);
        console.log("Cotizando.....")

    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Ambos campos son obligatorios.',
            [{
                text: 'OK'
            }]
        )
    }

    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={moneda => obtenerMoneda(moneda)}
            >
                <Picker.Item label="- Seleccione -" value=""/>
                <Picker.Item label="Peso Argentino" value="ARS"/>
                <Picker.Item label="Peso Mexicano" value="MXN"/>
                <Picker.Item label="Dolar Estadounidense" value="USD"/>
                <Picker.Item label="Libra Esterlina" value="GBP"/>
                <Picker.Item label="Euro" value="EUR"/>
            </Picker>
            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
                selectedValue={criptomoneda}
                onValueChange={criptomoneda => obtenerCriptomoneda(criptomoneda)} 
                itemStyle={{ height: 120 }}
            >
                <Picker.Item label="- Seleccione -" value=""/>
                { criptomonedas.map( cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                )) }
            </Picker>

            <TouchableHighlight
                style={styles.btnCotizar}
                onPress={ () => cotizarPrecio() }
            >
                <Text style={styles.textoBtnCotizar}>Cotizar</Text>
            </TouchableHighlight>

        </View>
    )
};

const styles = StyleSheet.create({
    label:{
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20
    },
    btnCotizar: {
        backgroundColor: '#31888B',
        padding: 10,
        marginTop: 20
    },
    textoBtnCotizar: {
        color: '#FFF',
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 18,
        textAlign: 'center'
    }
});

export default Formulario;
