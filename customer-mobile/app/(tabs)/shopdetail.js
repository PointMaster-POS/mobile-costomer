import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import ShopBillsModal from "../components/shopbillsmodal";
import LoyaltyCard from "../components/loyaltycard";
import { MaterialIcons } from "@expo/vector-icons"; // Importing icons from expo
import { UserContext } from "../context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

// Component to display shop details and bills
const ShopDetail = ({ route }) => {
  // States
  const [shopData, setShopData] = useState({});
  const [billsData, setBillsData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isLogged } = useContext(UserContext);

  // Fetch shop data from backend
  const getShopData = async () => {
    const shopId = route.params.businessID;
    try {
      const response = await axios.get(`http://localhost:3004/shop/${shopId}`)
      setShopData(response.data);
      
      
    } catch (error) {
      console.error("Error fetching shop data:", error.message);
    }
  };

  // Fetch bills data based on user ID and shop ID
  const getBillsData = async () => {
    console.log("Fetching bills data...");
    console.log("Shop ID:", route.params.businessID);
    const shopId = route.params.businessID;
    const accessToken = await AsyncStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `http://localhost:3004/bills/business/${shopId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if(response.data.length === 0){
        console.log("No bills found");
      }
      setBillsData(response.data);
      console.log("Bills Data:", response.data);
     
    } catch (error) {
      console.error("Error fetching bills data:", error.message);
    }
  };

  useEffect(() => {
    if (isLogged) {
      const fetchData = async () => {
        await getShopData();
        await getBillsData();
        setIsLoading(false); // Set after data fetching
      };
      fetchData();
    }
  }, [isLogged]);

  const renderBillItem = (item) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedBill(item);
        setModalVisible(true);
      }}
      key={item.id} // Ensure the key is unique for each bill item
    >
      <View style={styles.billItem}>
        {/* Wrap all strings in <Text> components */}
        <Text style={styles.billText}>{item.bill_id}</Text>
        {/*"date_time": "2024-09-24T08:51:27.000Z"*/}
        <Text style={styles.billText}>{item.date_time.split("T")[0]}</Text>
        <Text style={styles.billText}>{item.date_time.split("T")[1].split(".")[0]}</Text>
        <Text style={styles.billText}>{item.total_price}</Text>
        {/* Use the icon correctly inside a <View> or <Text> */}
        <MaterialIcons name="info-outline" size={24} color="#433D8B" />
      </View>
    </TouchableOpacity>
  );
  

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
      <View style={{ justifyContent: "center", alignItems: "center", height : "100%" }}>
       <ActivityIndicator size="large" color="#433D8B" />
      </View>
      ) : (
        <>
          {/* Shop Details */}
          <View style={styles.shopCard}>
            <Image
              style={styles.shopImage}
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7WO9hLoMr9HvSHz-N1cf_vHMoKYaRDXqgxA&s' }}
            />
            <View style={styles.shopCardContent}>
              {console.log("Shop Data:", shopData.business_name)}
              <Text style={styles.shopName}>{shopData.business_name}</Text>
              <Text style={styles.shopDescription}>
                {shopData.business_description}
              </Text>
              <Text style={styles.shopHotline}>
                Hotline: {shopData.business_hotline}
              </Text>
            </View>
          </View>

          {/* Loyalty Program Section */}
          <View>
            {/* <Text style={styles.loyaltyTitle}>My Loyalty Program</Text> */}
            <ScrollView style={styles.loyaltyContainer}>
              <LoyaltyCard businessID={shopData.business_id} />
            </ScrollView>
          </View>

          {/* Bills Section */}
          <View style={styles.billsContainer}>
           
            <Text style={styles.billsTitle}>
              My Bills at {shopData.business_name}
            </Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Bill ID</Text>
              <Text style={styles.tableHeaderText}>Date</Text>
              <Text style={styles.tableHeaderText}>Time</Text>
              <Text style={styles.tableHeaderText}>Total Amount</Text>
            </View>
            <ScrollView style={styles.billsList}>
              {billsData.map(renderBillItem)}
            </ScrollView>
          </View>

          {/* Modal for Bill Details */}
          {selectedBill && (
            <ShopBillsModal
              selectedBill={selectedBill}
              isModalVisible={isModalVisible}
              setModalVisible={setModalVisible}
            />
          )}
        </>
      )}
    </ScrollView>
  );
}

// Styles for Shop Detail Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc", // Light background for contrast
  },
  shopCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    margin: 20,
    justifyContent: "center",
    alignItems: "center", 
  },
  shopImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  shopCardContent: {
    alignItems: "center",
  },
  shopName: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#2E236C",
  },
  shopDescription: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginVertical: 5,
  },
  shopHotline: {
    fontSize: 14,
    color: "#888",
  },
  loyaltyContainer: {

 
    height: "auto" ,
    backgroundColor: "#433D8B",
  
   
    width: "100%",
  },
  loyaltyTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 10,
    color: "#2E236C",
  },
  billsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    margin: 20,
    elevation: 2,
  },
  billsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 10,
    color: "#2E236C",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    
   
    borderColor: "#ccc",
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2E236C",
  },
  billItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor : "#ccc",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  billText: {
    fontSize: 16,
    color: "#433D8B",
    flex: 1,
    textAlign: "center", // Center align text
  },
  billsList: {
    maxHeight: 200, // Limit the height of the bills list
  },
});

export default ShopDetail;
