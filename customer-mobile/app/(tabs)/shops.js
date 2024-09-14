import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ShopCard from '../components/shopcard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


// const ShopCard = ({ shop }) => (
//     <TouchableOpacity style={styles.card}>
//         <Image
//             style={styles.image}
//             source={{ uri: shop.imageUrl }}
//         />
//         <View style={styles.cardContent}>
//             <Text style={styles.shopName}>{shop.name}</Text>
//             <Text style={styles.description}>{shop.description}</Text>
//         </View>
//     </TouchableOpacity>
// );

export default function ShopsScreen({ navigation }) {
    const [shopsData, setShopsData] = useState([]);

    //fetch shops from the server
    const getShops = async () => {
        //get access token from async storage
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

    useEffect (() => {
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
                keyExtractor={item => item.business_id}
                contentContainerStyle={{ paddingHorizontal: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingTop: 20,
    },
  
});
