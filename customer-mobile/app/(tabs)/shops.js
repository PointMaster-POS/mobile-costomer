import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import ShopCard from "../components/shopcard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { customerUrl } from "../../url";

export default function ShopsScreen({ navigation }) {
  // States to store shop data and refreshing status
  const [shopsData, setShopsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  //----------------- Fetch Shop Data -----------------
  // Fetch shops from the server
  const getShops = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const url = customerUrl;
    try {
      const response = await axios.get(`${url}/shop`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setShopsData(response.data);
      console.log("Shops:", response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Fetch shop data when the component is mounted
  useEffect(() => {
    getShops();
  }, []);

  // Handle pull-to-refresh action
  const handleRefresh = async () => {
    // --- Set refreshing to true when pull-to-refresh is triggered ---
    setRefreshing(true); // Start refreshing
    await getShops(); // Fetch the latest data
    setRefreshing(false); // Stop refreshing
  };

  // ----------------- Render Shop Card -----------------
  const renderItem = ({ item }) => (
    <ShopCard shop={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={shopsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.business_id.toString()} // Ensure the key is a string
        contentContainerStyle={{ paddingHorizontal: 20 }}
        refreshControl={
          // Adding RefreshControl for pull-to-refresh functionality
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        } 
      />
    </View>
  );
}

// Styles for shop screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B192C",
    paddingTop: 20,
  },
});
