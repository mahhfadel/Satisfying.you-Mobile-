import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, StyleSheet } from "react-native";

import { useFonts } from "expo-font";

import NewSurvey from "./src/screens/NewSurvey";
import EditSurvey from "./src/screens/EditSurvey";
import Coleta from "./src/screens/Coleta";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "AveriaLibre-Regular": require("./src/assets/fonts/AveriaLibre-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2B1D62",
          },
          headerTintColor: "#573FBA",
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "AveriaLibre-Regular",
            fontWeight: "bold",
          },
          headerBackTitleVisible: false,
        }}
      >
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
        <Stack.Screen
          name="NewSurvey"
          component={NewSurvey}
          options={{
            title: "Nova Pesquisa",
            headerTitleStyle: {
              fontFamily: "AveriaLibre-Regular",
              color: "#fff",
            },
          }}
        />
        <Stack.Screen
          name="EditSurvey"
          component={EditSurvey}
          options={{
            title: "Modificar Pesquisa",
            headerTitleStyle: {
              fontFamily: "AveriaLibre-Regular",
              color: "#fff",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
