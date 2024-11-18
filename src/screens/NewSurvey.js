import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import CustomInput from '../components/CustomInput'
import ImagePickerInput from '../components/ImagePickerInput';

export default function NewSurvey() {
  const [name, onChangeName] = React.useState('');
  const [nameError, setNameError] = React.useState(false);

  const [date, onChangeDate] = React.useState('');
  const [dateError, setDateError] = React.useState(false);

  const [imageUri, setImageUri] = React.useState(null);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.inputContainer}>
          <CustomInput label='Nome' value={name} onChangeText={onChangeName} err={nameError} errorMessage='Preencha o nome da pesquisa'/>
          <CustomInput label='Data' value={date} onChangeText={onChangeDate} err={dateError} showDatePicker={true} errorMessage='Preencha a data'/>
          <ImagePickerInput label="Imagem" image={imageUri} setImage={setImageUri}/>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>
              Cadastrar
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#573FBA',
    flex: 1
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
    marginTop: 16
  },
  text: {
    fontFamily: 'AveriaLibre-Regular',
    color: '#fff',
    fontSize: 16
  }
})