import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function BillModel({
  selectedBill,
  isModalVisible,
  setModalVisible,
}) {
  // console.log(selectedBill.bill_id);

  //state to hold bill details
  const [billDetails, setBillDetails] = useState({});

  const getBillDetails = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log("Access Token:", accessToken);
    try {
      //get bill by bill id
      const response = await axios.get(
        "http://localhost:3004/bills/" + selectedBill.bill_id,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Response at :", response.data);
      setBillDetails(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    //call get bill details function
    getBillDetails();
  }, []);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Bill Details</Text>
          <Text style={styles.modalText}>Bill ID: {billDetails.bill_id}</Text>
          <Text style={styles.modalText}>
            Business Name: {billDetails.branch_id}
          </Text>
          <Text style={styles.modalText}>Time: {billDetails.date_time}</Text>
          <Text style={styles.modalText}>
            Payement method: {billDetails.payment_method}
          </Text>
          <Text style={styles.modalText}>
            Payed Amount: {billDetails.received}
          </Text>
          <Text style={styles.modalText}>
            Total Amount: {billDetails.total_price}
          </Text>
          <Text style={styles.modalText}>
            Status : {billDetails.status ? "completed" : "not completed"}
          </Text>
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
    color: "#2E236C",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#433D8B",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});
