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
  const [showBillDetails, setShowBillDetails] = useState(true);

  const getBillDetails = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log("Access Token:", accessToken);
    try {
      //get bill by bill id
      const response = await axios.get(
        `http://localhost:3004/bills/${selectedBill.bill_id}`,
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

//use effect to call get bill details function when nagivation is changed
  useEffect(() => {
    //call get bill details function
    getBillDetails();
    //re render when isModalVisible changes

    
  }, [isModalVisible]);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          { showBillDetails ? (
          <><Text style={styles.modalTitle}>Bill Details</Text><Text style={styles.modalText}>Bill ID: {billDetails.bill_id}</Text><Text style={styles.modalText}>
              Branch Name: {billDetails.branch_name}
            </Text><Text style={styles.modalText}>Time: {billDetails.date_time}</Text><Text style={styles.modalText}>
                Payement method: {billDetails.payment_method}
              </Text><Text style={styles.modalText}>
                Cashier Name: {billDetails.employee_name}
              </Text><Text style={styles.modalText}>
                Payed Amount: {billDetails.received}
              </Text><Text style={styles.modalText}>
                Total Amount: {billDetails.total_price}
              </Text><Text style={styles.modalText}>
                Status : {billDetails.status ? "completed" : "not completed"}
              </Text></>
          ) : (
            <><Text style={styles.modalTitle}>Bill Items</Text>
            {billDetails.items && billDetails.items.map((item, index) => (
              <Text key={index} style={styles.modalText}>
                {item.item_name} - {item.quantity} x {item.price}
              </Text>
            ))}</>

          )
          }
          <TouchableOpacity
            onPress={() => setShowBillDetails(!showBillDetails)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}> {showBillDetails ? "View Items" : "Bill Details"} Bill Details</Text>
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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //ease annimate when height changes
    



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
    backgroundColor: "#433D8B",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});
