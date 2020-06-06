import React, { useState, useEffect, ChangeEvent } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import {
  View,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

import ibge from '../../services/ibge-api';

interface IBGEUFResponse {
  id: number;
  sigla: string;
  nome: string;
}
interface IBGECityResponse {
  id: number;
  nome: string;
}

const Home = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [citys, setCitys] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const navigation = useNavigation();

  useEffect(() => {
    ibge.get<IBGEUFResponse[]>('').then(response => {
      const initials = response.data.map(item => item.sigla);
      setUfs(initials);
    });
  }, []);

  useEffect(() => {
    if ( selectedUf === '0') return;
    ibge.get<IBGECityResponse[]>(`${selectedUf}/municipios`).then(response => {
      const citys = response.data.map(item => item.nome);
      setCitys(citys);
    });
  }, [selectedUf]);

  const handleNavigateToPoints = () => {
    if (selectedUf && selectedCity) {
      navigation.navigate('Points', {
        uf: selectedUf,
        city: selectedCity,
      });
    } else {
      Alert.alert('Ooooops...','Preencha o estado e a cidade onde deseja procurar o ponto de coleta.')
    }
  }

  const handleSelectUf = (value: string) => {
    const uf = value;
    setSelectedUf(uf);
  }

  const handleSelectedCity = (value: string) => {
    const city = value;
    setSelectedCity(city);
  }


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
    >
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')}/>
          <View>
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos
            </Text>
            <Text style={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          {/* <View style={styles.input}> */}
            <RNPickerSelect
              doneText={'Selecionar'}
              placeholder={{
                label: 'Selecione um estado...',
                value: null,
                color: '#9EA0A4',
              }}
              value={selectedUf}
              style={pickerSelectStyles}
              items={ufs.map(item => ({
                label: item,
                value: item,
              }))}
              onValueChange={value => handleSelectUf(value)}
            />
          {/* </View> */}
          {/* <View style={styles.input}> */}
            <RNPickerSelect
              doneText={'Selecionar'}
              placeholder={{
                label: 'Selecione uma cidade...',
                value: null,
                color: '#9EA0A4',
              }}
              value={selectedCity}
              style={pickerSelectStyles}
              items={citys.map(item => ({
                label: item,
                value: item,
              }))}
              onValueChange={value => handleSelectedCity(value)}
              />
          {/* </View> */}
          <RectButton
            style={styles.button}
            onPress={ handleNavigateToPoints }
          >
            <View style={styles.buttonIcon}>
              <Icon name='arrow-right' color='#fff' size={24}/>
            </View>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'gray',
    color: 'black',
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    height: 60,
    backgroundColor: '#FFF',
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default Home;
