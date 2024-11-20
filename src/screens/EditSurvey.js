import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";

import CustomInput from "../components/CustomInput";
import ImagePickerInput from "../components/ImagePickerInput";

import Modal from "react-native-modal";
import { SurveyContext } from "../context/SurveyContext";

export default function NewSurvey({ route, navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const { surveys, setSurveys } = useContext(SurveyContext);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const { id, pTitle, pDate, pUri } = route.params || {};

  const [name, onChangeName] = React.useState(pTitle);
  const [nameError, setNameError] = React.useState(false);

  const [date, onChangeDate] = React.useState(pDate);
  const [dateError, setDateError] = React.useState(false);
  const [dateErrorMessage, setDateErrorMessage] = React.useState(false);

  const [imageUri, setImageUri] = React.useState(pUri);

  const handleSave = () => {
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
  
    setSurveys((prevSurveys) => 
      prevSurveys.map((survey) =>
        survey.id === id ? { ...survey, title: name, date, uri: imageUri } : survey
      )
    );
  
    navigation.goBack();
  };

  const deleteSurvey = () => {
    setSurveys((prevSurveys) => 
      prevSurveys.filter(s => s.id !== id)
    );
  
    navigation.goBack();
  }
  

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

  useEffect(() => {
    if (name !== "") {
      setNameError(false);
    }
  }, [name]);

  useEffect(() => {
    if (date !== "") {
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
            <ImagePickerInput
              label="Imagem"
              image={imageUri}
              setImage={setImageUri}
            />
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
                onPress={() => { toggleModal(); deleteSurvey(); }}
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
      <TouchableOpacity style={styles.deleteButton} onPress={toggleModal}>
        <AntDesign name="delete" size={24} color="white" />
        <Text style={styles.textButton}>Apagar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#573FBA",
    flex: 1,
    position: "relative",
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
    fontFamily: "AveriaLibre-Regular",
    color: "#fff",
    fontSize: 16,
    textTransform: "uppercase",
  },
  deleteButton: {
    position: "absolute",
    right: "2.5%",
    bottom: "2%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
  textButton: {
    fontFamily: "AveriaLibre-Regular",
    color: "#fff",
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: "#2B1F5C",
    padding: 20,
    borderRadius: 10,
    maxHeight: "80%",
    maxWidth: "40%",
    margin: "auto",
  },
  message: {
    fontSize: 16,
    fontFamily: "AveriaLibre-Regular",
    marginBottom: 10,
    color: "#fff",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 16,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    height: 32,
  },
  modalButton: {
    backgroundColor: "#fff",
    padding: 8,
    height: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  modalButtonText: {
    fontFamily: "AveriaLibre-Regular",
    color: "#fff",
    textTransform: "uppercase",
  },
  actionButton: { backgroundColor: "#3F92C5" },
  removeButton: { backgroundColor: "#FF8383" },
  buttonRow: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
