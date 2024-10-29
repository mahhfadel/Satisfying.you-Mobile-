import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from '@react-navigation/native'

export default function NewSurvey() {
  return (
    <Link to={{ screen: 'EditSurvey'}}> Clique aqui </Link>
  )
}

const styles = StyleSheet.create({})