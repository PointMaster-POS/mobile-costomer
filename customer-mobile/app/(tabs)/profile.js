import React from 'react';
import {View, Text} from 'react-native';

export default function ProfileScreen ({navigation}) {
    return (
        <View style = {{flex: 1 ,alignItems: 'center', justifyContent: 'center'}} >
            <Text onPress={() => {
                alert('this is the home page');
                navigation.navigate('Profile');
                }}  style ={{fontSize : 26, fontWeight: 'bold'}}>
                Profile Screen
            </Text>
        </View>
    );
}