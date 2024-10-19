import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import ShopDetail from "../(tabs)/shopdetail";

export default function ShopCard({ navigation, shop }) {
  //when click on shopcard make navigation to shopdetail view
  const goToShopDetail = (businessID) => {
    return () => {
      console.log(shop);
      navigation.navigate("ShopDetail", { businessID });
    };
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={goToShopDetail(shop.business_id)}
    >
      <Image style={styles.image} source={{ uri: shop.logo_url }} />
      <View style={styles.cardContent}>
        <Text style={styles.shopName}>{shop.business_name}</Text>
        <Text style={styles.description}>{shop.business_description}</Text>
      </View>
    </TouchableOpacity>
  );
}

//styles for shopcard
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E3E62",
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#FF6500",
    borderWidth: 1,
    borderColor: "#FF6500",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
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
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
});
