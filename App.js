
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

import { useFonts } from "expo-font";


import Coleta from "./src/screens/Coleta";
import NewSurvey from './src/screens/NewSurvey';
import EditSurvey from './src/screens/EditSurvey';
import RecoverPassword from './src/screens/RecoverPassword';
import Drawer from './src/screens/Drawer';

import { Ionicons } from '@expo/vector-icons';
import { SurveyProvider } from './src/context/SurveyContext';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "AveriaLibre-Regular": require("./src/assets/fonts/AveriaLibre-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (

  <SurveyProvider>
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

        <Stack.Screen name="Home" component={Drawer} options={{ headerShown: false}}/>

        
        <Stack.Screen name="RecoverPassword" component={RecoverPassword} options={{title: 'Recuperação de senha', headerTitleStyle: {fontFamily: 'AveriaLibre-Regular', color: '#fff'}}}/>
        <Stack.Screen
          name="NewSurvey"
          component={NewSurvey}
          options={{ title: 'Nova Pesquisa', headerTitleStyle: { fontFamily: 'AveriaLibre-Regular', color: '#fff',}}}
        />
        <Stack.Screen
          name="EditSurvey"
          component={EditSurvey}
          options={{ title: 'Modificar Pesquisa', headerTitleStyle: { fontFamily: 'AveriaLibre-Regular', color: '#fff',}}}
        />

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

        <Stack.Screen
          name="Coleta"
          component={Coleta}
          options={{
            title: "Coleta",
            headerTitleStyle: {
              fontFamily: "AveriaLibre-Regular",
              color: "#fff",
            },
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  </SurveyProvider>
);
}

const styles = StyleSheet.create({});
