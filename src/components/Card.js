import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'

import { vw, vh } from 'react-native-expo-viewport-units';

const Card = ({ uri, title, date }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('EditSurvey', {pTitle: title, pDate: date, pUri: uri})}>
      <Image source={{ uri }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
    </TouchableOpacity>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: vh(50),
    width: vw(25),
    borderRadius: 8
  },
  image: {
    width: '80%',
    height: '60%',
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 20,
    color: '#3F92C5',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  date: {
    fontFamily: 'AveriaLibre-Regular',
    color: '#8B8B8B'
  }
})