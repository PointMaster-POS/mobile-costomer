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

const Tab = createBottomTabNavigator();


function Home() {
  const { isLogged } = React.useContext(UserContext);

  useEffect(() => {
    if (isLogged) {
      
      showMessage({
        message: "Login Successful",
        type: "success",
        color: "#fff",
        backgroundColor: "#5e48a6",
        icon: "info",
        duration: 3000,
      });
    }
   

    

  }, [isLogged]);


  return (
    <Tab.Navigator
      initialRouteName={"qrcode"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === "bills") {
            iconName = focused ? "credit-card-alt" : "credit-card-alt";
          } else if (rn === "profile") {
            iconName = focused ? "user" : "user";
          } else if (rn === "shops") {
            iconName = focused ? "shopping-bag" : "shopping-bag";
          } else if (rn === "qrcode") {
            iconName = focused ? "qrcode" : "qrcode";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#2E236C",
        inactiveTintColor: "#C8ACD6",
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70 },
      }}
    >
      <Tab.Screen name={"qrcode"} component={QRCodeView} />
      <Tab.Screen name={"bills"} component={BillScreen} />
      <Tab.Screen name={"profile"} component={ProfileScreen} />
      <Tab.Screen name={"shops"} component={ShopScreen} />
    </Tab.Navigator>
  );
}

export default Home;
