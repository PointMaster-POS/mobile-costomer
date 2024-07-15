import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './app/(tabs)/login';
import RegisterScreen from './app/(tabs)/register';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfile from './app/(tabs)/editprofile';
import Home from './app/(tabs)/home';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
    
      <Stack.Navigator >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
      
    </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
