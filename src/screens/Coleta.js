import { SafeAreaView, StyleSheet, Text, Image, View } from "react-native";
import React, { useState, useContext } from "react";
import { SurveyContext } from "../context/SurveyContext";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore"; 

export default function Coleta({ route }) {
  const [showMessage, setShowMessage] = useState(false);
  const { surveys, setSurveys } = useContext(SurveyContext); 

  
  const { id } = route.params || {};

  const handleVote = async (vote) => {
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    const surveyDocRef = doc(db, "surveys", id);
    const surveyDoc = await getDoc(surveyDocRef);

    if (!surveyDoc.exists()) {
      console.log("Documento não encontrado!");
      return; 
    }

    try {
      await updateDoc(surveyDocRef, {
        [`votes.${vote}`]: increment(1),
      });

      setSurveys((prevSurveys) =>
        prevSurveys.map((survey) =>
          survey.id === id
            ? {
                ...survey,
                votes: {
                  ...survey.votes,
                  [vote]: survey.votes[vote] + 1, 
                },
              }
            : survey
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar o voto:", error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.text}>What did you think of Carnival 2024?</Text>

        {showMessage && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              Thank you for participating in the survey!{"\n"}
              {"\n"}
              See you next year!
            </Text>
          </View>
        )}

        <View style={styles.containerVotacao}>
          <View style={styles.votar} onTouchEnd={() => handleVote("poor")}>
            <Image
              source={require("../assets/icons/pessimo.png")}
              style={styles.image}
            />
            <Text style={styles.textVotar}>Poor</Text>
          </View>

          <View style={styles.votar} onTouchEnd={() => handleVote("bad")}>
            <Image
              source={require("../assets/icons/ruim.png")}
              style={styles.image}
            />
            <Text style={styles.textVotar}>Bad</Text>
          </View>

          <View style={styles.votar} onTouchEnd={() => handleVote("neutral")}>
            <Image
              source={require("../assets/icons/neutro.png")}
              style={styles.image}
            />
            <Text style={styles.textVotar}>Neutral</Text>
          </View>

          <View style={styles.votar} onTouchEnd={() => handleVote("good")}>
            <Image
              source={require("../assets/icons/bom.png")}
              style={styles.image}
            />
            <Text style={styles.textVotar}>Good</Text>
          </View>

          <View style={styles.votar} onTouchEnd={() => handleVote("excellent")}>
            <Image
              source={require("../assets/icons/excelente.png")}
              style={styles.image}
            />
            <Text style={styles.textVotar}>Excellent</Text>
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
