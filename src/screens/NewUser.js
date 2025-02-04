import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import CustomInputPassWord from "../components/CustonInputPassWord";
import { useFonts } from "expo-font";
<<<<<<< HEAD
import { useNavigation } from "@react-navigation/native";

=======
//aaaaaa
>>>>>>> 3fca49c94cea42ebbadeef321c1b7f8ede3d7b26
export default function NewUser() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessageSenha, setErrorMessageSenha] = useState("");
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    "AveriaLibre-Regular": require("../assets/fonts/AveriaLibre-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const validadeSenha = (senhaV, senha2V) => {
    if (!senhaV || !senha2V) {
      setErrorMessageSenha("Ambos os campos de senha devem ser preenchidos.");
      return false;
    }
    if (senhaV !== senha2V) {
      setErrorMessageSenha("As senhas não coincidem.");
      return false;
    }
    setErrorMessageSenha("");
    return true;
  };

  const validateEmail = (emailV) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailV)) {
      setErrorMessageEmail("E-mail inválido.");
      return false;
    } else {
      setErrorMessageEmail("");
      return true;
    }
  };

  const criarUsuario = (senhaV, senha2V, emailV) => {
    if (validadeSenha(senhaV, senha2V) && validateEmail(emailV)) {
      navigation.navigate("Login");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.inputContainer}>
          <CustomInput
            label="E-mail"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              validateEmail(text);
            }}
          />
          {errorMessageEmail ? (
            <Text style={styles.errorText}>{errorMessageEmail}</Text>
          ) : null}
          <CustomInputPassWord
            label="Senha"
            value={senha}
            onChangeText={(text1) => {
              setSenha(text1);
            }}
          />
          <CustomInputPassWord
            label="Repetir senha"
            value={senha2}
            onChangeText={(text2) => {
              setSenha2(text2);
            }}
          />
          {errorMessageSenha ? (
            <Text style={styles.errorText}>{errorMessageSenha}</Text>
          ) : null}

          <TouchableOpacity
            style={styles.button}
            onPress={() => criarUsuario(senha, senha2, email)}
          >
            <Text style={styles.text}>Cadastrar</Text>
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
  text: {
    fontFamily: "AveriaLibre-Regular",
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    marginTop: 4,
    color: "#FD7979",
    fontSize: 15,
    fontFamily: "AveriaLibre-Regular",
  },
});
