import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomInput from '../components/CustomInput'
import { useEffect } from 'react';

const RecoverPassword = () => {
  const [email, onChangeEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);

  const handleClick = () => { 

  }

  useEffect(() => {
    if(email !== ''){
        const mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!mailRegex.test(email)){
            setEmailError(true);
            return;
        }

        setEmailError(false);
    }
  }, [email])

  return (
    <View style={styles.container}>
        <SafeAreaView>
            <View style={styles.inputContainer}>
                <CustomInput label='E-mail' value={email} onChangeText={onChangeEmail} err={emailError} errorMessage='E-mail parece ser inválido.'/>
                <TouchableOpacity style={styles.button} onPress={handleClick}>
                    <Text style={styles.text}>
                        Recuperar
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
        alignItems: 'center'
    },
    inputContainer: {
        width: '60%',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '25%'
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
        fontSize: 16
      }
})