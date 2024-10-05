import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  RefreshControl,
} from "react-native";
import BillModel from "../components/billmodal";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment"; // For formatting date

export default function BillScreen({ navigation }) {
  const [billDetails, setBillDetails] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // Added refreshing state

  // Fetch Bill Details from API
  const getBillDetails = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    try {
      const response = await axios.get("http://209.97.173.123:3004/bills", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setBillDetails(response.data);
    } catch (error) {
      console.error("Error fetching bills:", error.message);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true); // Set refreshing to true when pull-to-refresh is triggered
    await getBillDetails(); // Fetch new data
    setRefreshing(false); // Set refreshing to false when data is fetched
  };

  useEffect(() => {
    getBillDetails();
  }, []);

  const handleRowPress = (item) => {
    setSelectedBill(item);
    setModalVisible(true);
  };

  const formatCurrency = (amount) => `$${parseFloat(amount).toFixed(2)}`;

  const formatDate = (dateTime) => {
    return moment(dateTime).format("MMM DD, YYYY, h:mm A");
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Bill ID</Text>
          <Text style={styles.tableHeaderText}>Business Name</Text>
          <Text style={styles.tableHeaderText}>Date & Time</Text>
          <Text style={styles.tableHeaderText}>Total Amount</Text>
        </View>
        <FlatList
          data={billDetails}
          keyExtractor={(item) => item.bill_id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleRowPress(item)}>
              <View
                style={[
                  styles.tableRow,
                  index % 2 === 0 ? styles.evenRow : styles.oddRow,
                ]}
              >
                <Text style={styles.tableCell}>{item.bill_id}</Text>
                <Text style={styles.tableCell}>{item.business_name}</Text>
                <Text style={styles.tableCell}>{formatDate(item.date_time)}</Text>
                <Text style={styles.tableCell}>{formatCurrency(item.total_price)}</Text>
              </View>
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing} // Pass the refreshing state
              onRefresh={handleRefresh} // Trigger handleRefresh when pulled
              colors={["#FF6500"]} // Customize the refresh control color
            />
          }
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
    backgroundColor: "#0B192C",
    alignItems: "center",
    justifyContent: "top",
  },
  tableContainer: {
    width: "95%",
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "#1E3E62",
    margin: 10,
    height: "95%",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    backgroundColor: "#FF6500",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "#FF6500",
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
  },
  evenRow: {
    backgroundColor: "#1E3E62",
  },
  oddRow: {
    backgroundColor: "#2a5789",
  },
});
