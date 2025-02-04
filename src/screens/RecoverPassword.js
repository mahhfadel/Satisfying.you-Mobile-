import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CustomInput from "../components/CustomInput";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

<<<<<<< HEAD
const RecoverPassword = () => {
  const [email, onChangeEmail] = React.useState("");
=======
const RecoverPassword = ({ navigation }) => {
  const [email, onChangeEmail] = React.useState('');
>>>>>>> 3fca49c94cea42ebbadeef321c1b7f8ede3d7b26
  const [emailError, setEmailError] = React.useState(false);
  const navigation = useNavigation();

<<<<<<< HEAD
  const handleClick = (email) => {
    if (validateEmail(email)) {
      navigation.navigate("Login");
=======
  const handleClick = () => { 
    navigation.navigate('Login');
  }

  useEffect(() => {
    if(email !== ''){
        const mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!mailRegex.test(email)){
            setEmailError(true);
            return;
        }

        setEmailError(false);
>>>>>>> 3fca49c94cea42ebbadeef321c1b7f8ede3d7b26
    }
  };

  const validateEmail = (emailV) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailV)) {
      setEmailError("E-mail inválido.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.inputContainer}>
          <CustomInput
            label="E-mail"
            value={email}
            onChangeText={onChangeEmail}
            err={emailError}
            errorMessage="E-mail parece ser inválido."
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleClick(email);
            }}
          >
            <Text style={styles.text}>Recuperar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default RecoverPassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#573FBA",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "25%",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#37BD6D",
    padding: 8,
    marginTop: 8,
  },
  text: {
    fontFamily: "AveriaLibre-Regular",
    color: "#fff",
    fontSize: 16,
  },
});
