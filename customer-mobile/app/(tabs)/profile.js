import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/userContext";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView, RefreshControl } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { customerUrl } from "../../url";

export default function CustomerProfile({ navigation }) {
  const [customer, setCustomer] = useState({});
  const { setUser, isLogged } = useContext(UserContext);
  const [phone, setPhone] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State to control the refresh

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
    const url = customerUrl;
    try {
      const response = await axios.get(
        `${url}/customer/${phone}`,
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

  // Handle pull to refresh action
  const onRefresh = async () => {
    setRefreshing(true);
    await getCustomerDetails(); // Fetch updated data
    setRefreshing(false); // Stop refreshing after data is loaded
  };

  // Function to handle logout action
  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    navigation.navigate("Login");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.detailContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: customer.photo_url,
          }}
        />
        <Text style={styles.name}>{customer.customer_name}</Text>
        <Text style={styles.email}>{customer.customer_mail}</Text>
        <Text style={styles.dob}>Date of Birth: {customer.birthday && customer.birthday.split("T")[0]}</Text>
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
          <FontAwesome name="edit" size={20} color="#fff" />
          <Text style={styles.buttonText}> Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome name="sign-out" size={20} color="#fff" />
          <Text style={styles.buttonText}> Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
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
                  handleLogout();
                }}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "top",
    backgroundColor: "#0B192C",
    padding: 20,
  },
  detailContainer: {
    alignItems: "center",
    backgroundColor: "#1E3E62",
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
    color: "#fff",
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
    backgroundColor: "#FF6500",
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
    color: "#fff",
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
    backgroundColor: "#FF6500",
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
    color: "#fff",
    fontWeight: "bold",
  },
});
