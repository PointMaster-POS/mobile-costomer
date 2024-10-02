import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/userContext";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function CustomerProfile({ navigation }) {
  const [customer, setCustomer] = useState({});
  const { setUser, isLogged } = useContext(UserContext);
  const [phone, setPhone] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

  const getCustomerDetails = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");

    const getPhone = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (!accessToken) return;

        const decodeJWT = (token) => {
          try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split("")
                .map(
                  (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                )
                .join("")
            );
            return JSON.parse(jsonPayload);
          } catch (error) {
            console.error("Invalid JWT token", error);
            return null;
          }
        };

        const decodedToken = decodeJWT(accessToken);
        if (decodedToken && decodedToken.customer) {
          setPhone(decodedToken.customer.customer_phone);
        }
      } catch (error) {
        console.error("Error fetching phone number:", error);
      }
    };

    getPhone();
    console.log("Phone:", phone);
    try {
      const response = await axios.get(
        `http://localhost:3004/customer/${phone}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setCustomer(response.data);
      console.log("Customer:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    if (isLogged) {
      getCustomerDetails();
    }
  }, [isLogged, phone]);

  // Function to handle logout action
  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <Image
          style={styles.profileImage}
          source={{
            //add image in assets forler
            uri: customer.photo_url,
          }}
        />
        <Text style={styles.name}>{customer.customer_name}</Text>
        <Text style={styles.email}>{customer.customer_mail}</Text>
        <Text style={styles.dob}>Date of Birth: {customer.birthday}</Text>
        <Text style={styles.dob}>Phone Number: {customer.customer_phone}</Text>
        <Text style={styles.dob}>Gender: {customer.gender}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("EditProfile", {
              name: customer.customer_name,
              email: customer.customer_mail,
              phone: customer.customer_phone,
              dob: customer.birthday,
              profileImage: customer.photo_url,
              gender: customer.gender,
            });
          }}
        >
          <FontAwesome name="edit" size={20} color="#C8ACD6" />
          <Text style={styles.buttonText}> Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)} // Show modal when logout button is clicked
        >
          <FontAwesome name="sign-out" size={20} color="#C8ACD6" />
          <Text style={styles.buttonText}> Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back button press
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  handleLogout(); // Perform logout
                }}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)} // Close modal if No is selected
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "top",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  detailContainer: {
    alignItems: "center",
    backgroundColor: "#f7f9fc",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    padding: 20,
    borderRadius: 10,
    width: "100%",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: "#6c757d",
    marginBottom: 10,
  },
  dob: {
    fontSize: 18,
    color: "#6c757d",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#2E236C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    width: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    color: "#C8ACD6",
    fontWeight: "bold",
  },
  logoutContainer: {
    flexDirection: "row",
    justifyContent: "bottom",
    alignItems: "bottom",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  modalButton: {
    backgroundColor: "#2E236C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    margin: 5,
  },
  modalButtonText: {
    fontSize: 18,
    color: "#C8ACD6",
    fontWeight: "bold",
  },
});
