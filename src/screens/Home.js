import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import Card from "../components/Card";

import { vw, vh } from "react-native-expo-viewport-units";
import { SurveyContext } from "../context/SurveyContext";

const Home = ({ navigation }) => {
  const [filter, setFilter] = useState("");

  const { surveys, setSurveys } = useContext(SurveyContext);

  const [filteredSurveys, setFilteredSurveys] = useState(surveys);

  useEffect(() => {
    if (filter === "") {
      setFilteredSurveys(surveys);
      return;
    }

    setFilteredSurveys(
      surveys.filter((s) =>
        s.title.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, surveys]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <AntDesign name="search1" size={24} color="#8c8c8c" />
        </View>
        <TextInput
          placeholder="Insira o termo de busca..."
          placeholderTextColor="#8c8c8c"
          style={styles.textInput}
          value={filter}
          onChangeText={(e) => setFilter(e)}
        />
      </View>
      <View style={styles.carrousselContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carrousselContent}
        >
          {surveys && filteredSurveys.map((s) => <Card {...s} key={s.id} />)}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("NewSurvey")}
      >
        <Text style={styles.text}>Nova pesquisa</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#372775",
    height: "100%",
    paddingBottom: 8,
  },
  carrousselContainer: {
    overflow: "hidden",
    width: vw(96),
    height: vh(50),
    margin: "auto",
  },
  carrousselContent: {
    flexDirection: "row",
    gap: 8,
  },
  inputContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: vw(96),
    margin: "auto",
  },
  iconContainer: {
    paddingHorizontal: "1%",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "AveriaLibre-Regular",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#37BD6D",
    padding: 8,
    margin: "auto",
    marginTop: 8,
    width: vw(96),
  },
  text: {
    fontFamily: "AveriaLibre-Regular",
    color: "#fff",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
