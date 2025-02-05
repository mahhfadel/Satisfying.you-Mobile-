import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import CustomInput from "../components/CustomInput";
import Modal from "react-native-modal";
import { SurveyContext } from "../context/SurveyContext";

import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";

export default function EditSurvey({ route, navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const { surveys, setSurveys } = useContext(SurveyContext);

  const toggleModal = () => setModalVisible(!isModalVisible);

  const { id, pTitle, pDate, pUri } = route.params || {};

  const [name, onChangeName] = useState(pTitle);
  const [nameError, setNameError] = useState(false);

  const [date, onChangeDate] = useState(pDate);
  const [dateError, setDateError] = useState(false);
  const [dateErrorMessage, setDateErrorMessage] = useState(false);

  const [imageBase64, setImageBase64] = useState(pUri);

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

  const handleSave = async () => {
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

    if (nameError || dateError) {
      return;
    }

    try {
      const surveyDocRef = doc(db, "surveys", id);

      await updateDoc(surveyDocRef, {
        title: name,
        date,
        imagem: imageBase64, // Atualiza a imagem no Firebase
      });

      setSurveys((prevSurveys) =>
        prevSurveys.map((survey) =>
          survey.id === id
            ? { ...survey, title: name, date, imagem: imageBase64 }
            : survey
        )
      );

      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar a pesquisa:", error);
    }
  };

  const deleteSurvey = async () => {
    try {
      const surveyDocRef = doc(db, "surveys", id);
      await deleteDoc(surveyDocRef);

      setSurveys((prevSurveys) =>
        prevSurveys.filter((survey) => survey.id !== id)
      );

      navigation.goBack();
    } catch (error) {
      console.error("Erro ao excluir a pesquisa:", error);
    }
  };

  useEffect(() => {
    if (name !== "") setNameError(false);
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
    <View style={styles.container}>
      <ScrollView>
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
              errorMessage="Preencha a data"
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

            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.text}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.message}>
            Tem certeza de apagar essa pesquisa?
          </Text>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.removeButton]}
                onPress={() => {
                  toggleModal();
                  deleteSurvey();
                }}
              >
                <Text style={styles.modalButtonText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.actionButton]}
                onPress={toggleModal}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#573FBA",
    flex: 1,
  },
  inputContainer: {
    width: "60%",
    paddingVertical: 8,
    margin: "auto",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#37BD6D",
    padding: 8,
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    color: "#fff",
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
