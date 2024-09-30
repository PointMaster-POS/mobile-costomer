
import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ShopCard from '../components/shopcard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function ShopsScreen({ navigation }) {
    const [shopsData, setShopsData] = useState([]);

    // Fetch shops from the server
    const getShops = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        try {
            const response = await axios.get('http://localhost:3004/shop', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            setShopsData(response.data);
            console.log('Shops:', response.data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    useEffect(() => {
        getShops();
    }, []);

    const renderItem = ({ item }) => (
        <ShopCard shop={item} navigation={navigation} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={shopsData}
                renderItem={renderItem}
                keyExtractor={item => item.business_id.toString()} // Ensure the key is a string
                contentContainerStyle={{ paddingHorizontal: 20 }}
            />
        </View>
    );
}

// styles for shop screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fefefe",
        paddingTop: 20,
    },
});
