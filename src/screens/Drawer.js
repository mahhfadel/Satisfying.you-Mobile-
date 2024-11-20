import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Home from "./Home";

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  return (
    <SafeAreaView style={styles.drawerContent}>
      <View>
        <Text style={styles.userMail}>usuario@dominio.com</Text>
        <View style={styles.hr}></View>
        <View style={styles.iconContainer}>
          <Ionicons
            name="document-text-outline"
            size={24}
            color="#fff"
            style={{ marginLeft: 15 }}
          />
          <Text style={styles.iconText}>Pesquisas</Text>
        </View>
      </View>

      <View
        style={styles.iconContainer}
        onPress={() => navigation.navigate("Login")}
      >
        <Ionicons
          name="exit-outline"
          size={24}
          color="#fff"
          style={{ marginLeft: 15 }}
        />
        <Text style={styles.iconText}>Sair</Text>
      </View>
    </SafeAreaView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: { backgroundColor: "#2E2359" },
        headerStyle: { backgroundColor: "#2B1D62" },
        headerTintColor: "#fff",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons
                name="menu"
                size={24}
                color="#fff"
                style={{ marginLeft: 15 }}
              />
            </TouchableOpacity>
          ),
          headerTitle: "",
        })}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  userMail: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  hr: {
    height: 2,
    backgroundColor: "#fff",
    marginVertical: 10,
  },
  iconContainer: {
    maxWidth: "30%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  iconText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "AveriaLibre-Regular",
  },
});
