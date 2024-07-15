import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import ShopBillsModal from "../components/shopbillsmodal";

const shopData = {
  id: "1",
  name: "Shop A",
  description: "This is shop A description.",
  imageUrl: "https://via.placeholder.com/150",
};

const billsData = [
  {
    id: "1",
    date: "2024-07-16",
    time: "10:30 AM",
    totalAmount: "$50.00",
  },
  {
    id: "2",
    date: "2024-07-15",
    time: "12:45 PM",
    totalAmount: "$30.00",
  },
  {
    id: "3",
    date: "2024-07-14",
    time: "11:00 AM",
    totalAmount: "$75.00",
  },
];

const ShopDetail = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const renderBillItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedBill(item);
        setModalVisible(true);
      }}
    >
      <View style={styles.billItem}>
        <Text style={styles.billText}>{item.id}</Text>
        <Text style={styles.billText}>{item.date}</Text>
        <Text style={styles.billText}>{item.time}</Text>
        <Text style={styles.billText}>{item.totalAmount}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.shopCard}>
        <Image style={styles.shopImage} source={{ uri: shopData.imageUrl }} />
        <View style={styles.shopCardContent}>
          <Text style={styles.shopName}>{shopData.name}</Text>
          <Text style={styles.shopDescription}>{shopData.description}</Text>
        </View>
      </View>

      <View style={styles.loyalityContainer}></View>
      <View style={styles.billsContainer}>
        <Text style={styles.billsTitle}>Bills for {shopData.name}</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Bill ID</Text>
          <Text style={styles.tableHeaderText}>Business Name</Text>
          <Text style={styles.tableHeaderText}>Time</Text>
          <Text style={styles.tableHeaderText}>Total Amount</Text>
        </View>
        <FlatList
          data={billsData}
          renderItem={renderBillItem}
          keyExtractor={(item) => item.id}
          style={styles.billsList}
        />
      </View>
      {selectedBill && (
        <ShopBillsModal
          selectedBill={selectedBill}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loyalityContainer: {
    marginTop: 20,
    height: 200,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  shopCard: {
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
  shopImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  shopCardContent: {
    marginLeft: 10,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  shopDescription: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  billsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
  },
  billsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 10
  },
  
  billItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  billText: {
    fontSize: 16,
  },
});

export default ShopDetail;
