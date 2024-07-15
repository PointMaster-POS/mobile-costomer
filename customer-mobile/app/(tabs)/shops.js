import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ShopCard from '../components/shopcard'
const shopsData = [
    {
        id: '1',
        name: 'Shop A',
        description: 'This is shop A description.',
        imageUrl: 'https://png.pngtree.com/template/20200404/ourmid/pngtree-women-s-clothing-logo-design-image_361512.jpg',
    },
    {
        id: '2',
        name: 'Shop B',
        description: 'This is shop B description.',
        imageUrl: 'https://png.pngtree.com/png-clipart/20200727/original/pngtree-women-s-clothing-logo-design-png-image_5343728.jpg',
    },
    {
        id: '3',
        name: 'Shop C',
        description: 'This is shop C description.',
        imageUrl: 'https://static.vecteezy.com/system/resources/previews/024/052/508/original/illustration-of-a-minimalist-logo-design-can-be-used-for-women-s-clothing-products-symbols-signs-online-shop-logos-special-clothing-logos-boutique-vector.jpg',
    },
    
];

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
    const renderItem = ({ item }) => (
        <ShopCard shop={item} navigation={navigation} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={shopsData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
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
