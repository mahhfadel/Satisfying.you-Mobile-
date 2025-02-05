// src/screens/Login.js
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth_mod } from "../firebase/firebaseConfig";
import CustomInput from "../components/CustomInput";
import CustomInputPassWord from "../components/CustonInputPassWord";
import { useAuth } from "../context/AuthContext";  // Importando o contexto de autenticação

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const navigation = useNavigation();

  const { setUserCredentials } = useAuth();  // Acesso ao contexto para salvar o usuário

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

  const handleClick = async () => {
    if (validateEmail(email) && senha !== "") {
      try {
        const userCredential = await signInWithEmailAndPassword(auth_mod, email, senha);
        const user = userCredential.user;
        setUserCredentials(user);  // Atualiza o contexto com o usuário autenticado
        navigation.navigate("Home");
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          setEmailError("Usuário não encontrado.");
        } else if (error.code === "auth/wrong-password") {
          setSenhaError("Senha incorreta.");
        } else {
          setEmailError("Houve um erro, tente novamente.");
        }
      }
    } else {
      if (senha === "") {
        setSenhaError("Campo de senha é obrigatório.");
      }
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
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <CustomInputPassWord
            label="Senha"
            value={senha}
            onChangeText={setSenha}
          />
          {senhaError ? <Text style={styles.errorText}>{senhaError}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleClick}>
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