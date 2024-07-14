import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//screens 
import BillScreen from './bills';
import ProfileScreen from './profile';
import ShopScreen from './shops';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5Pro';

const Tab = createBottomTabNavigator();

function Home () {
    return (
       
        <Tab.Navigator
          initialRouteName={'Profile'}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;
  
             if (rn === 'bills') {
                iconName = focused ? 'credit-card-alt' : 'credit-card-alt';
  
              }
              else if (rn === 'profile') {
                iconName = focused ? 'user' : 'user';
  
              } else if (rn === 'shops') {
                iconName = focused ? 'shopping-bag' : 'shopping-bag';
              }
  
             
              return <FontAwesome name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#2E236C',
            inactiveTintColor: '#C8ACD6',
            labelStyle: { paddingBottom: 10, fontSize: 10 },
            style: { padding: 10, height: 70}
          }}>
  
         
          <Tab.Screen name={'bills'} component={BillScreen} />
          <Tab.Screen name={'profile'} component={ProfileScreen} />
          <Tab.Screen name={'shops'} component={ShopScreen} />
        </Tab.Navigator>
     
    );
}


export default Home;
