import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import QrCode from "../components/qrcode";
import AsyncStorage from '@react-native-async-storage/async-storage';

const QRCodeView = () => {
  const [accessToken, setAccessToken] = useState(null);
  const userId = "12390"; // this user id should be retrieved from async storage

  // Function to get token from AsyncStorage
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      setAccessToken(token);
      console.log(token); // Log the token to the console
    } catch (error) {
      console.error("Failed to fetch token from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My QR Code</Text>
      <View style={styles.qrCodeContainer}>
        <QrCode userId={userId} />
      </View>
    </View>
  );
};

// Styles for QR code view
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
