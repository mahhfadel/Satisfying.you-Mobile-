import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import AntDesign from '@expo/vector-icons/AntDesign';

import CustomInput from '../components/CustomInput'
import ImagePickerInput from '../components/ImagePickerInput';

import Modal from 'react-native-modal';

export default function NewSurvey() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
        <TouchableOpacity style={styles.deleteButton} onPress={toggleModal}>
          <AntDesign name="delete" size={24} color="white" />
          <Text style={styles.textButton}>Apagar</Text>
        </TouchableOpacity>


        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContent}>

            <Text style={styles.message}>Tem certeza de apagar essa pesquisa?</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.modalButton, styles.removeButton]} onPress={toggleModal}>
                  <Text style={styles.modalButtonText}>
                    Sim
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.actionButton]} onPress={toggleModal}>
                  <Text style={styles.modalButtonText}>
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </Modal>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#573FBA',
    flex: 1,
    position: 'relative'
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
  },
  deleteButton: {
    position: 'absolute',
    right: '2.5%',
    bottom: '0',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3
  },
  textButton: {
    fontFamily: 'AveriaLibre-Regular',
    color: '#fff',
    fontSize: 16
  },
  modalContent: { backgroundColor: '#2B1F5C', padding: 20, borderRadius: 10, maxHeight: '80%', maxWidth: '40%', margin: 'auto' },
  message: { fontSize: 16, fontFamily: 'AveriaLibre-Regular', marginBottom: 10, color: '#fff', textAlign: 'center' },
  buttonContainer: { marginTop: 16, width:'100%', flexDirection: 'row', justifyContent: 'center', height: 32},
  modalButton: { backgroundColor: '#fff', padding: 8, height: 32, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%'},
  modalButtonText: { fontFamily: 'AveriaLibre-Regular', color: '#fff', textTransform: 'uppercase' },
  actionButton: { backgroundColor: '#3F92C5'},
  removeButton: { backgroundColor: '#FF8383'},
  buttonRow: { flexDirection: 'row', gap: 4, justifyContent: 'center', alignItems: 'center'}
})