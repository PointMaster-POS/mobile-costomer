import React, { useState , useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import QrCode from "../components/qrcode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const QRCodeView = () => {
  //this user id should be retrieved from async storage


  const [phone, setPhone] = useState("");

  //get token from async storage and call to the endpoint to get phone number
  const getPhone = async () => {
    try {

      //get token from async storage
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:3004/customer/phone", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Response:", response.data);

      //set phone number
      setPhone(response.data.customer_phone);
      console.log("Phone number:", response.data.customer_phone);

    }
    catch (error) {
      console.error("Error:", error.message
      );

    }
  };


    //get user id from async storage
    useEffect(() => {

      //call get phone function
      getPhone();

    }, []);


    return (
      <View style={styles.container}>
        <Text style={styles.title}>My QR Code</Text>
        <View style={styles.qrCodeContainer}>
          <QrCode userId={phone} />
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
