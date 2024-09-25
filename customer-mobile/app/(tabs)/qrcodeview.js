import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import QrCode from "../components/qrcode"; // Assuming you have a separate QR code component
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/userContext";
import * as Progress from "react-native-progress"; // ProgressBar from react-native-progress

const QRCodeView = () => {
  const { isLogged } = useContext(UserContext);

  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalLoyaltyPoints, setTotalLoyaltyPoints] = useState(170); // Example loyalty points

  // Function to get phone from AsyncStorage
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
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLogged) {
      getPhone();
    }
  }, [isLogged]);

  // Get reward tier based on points
  const getRewardTier = (points) => {
    if (points >= 200) return "Platinum";
    if (points >= 100) return "Gold";
    if (points >= 50) return "Silver";
    return "Bronze";
  };

  // Determine progress bar color based on points
  const progressBarColor = (points) => {
    if (points >= 200) return "#e5e4e2"; // Platinum
    if (points >= 100) return "#ffd700"; // Gold
    if (points >= 50) return "#c0c0c0"; // Silver
    return "#cd7f32"; // Bronze
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#433D8B" />
        <Text>Loading QR Code...</Text>
      </View>
    );
  }

  return (
    <View contentContainerStyle={styles.scrollContainer}>
      
      <View style={styles.container}>
        <View style={styles.detailContainer}>
      <Text style={styles.loyaltyText}>Collect Stars and Earn Rewards!</Text>
      <Text style={styles.loyaltyText}>By Scanning the QR</Text>
        <View style={styles.qrCodeSection}>
          <QrCode userId={phone} />

        </View>
        {phone && <Text style={styles.phoneText}>Phone: {phone}</Text>}
        
        </View>
      <View style={styles.detailContainer}>
        

        
        <Text style={styles.rewardTierText}>
          Your Reward Tier: {getRewardTier(totalLoyaltyPoints)}
        </Text>

        {/* Progress Bar for Loyalty Points */}
        <Progress.Bar
          progress={totalLoyaltyPoints / 200}
          width={300}
          height={15}
          color={progressBarColor(totalLoyaltyPoints)}
          borderRadius={10}
        />

        <View style={styles.progressLabels}>
          <Text>0</Text>
          <Text>50</Text>
          <Text>100</Text>
          <Text>200</Text>
        </View>
      </View>
    </View>
      
    </View>
  );
};

// Comprehensive and responsive styles
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 20,

  },
  container: {
    alignItems: "center",
    backgroundColor: "#f7f9fc",
    padding: 20,
   
   

    width: "100%",
    height: "100%",
  },

  detailContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "95%",
  },
  qrCodeSection: {

    justifyContent  : 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  phoneText: {
    marginTop: 15,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  loyaltyText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#433D8B",
    textAlign: "center",
  },
  rewardTierText: {
    marginVertical: 15,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  progressLabels: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
});

export default QRCodeView;
