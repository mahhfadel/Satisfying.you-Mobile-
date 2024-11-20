import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CustomInput from "./src/components/CustomInput";
import { useFonts } from "expo-font";

import NewUser from "./src/screens/NewUser";

function HomeScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    if (!email.includes("@")) {
      setEmailError("E-mail e/ou senha inválidos.");
    } else {
      setEmailError("");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.icon}>
          <Text style={styles.logo}>Satisfying.you</Text>
          <MaterialIcons
            name="sentiment-satisfied-alt"
            size={50}
            color="#FFFFFF"
          />
        </View>

        <View style={styles.inputContainer}>
          <CustomInput
            label="E-mail"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              validateEmail(text);
            }}
          />
          <CustomInput
            label="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonBlue}
            onPress={() => navigation.navigate("NewUser")}
          >
            <Text style={styles.textButton}>Criar minha conta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGray}>
            <Text style={styles.textButton}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "AveriaLibre-Regular": require("./src/assets/fonts/AveriaLibre-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#573FBA" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontFamily: "AveriaLibre-Regular" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewUser"
          component={NewUser}
          options={{ title: "Novo Usuário" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#573FBA",
    flex: 1,
  },
  logo: {
    color: "#FFFFFF",
    fontSize: 46,
    fontFamily: "AveriaLibre-Regular",
    marginRight: 25,
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  inputContainer: {
    width: "60%",
    margin: "auto",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#37BD6D",
    padding: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonBlue: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#419ED7",
    padding: 6,
    marginTop: 8,
  },
  buttonGray: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B0CCDE",
    padding: 6,
    marginTop: 8,
  },
  text: {
    fontFamily: "AveriaLibre-Regular",
    color: "#fff",
    fontSize: 16,
  },
  textButton: {
    fontFamily: "AveriaLibre-Regular",
    color: "#fff",
    fontSize: 15,
  },
  errorText: {
    marginTop: 4,
    color: "#FD7979",
    fontSize: 15,
    fontFamily: "AveriaLibre-Regular",
  },
});
