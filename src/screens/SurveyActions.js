import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

export default function SurveyActions({ route, navigation }) {
  const { id, pTitle, pDate, pUri } = route.params || {};

  const handleClickModify = () => {
    navigation.navigate('EditSurvey', { id, pTitle, pDate, pUri });
  }

  const handleClickCollectData = () => {
    navigation.navigate('Coleta')
  }

  const handleClickReport = () => {
    navigation.navigate('Report')
  }


  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleClickModify}>
            <Image 
              source={require('../assets/modify.png')} 
              style={styles.icon} 
              alt="Modificar"
            />
            <Text style={styles.text}>
              Modificar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleClickCollectData}>
            <Image 
              source={require('../assets/collectData.png')} 
              style={styles.icon} 
              alt="Coletar dados"
            />
            <Text style={styles.text}>
              Coletar dados
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleClickReport}>
            <Image 
              source={require('../assets/report.png')} 
              style={styles.icon} 
              alt="Relatório"
            />
            <Text style={styles.text}>
              Relatório
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#573FBA',
    alignItems: 'center',
    padding: 60,
  },
  headerText: {
    fontFamily: 'AveriaLibre-Regular',
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#2B1F5C',
    width: 150,
    height: 150,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  text: {
    fontFamily: 'AveriaLibre-Regular',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});