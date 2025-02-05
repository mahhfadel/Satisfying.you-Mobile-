import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Home from "./Home";
import { signOut } from 'firebase/auth';
import { auth_mod } from '../firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native'; 
import { useAuth } from '../context/AuthContext';

const Drawer = createDrawerNavigator();

function CustomDrawerContent() {
  const navigation = useNavigation();
  const { user, logout } = useAuth(); 
  
  const handleLogout = async () => {
    try {
      await signOut(auth_mod); 
      logout(); 
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  return (
    <SafeAreaView style={styles.drawerContent}>
      <View>
        {/* Exibindo e-mail do usuário */}
        <Text style={styles.userMail}>{user ? user.email : "Usuário não logado"}</Text>
        <View style={styles.hr}></View>
        
        <TouchableOpacity 
          style={styles.iconContainer}
          onPress={() => navigation.navigate('Home')}>
          <Ionicons
            name="document-text-outline"
            size={24}
            color="#fff"
            style={{ marginLeft: 15 }}
          />
          <Text style={styles.iconText}>Pesquisas</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de Logout */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={handleLogout}
      >
        <Ionicons
          name="exit-outline"
          size={24}
          color="#fff"
          style={{ marginLeft: 15 }}
        />
        <Text style={styles.iconText}>Sair</Text>
      </TouchableOpacity>
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
        name="Inicial"
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