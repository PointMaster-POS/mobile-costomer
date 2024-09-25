import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import QrCode from "../components/qrcode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { UserContext } from "../context/userContext";

const QRCodeView = () => {
  //this user id should be retrieved from async storage
  const { isLogged } = useContext(UserContext);

  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true); // New state to manage loading

  //get token from async storage and call to the endpoint to get phone number
  const getPhone = async () => {
    try {
      // Get token from async storage
      const accessToken = await AsyncStorage.getItem("accessToken");
      console.log("Access Token:", accessToken);

      // Ensure token exists
      if (!accessToken) {
        console.log("No access token found.");
        return;
      }

      // Function to decode the JWT payload
      const decodeJWT = (token) => {
        try {
          const base64Url = token.split(".")[1]; // Extract the payload part
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );

          return JSON.parse(jsonPayload); // Parse the decoded payload as JSON
        } catch (error) {
          console.error("Invalid JWT token", error);
          return null;
        }
      };

      // Decode the JWT
      const decodedToken = decodeJWT(accessToken);
      console.log("Decoded JWT Payload:", decodedToken);

      // Log the customer parameter if it exists
      if (decodedToken && decodedToken.customer) {
        setPhone(decodedToken.customer.customer_phone);
        console.log("Customer phone:", decodedToken.customer.customer_phone);
      } else {
        console.log("Customer parameter not found in the token.");
      }
    } catch (error) {
      console.error("Error fetching phone number:", error);
    } finally {
      setLoading(false); // Set loading to false after operation
    }
  };

  // Get user id from async storage
  useEffect(() => {
    if (isLogged) {
      setLoading(true); // Set loading when fetching phone number
      getPhone();
    }
  }, [isLogged]); // Depend on isLogged to ensure the user is logged in

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading QR code...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My QR Code</Text>
      <View style={styles.qrCodeContainer}>
        <QrCode userId={phone} />
      </View>
      {phone && <Text style={styles.userIdText}>Phone: {phone}</Text>}
    </View>
  );
};

//styles for qr code view
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#433D8B",
  },
  qrCodeContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  userIdText: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
  },
});

export default QRCodeView;
