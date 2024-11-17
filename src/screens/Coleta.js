import { SafeAreaView, StyleSheet, Text, Image, View } from "react-native";
import React, { useState } from "react";

export default function Coleta() {
  const [name, onChangeName] = React.useState("");
  const [nameError, setNameError] = React.useState(false);

  const [date, onChangeDate] = React.useState("");
  const [dateError, setDateError] = React.useState(false);

  const [imageUri, setImageUri] = React.useState(null);
  const [message, setMessage] = useState(""); // Estado para controlar a mensagem
  const [showMessage, setShowMessage] = useState(false); // Estado para controlar a exibição da mensagem

  // Função chamada ao clicar em uma opção de voto
  const handleVote = (vote) => {
    setMessage(
      `Obrigada por participar da pesquisa! 
      
Aguardamos você no proximo ano!`
    );
    setShowMessage(true);

    // Depois de 3 segundos, esconder a mensagem
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.text}>O que você achou do carnaval 2024?</Text>

        {/* Exibe a mensagem quando showMessage for true */}
        {showMessage && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        )}

        <View style={styles.containerVotacao}>
          <View style={styles.votar} onTouchEnd={() => handleVote("Péssimo")}>
            <Image
              source={require("../assets/icons/pessimo.png")}
              style={styles.image}
            />
            <Text style={styles.textVotar}>Péssimo</Text>
          </View>

          <View style={styles.votar} onTouchEnd={() => handleVote("Ruim")}>
            <Image
              source={require("../assets/icons/ruim.png")}
              style={styles.image}
            />
            <Text style={styles.textVotar}>Ruim</Text>
          </View>

          <View style={styles.votar} onTouchEnd={() => handleVote("Neutro")}>
            <Image
              source={require("../assets/icons/neutro.png")}
              style={styles.image}
            />
            <Text style={styles.textVotar}>Neutro</Text>
          </View>

          <View style={styles.votar} onTouchEnd={() => handleVote("Bom")}>
            <Image
              source={require("../assets/icons/bom.png")}
              style={styles.image}
            />
            <Text style={styles.textVotar}>Bom</Text>
          </View>

          <View style={styles.votar} onTouchEnd={() => handleVote("Excelente")}>
            <Image
              source={require("../assets/icons/excelente.png")}
              style={styles.image}
            />
            <Text style={styles.textVotar}>Excelente</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#573FBA",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 40,
    textAlign: "center",
  },
  containerVotacao: {
    width: "80%",
    height: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  votar: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
  },
  textVotar: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  messageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#573FBA",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  messageText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 32,
  },
});
