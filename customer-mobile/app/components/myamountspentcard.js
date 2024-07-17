import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

//dummy items component
const itemsData = [
  {
    id: '1',
    name: 'Item 1',
    imageUrl: 'https://purepng.com/public/uploads/thumbnail//woman-dress-mdp.png',
    priceInPoints: 100,
  },
  {
    id: '2',
    name: 'Item 2',
    imageUrl: 'https://static.vecteezy.com/system/resources/previews/015/211/536/non_2x/blue-kids-dress-baby-girl-with-cut-out-isolated-on-background-transparent-png.png',
    priceInPoints: 200,
  },
  {
    id: '3',
    name: 'Item 3',
    imageUrl: 'https://pngimg.com/d/dress_PNG7.png',
    priceInPoints: 150,
  },
  {
    id: '4',
    name: 'Item 3',
    imageUrl: 'https://www.kindpng.com/picc/m/249-2492558_baby-party-frocks-png-pics-party-wear-baby.png',
    priceInPoints: 150,
  },
];

const MyAmountSpentCard = ({ name, pointRate, minimumPoints, pointsToRedeem }) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image style={styles.itemImage} source={{ uri: item.imageUrl }} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.priceInPoints} points</Text>
    </View>
  );

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.shopName}>{name}</Text>
      <Text style={styles.pointRate}>Point Rate: {pointRate}</Text>
      <Text style={styles.minimumPoints}>Minimum Points: {minimumPoints}</Text>
      <Text style={styles.pointsToRedeem}>Points to Redeem: {pointsToRedeem}</Text>
      <FlatList
        data={itemsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.itemsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  shopName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E236C',
  },
  pointRate: {
    fontSize: 16,
    marginBottom: 5,
    color: '#433D8B',
  },
  minimumPoints: {
    fontSize: 16,
    marginBottom: 5,
    color: '#433D8B',
  },
  pointsToRedeem: {
    fontSize: 16,
    marginBottom: 15,
    color: '#433D8B',
  },
  itemsList: {
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    
    height: 150,
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: 15,
   
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E236C',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
});

export default MyAmountSpentCard;
