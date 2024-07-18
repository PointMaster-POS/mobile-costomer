const QRCode = require("react-native-qrcode-svg").default;
import React from "react";
import { View, StyleSheet } from "react-native";

//this component will generate the qr code
const QrCode = ({ userId }) => {
  return (
    <View style={styles.qrCodeContainer}>
      <QRCode value={userId} size={200} color="#433D8B" />
    </View>
  );
};

export default QrCode;

//styles for qr code
const styles = StyleSheet.create({
  qrCodeContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
});
