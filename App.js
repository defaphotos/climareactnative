import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

const App = () => {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: '',
  });
  const {ciudad, pais} = busqueda;
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [bgcolor, guardarBgcolor] = useState('rgb(71,149,212)');
  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=f0a5d78acf54bdda225e3d68dc4a7823`;
        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          guardarResultado(resultado);

          const kelvin = 273.15;

          const {main} = resultado;
          const actual = main.temp - kelvin;

          if (actual < 10) {
            guardarBgcolor('rgb(105,108,149)');
          } else if (actual >= 10 && actual <= 25) {
            guardarBgcolor('rgb(71,149,212)');
          } else if (actual > 25) {
            guardarBgcolor('rgb(178,28,61)');
          }
        } catch (error) {
          montrarAlerta();
        }
        guardarConsultar(false);
      }
    };
    consultarAPI();
  }, [consultar, ciudad, pais]);
  const montrarAlerta = () => {
    Alert.alert('Error', 'No hay resultados', [{text: 'OK'}]);
  };
  const bgColorApp = {
    backgroundColor: bgcolor,
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima resultado={resultado} />
            <Formulario
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultar={guardarConsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
