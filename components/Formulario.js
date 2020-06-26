import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {
  const [animacionBoton] = useState(new Animated.Value(1));
  const animacionEntrada = () => {
    Animated.spring(animacionBoton, {
      toValue: 0.9,
    }).start();
  };
  const animacionSalida = () => {
    Animated.spring(animacionBoton, {
      toValue: 1,
      friction: 4,
      tension: 30,
    }).start();
  };

  const estiloAnimacion = {
    transform: [{scale: animacionBoton}],
  };

  const consultarClima = () => {
    if (busqueda.ciudad.trim() === '' || busqueda.pais.trim() === '') {
      montrarAlerta();
      return;
    }
    guardarConsultar(true);
  };

  const montrarAlerta = () => {
    Alert.alert('Error', 'Todos los campos son obligatorios', [{text: 'OK'}]);
  };

  return (
    <View>
      <View>
        <TextInput
          value={busqueda.ciudad}
          style={styles.input}
          placeholder="Ciudad"
          placeholderTextColor="#666"
          onChangeText={ciudad => guardarBusqueda({...busqueda, ciudad})}
        />
      </View>
      <View>
        <Picker
          onValueChange={pais => guardarBusqueda({...busqueda, pais})}
          selectedValue={busqueda.pais}
          itemStyle={{height: 120, backgroundColor: '#fff'}}>
          <Picker.Item label="-- Seleccione un país --" value="" />
          <Picker.Item label="Estados Unidos" value="US" />
          <Picker.Item label="México" value="MX" />
          <Picker.Item label="Argentina" value="AR" />
          <Picker.Item label="Colombia" value="CO" />
          <Picker.Item label="Costa Rica" value="CR" />
          <Picker.Item label="España" value="ES" />
          <Picker.Item label="Perú" value="PE" />
          <Picker.Item label="China" value="CN" />
        </Picker>
      </View>
      <TouchableWithoutFeedback
        onPress={() => consultarClima()}
        onPressIn={() => animacionEntrada()}
        onPressOut={() => animacionSalida()}>
        <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
          <Text style={styles.textoBuscar}>Buscar Clima</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#fff',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  textoBuscar: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Formulario;
