import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'

import CustomInput from '../components/CustomInput'
import ImagePickerInput from '../components/ImagePickerInput';
import { ScrollView } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

export default function NewSurvey(props) {
  const navigation = useNavigation();

  const [name, onChangeName] = React.useState('');
  const [nameError, setNameError] = React.useState(false);

  const [date, onChangeDate] = React.useState('');
  const [dateError, setDateError] = React.useState(false);
  const [dateErrorMessage, setDateErrorMessage] = React.useState('Preencha a data');

  const [imageUri, setImageUri] = React.useState(null);

  const handleClick = () => {
    if(name === ''){
      setNameError(true);
    }

    if(date === ''){
      setDateErrorMessage('Preencha a data');
      setDateError(true);
    }

  }

  useEffect(() => {
    if(name !== ''){
      setNameError(false);
    }
  }, [name]);

  useEffect(() => {
    if(date !== ''){
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      
      if(dateRegex.test(date) === false){
        setDateErrorMessage('Formato de data inválido (DD/MM/AAAA)');
        setDateError(true);
        return;
      }   

      setDateError(false);
    }
  }, [date]);

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.inputContainer}>
          <CustomInput label='Nome' value={name} onChangeText={onChangeName} err={nameError} errorMessage='Preencha o nome da pesquisa'/>
          <CustomInput label='Data' value={date} onChangeText={onChangeDate} err={dateError} showDatePicker={true} errorMessage={dateErrorMessage}/>
          <ImagePickerInput label="Imagem" image={imageUri} setImage={setImageUri}/>
          <TouchableOpacity style={styles.button} onPress={handleClick}>
            <Text style={styles.text}>
              Cadastrar
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#573FBA',
    flex: 1,
  },
  inputContainer: {
    width: '60%',
    margin: 'auto'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#37BD6D',
    padding: 8,
    marginTop: 8
  },
  text: {
    fontFamily: 'AveriaLibre-Regular',
    color: '#fff',
    fontSize: 16,
    textTransform: 'uppercase'
  }
})