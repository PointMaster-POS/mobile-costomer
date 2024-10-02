import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { UserContext } from "../context/userContext";
import { showMessage } from "react-native-flash-message";
//screens
import BillScreen from "./bills";
import ProfileScreen from "./profile";
import ShopScreen from "./shops";
import QRCodeView from "./qrcodeview";
import AsyncStorage from "@react-native-async-storage/async-storage";

//create tab navigator
const Tab = createBottomTabNavigator();

function Home() {
  const { isLogged } = React.useContext(UserContext);

  useEffect(() => {
    if (isLogged) {
      showMessage({
        message: "Login Successful",
        type: "success",
        color: "#fff",
        backgroundColor: "#FF6500",
        icon: "info",
        duration: 3000,
      });
    }
  }, [isLogged]);

  return (
    <Tab.Navigator
      initialRouteName={"My QR Code"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          // Change icon based on route name
          if (rn === "MY BILLS") {
            iconName = focused ? "credit-card-alt" : "credit-card-alt";
          } else if (rn === "PROFILE") {
            iconName = focused ? "user" : "user";
          } else if (rn === "MY SHOPS") {
            iconName = focused ? "shopping-bag" : "shopping-bag";
          } else if (rn === "MY QR CODE") {
            iconName = focused ? "qrcode" : "qrcode";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        headerStyle: {
          backgroundColor: "#1E3E62",
        },
        headerTintColor: "#fff", // Set the header text and icon color
        headerTitleStyle: {
          borderBottomColor: "#FF6500",
          borderBottomWidth: 2,
          fontWeight: "bold",
        },

        tabBarStyle: {
          backgroundColor: "#1E3E62",
          borderTopColor: "#FF6500",

          borderTopWidth: 2,
          height: 100,
          paddingTop: 10,
        },
      })}
      tabBarOptions={{
        activeTintColor: "#FF6500",
        inactiveTintColor: "gray",
        labelStyle: { fontSize: 20 }, // Adjust font size if needed
        tabBarStyle: { height: 100 }, // Set the tab bar height to 80 (or any value)
        labelStyle: { paddingBottom: 10, fontSize: 10, paddingTop: 10 },
      }}
    >
      <Tab.Screen name={"MY QR CODE"} component={QRCodeView} />
      <Tab.Screen name={"MY BILLS"} component={BillScreen} />
      <Tab.Screen name={"MY SHOPS"} component={ShopScreen} />
      <Tab.Screen name={"PROFILE"} component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default Home;
