import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import ShopDetail from '../(tabs)/shopdetail'

export default function ShopCard({navigation, shop}) {

  //when click on shopcard make navigation to shopdetail view
  const goToShopDetail = () => {
    navigation.navigate("ShopDetail");
  };

  return (
    <TouchableOpacity style={styles.card} onPress={goToShopDetail}>
      <Image style={styles.image} source={{ uri: shop.imageUrl }} />
      <View style={styles.cardContent}>
        <Text style={styles.shopName}>{shop.name}</Text>
        <Text style={styles.description}>{shop.description}</Text>
      </View>
    </TouchableOpacity>
  );
}


//styles for shopcard
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 20,
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cardContent: {
    marginLeft: 10,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
});
