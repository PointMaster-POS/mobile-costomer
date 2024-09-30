import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './app/(tabs)/login';
import RegisterScreen from './app/(tabs)/register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfile from './app/(tabs)/editprofile';
import Home from './app/(tabs)/home';
import ShopDetail from './app/(tabs)/shopdetail';
import AboutShop from './app/(tabs)/aboutshop';
import { showMessage } from "react-native-flash-message";
import { UserContextProvider } from './app/context/userContext';
import FlashMessage from "react-native-flash-message";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1E3E62', // Change this to any color you want
            },
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ShopDetail" component={ShopDetail} />
          <Stack.Screen name="AboutShop" component={AboutShop} />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
