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

export default function NewUser() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [fontsLoaded] = useFonts({
    "AveriaLibre-Regular": require("../assets/fonts/AveriaLibre-Regular.ttf"),
  });

  useEffect(() => {
    if (senha && senha2 && senha === senha2) {
      setErrorMessage("O campo repetir senha difere da senha.");
    } else {
      setErrorMessage("");
    }
  }, [senha, senha2]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("E-mail inválido.");
    } else {
      setErrorMessage("");
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
          <CustomInputPassWord
            label="Senha"
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
          <CustomInputPassWord
            label="Repetir senha"
            value={senha2}
            onChangeText={(text) => setSenha2(text)}
          />
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <TouchableOpacity style={styles.button}>
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
