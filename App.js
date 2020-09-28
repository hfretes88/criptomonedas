import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView, ActivityIndicator } from 'react-native';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Cotizacion from './componentes/Cotizacion';
import axios from 'axios';

const App = () => {

  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [consultarAPI, setConsultarAPI] = useState(false);
  const [resultadoCotizacion, setResultadoCotizacion] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if(consultarAPI){
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        console.log(url);
        const resultado = await axios.get(url);
        setCargando(true);
        setTimeout(() => {
          setResultadoCotizacion(resultado.data.DISPLAY[criptomoneda][moneda]);
          setConsultarAPI(false);
          setCargando(false);
        }, 3000);
      }
    }
    cotizarCriptomoneda();
  }, [consultarAPI])

  const componente = cargando ? <ActivityIndicator size='large' color='#31888B'/> : <Cotizacion resultado={resultadoCotizacion}/>;
  
  return (
    <ScrollView>
      <Header />
      
      <Image style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />

      <View style={styles.contenido}>
        <Formulario 
          moneda={moneda}
          criptomoneda={criptomoneda}
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
          setConsultarAPI={setConsultarAPI}
        />
      </View>
      <View style={{marginTop: 40}}>
        {componente}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }

});

export default App;
