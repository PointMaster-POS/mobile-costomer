import React from 'react';
import {View, Text} from 'react-native';

export default function ShopsScreen ({navigation}) {
    return (
        <View style = {{flex: 1 ,alignItems: 'center', justifyContent: 'center'}} >
            <Text onPress={() => {
                alert('this is the home page');
                navigation.navigate('Home')
                }}  style ={{fontSize : 26, fontWeight: 'bold'}}>
                Shops Screen
            </Text>
        </View>
    );

}