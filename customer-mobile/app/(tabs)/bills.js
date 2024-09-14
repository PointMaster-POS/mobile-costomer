import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Modal,
} from "react-native";
import BillModel from "../components/billmodal";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const billDetails = [
//   { id: '1', businessName: 'Store A', time: '10:00 AM', totalAmount: '$50.00' },
//   { id: '2', businessName: 'Store B', time: '11:30 AM', totalAmount: '$75.00' },
//   { id: '3', businessName: 'Store C', time: '1:45 PM', totalAmount: '$30.00' },

// ];

export default function BillScreen({ navigation }) {
  const [billDetails, setBillDetails] = useState(billDetails);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const getBillDetails = async () => {
    //get accessToken from async storage
    const accessToken = await AsyncStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        "http://localhost:3004/bills",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Response:", response.data);
      setBillDetails(response.data);
    }
    catch (error) {
      console.error("Error:", error.message);
    }
     
  };
  useEffect(() => {
    getBillDetails();
  }, []);

  const handleRowPress = (item) => {
    setSelectedBill(item);
    setModalVisible(true);
  };
  return (
    <View style={styles.container}>
      {/* <Text
        onPress={() => {
          alert('this is the home page');
        }}
        style={styles.headerText}
      >
        Shops Screen
      </Text> */}
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Bill ID</Text>
          <Text style={styles.tableHeaderText}>Business Name</Text>
          <Text style={styles.tableHeaderText}>Time</Text>
          <Text style={styles.tableHeaderText}>Total Amount</Text>
        </View>
        <FlatList
          data={billDetails}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleRowPress(item)}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.bill_id}</Text>
                <Text style={styles.tableCell}>{item.business_id}</Text>
                <Text style={styles.tableCell}>{item.date_time}</Text>
                <Text style={styles.tableCell}>{item.total_price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {selectedBill && (
        <BillModel
          selectedBill={selectedBill}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "top",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tableContainer: {
    width: "90%",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    textAlign: "center",
  },
});
