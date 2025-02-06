import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";

import { useFonts } from "expo-font";

import { firebase } from "./src/firebase/firebaseConfig";

import Login from "./src/screens/Login";
import Coleta from "./src/screens/Coleta";
import Drawer from "./src/screens/Drawer";
import EditSurvey from "./src/screens/EditSurvey";
import NewSurvey from "./src/screens/NewSurvey";
import NewUser from "./src/screens/NewUser";
import RecoverPassword from "./src/screens/RecoverPassword";
import Report from "./src/screens/Report";
import SurveyAction from "./src/screens/SurveyActions";

import { AuthProvider } from "./src/context/AuthContext";

import { SurveyProvider } from "./src/context/SurveyContext";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "AveriaLibre-Regular": require("./src/assets/fonts/AveriaLibre-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <AuthProvider>
      <SurveyProvider>
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
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Coleta"
              component={Coleta}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="EditSurvey"
              component={EditSurvey}
              Options={{
                title: "Modificar Pesquisa",
                headerTitleStyle: {
                  fontFamily: "AveriaLibre-Regular",
                  color: "#fff",
                },
              }}
            />

            <Stack.Screen
              name="Home"
              component={Drawer}
              options={{ headerShown: false }}
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
              name="NewUser"
              component={NewUser}
              options={{
                title: "Criar uma conta",
                headerTitleStyle: {
                  fontFamily: "AveriaLibre-Regular",
                  color: "#fff",
                },
              }}
            />

            <Stack.Screen
              name="RecoverPassword"
              component={RecoverPassword}
              options={{
                title: "Recuperação de senha",
                headerTitleStyle: {
                  fontFamily: "AveriaLibre-Regular",
                  color: "#fff",
                },
              }}
            />

            <Stack.Screen
              name="Report"
              component={Report}
              options={{
                title: "Relatorio",
                headerTitleStyle: {
                  fontFamily: "AveriaLibre-Regular",
                  color: "#fff",
                },
              }}
            />

            <Stack.Screen
              name="SurveyAction"
              component={SurveyAction}
              options={{
                title: "Detalhes da Pesquisa",
                headerTitleStyle: {
                  fontFamily: "AveriaLibre-Regular",
                  color: "#fff",
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SurveyProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
