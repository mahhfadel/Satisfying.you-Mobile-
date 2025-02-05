import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { SurveyContext } from "../context/SurveyContext";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

import CustomInput from "../components/CustomInput";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";

export default function NewSurvey({ navigation }) {
  const { surveys, setSurveys } = useContext(SurveyContext);

  const [name, onChangeName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [date, onChangeDate] = useState("");
  const [dateError, setDateError] = useState(false);
  const [dateErrorMessage, setDateErrorMessage] = useState("Preencha a data");

  const [imageBase64, setImageBase64] = useState(null);

  // Função para selecionar e processar imagem
  const selecionarImagem = () => {
    const options = {
      mediaType: "photo",
      quality: 1,
      includeBase64: true,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("Usuário cancelou a seleção da imagem.");
      } else if (response.error) {
        console.log("Erro ao selecionar imagem:", response.error);
      } else {
        processarImagem(response.assets[0].uri);
      }
    });
  };

  const processarImagem = async (uri) => {
    try {
      const resizedImage = await ImageResizer.createResizedImage(
        uri,
        800,
        600,
        "JPEG",
        80
      );
      const response = await fetch(resizedImage.uri);
      const blob = await response.blob();

      // Convertendo blob para Base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result.split(",")[1]; // Removendo "data:image/jpeg;base64,"
        setImageBase64(base64data);
      };
    } catch (error) {
      console.log("Erro ao processar imagem:", error);
      Alert.alert("Erro", "Falha ao processar a imagem.");
    }
  };

  const handleClick = async () => {
    if (name === "") {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (date === "") {
      setDateErrorMessage("Preencha a data");
      setDateError(true);
    } else {
      setDateError(false);
    }

    if (dateError || nameError) {
      return;
    }

    const surveyData = {
      title: name,
      date,
      imagem: imageBase64, // Salvando a imagem como base64
      votes: {
        neutral: 0,
        poor: 0,
        bad: 0,
        good: 0,
        excellent: 0,
      },
    };

    try {
      const docRef = await addDoc(collection(db, "surveys"), surveyData);
      console.log("Pesquisa registrada com sucesso:", docRef.id);

      setSurveys((prevSurveys) => [
        ...prevSurveys,
        { id: docRef.id, ...surveyData },
      ]);

      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao registrar pesquisa:", error);
    }
  };

  useEffect(() => {
    if (name !== "") {
      setNameError(false);
    }
  }, [name]);

  useEffect(() => {
    if (date !== "") {
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

      if (dateRegex.test(date) === false) {
        setDateErrorMessage("Formato de data inválido (DD/MM/AAAA)");
        setDateError(true);
        return;
      }

      setDateError(false);
    }
  }, [date]);

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.inputContainer}>
          <CustomInput
            label="Nome"
            value={name}
            onChangeText={onChangeName}
            err={nameError}
            errorMessage="Preencha o nome da pesquisa"
          />
          <CustomInput
            label="Data"
            value={date}
            onChangeText={onChangeDate}
            err={dateError}
            showDatePicker={true}
            errorMessage={dateErrorMessage}
          />
          {/* Botão para selecionar a imagem */}
          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={selecionarImagem}
          >
            <Text style={styles.imagePickerText}>Selecionar Imagem</Text>
          </TouchableOpacity>

          {/* Mostrar a imagem selecionada */}
          {imageBase64 && (
            <Image
              source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
              style={styles.previewImage}
            />
          )}

          <TouchableOpacity style={styles.button} onPress={handleClick}>
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
    marginTop: 8,
  },
  text: {
    fontFamily: "AveriaLibre-Regular",
    color: "#fff",
    fontSize: 16,
    textTransform: "uppercase",
  },
  imagePickerButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    marginTop: 10,
    alignItems: "center",
  },
  imagePickerText: {
    color: "#fff",
    fontSize: 16,
  },
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    alignSelf: "center",
  },
});
