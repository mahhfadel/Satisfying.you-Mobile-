import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import CustomInput from "../components/CustomInput";
import CustomInputPassWord from "../components/CustonInputPassWord";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    "AveriaLibre-Regular": require("../assets/fonts/AveriaLibre-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("E-mail inválido.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const handleClick = (email, senha) => {
    if (validateEmail(email) && senha != "") {
      navigation.navigate("Home");
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
          <CustomInputPassWord
            label="Senha"
            value={senha}
            onChangeText={setSenha}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleClick(email)}
          >
            <Text style={styles.text}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonBlue}
            onPress={() => navigation.navigate("NewUser")}
          >
            <Text style={styles.textButton}>Criar minha conta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonGray}
            onPress={() => navigation.navigate("RecoverPassword")}
          >
            <Text style={styles.textButton}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
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
    alignSelf: "center",
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
