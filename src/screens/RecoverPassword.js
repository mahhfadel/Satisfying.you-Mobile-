import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import Modal from 'react-native-modal'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth_mod } from '../firebase/firebaseConfig'

const RecoverPassword = ({ navigation }) => {
  const [email, onChangeEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState(false)
  const [isModalVisible, setModalVisible] = useState(false)

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const handleClick = async () => {
    if (emailError === false) {
      try {
        await sendPasswordResetEmail(auth_mod, email)
        toggleModal() // Exibe o modal de sucesso
      } catch (error) {
        setEmailError('Houve um erro, tente novamente.')
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (email !== '') {
      const mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!mailRegex.test(email)) {
        setEmailError(true)
        return
      }
      setEmailError(false)
    }
  }, [email])

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.inputContainer}>
          <CustomInput
            label="E-mail"
            value={email}
            onChangeText={onChangeEmail}
            err={emailError}
            errorMessage="E-mail parece ser inválido."
          />
          <TouchableOpacity style={styles.button} onPress={handleClick}>
            <Text style={styles.text}>Recuperar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.message}>
            Um e-mail de recuperação foi enviado!
          </Text>
          <TouchableOpacity
            style={[styles.modalButton, styles.actionButton]}
            onPress={() => {
              toggleModal()
              navigation.navigate('Login')
            }}
          >
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

export default RecoverPassword

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#573FBA',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '60%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '25%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#37BD6D',
    padding: 8,
    marginTop: 8,
  },
  text: {
    fontFamily: 'AveriaLibre-Regular',
    color: '#fff',
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: '#2B1F5C',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',
    maxWidth: '80%',
    margin: 'auto',
  },
  message: {
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#fff',
    padding: 8,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalButtonText: {
    fontFamily: 'AveriaLibre-Regular',
    color: '#000',
    textTransform: 'uppercase',
  },
  actionButton: {
    backgroundColor: '#3F92C5',
  },
})