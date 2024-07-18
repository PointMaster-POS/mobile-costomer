import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QrCode from "../components/qrcode";

const QRCodeView = () => {
  //this user id should be retrieved from async storage
  const userId = "12390";
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My QR Code</Text>
      <View style={styles.qrCodeContainer}>
        <QrCode userId={userId} />
      </View>
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
