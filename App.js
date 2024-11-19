<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
=======
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { useFonts } from 'expo-font';

import Report from './src/screens/Report';
import SurveyActions from './src/screens/SurveyActions';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'AveriaLibre-Regular': require('./src/assets/fonts/AveriaLibre-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2B1D62',
        },
        headerTintColor: '#573FBA',
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'AveriaLibre-Regular',
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="SurveyActions"
        component={SurveyActions}
        options={{ title: 'Carnaval', headerTitleStyle: { fontFamily: 'AveriaLibre-Regular', color: '#fff',}}}
      />
      
      <Stack.Screen
        name="Report"
        component={Report}
        options={{ title: 'Relatório', headerTitleStyle: { fontFamily: 'AveriaLibre-Regular', color: '#fff',}}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

}

const styles = StyleSheet.create({
>>>>>>> d15074a (Commit no código completo)
});
