import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { customerUrl } from "../../url";

export default function BillModel({
  selectedBill,
  isModalVisible,
  setModalVisible,
}) {
  // State to hold bill details
  const [billDetails, setBillDetails] = useState({});
  const [showBillDetails, setShowBillDetails] = useState(true);

  // Fetch Bill Details
  const getBillDetails = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log("Access Token:", accessToken);
    const url = customerUrl;

    try {
      // Get bill by bill id
      const response = await axios.get(`${url}/bills/${selectedBill.bill_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Response at :", response.data.items);
      setBillDetails(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Use effect to call get bill details function when navigation is changed
  useEffect(() => {
    // Call get bill details function
    getBillDetails();
  }, [isModalVisible]); // Re-render when isModalVisible changes

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {showBillDetails ? (
            <>
              <Text style={styles.modalTitle}>Bill Details</Text>
              <Text style={styles.modalText}>Bill ID: {billDetails.bill_id}</Text>
              <Text style={styles.modalText}>Branch Name: {billDetails.branch_name}</Text>
              <Text style={styles.modalText}>Time: {billDetails.date_time}</Text>
              <Text style={styles.modalText}>Payment method: {billDetails.payment_method}</Text>
              <Text style={styles.modalText}>Cashier Name: {billDetails.employee_name}</Text>
              <Text style={styles.modalText}>Paid Amount: {billDetails.received}</Text>
              <Text style={styles.modalText}>Total Amount: {billDetails.total_price}</Text>
              <Text style={styles.modalText}>Status: {billDetails.status ? "completed" : "not completed"}</Text>
            </>
          ) : (
            <>
              <Text style={styles.modalTitle}>Bill Items</Text>
              {billDetails.items &&
                billDetails.items.map((item, index) => (
                  <View key={index} style={styles.itemContainer}>
                    {item.image && (
                      <Image source={{ uri: item.image }} style={styles.itemImage} />
                    )}
                    <Text style={styles.modalText}>
                      {item.item_name} x  {item.quantity} 
                    </Text>
                  </View>
                ))}
            </>
          )}
          <TouchableOpacity
            onPress={() => setShowBillDetails(!showBillDetails)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>
              {showBillDetails ? "View Items" : "Bill Details"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// Styles
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FF6500",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemImage: {
    width: 50, // Adjust the width according to your needs
    height: 50, // Adjust the height according to your needs
    marginRight: 10, // Space between the image and text
    borderRadius: 5, // Optional: To give rounded corners to the image
  },
});
