import React, {useState} from 'react';
import { View, Text, FlatList, StyleSheet, Touchable, TouchableOpacity,Modal } from 'react-native';
import BillModel from '../components/billmodal';
const billDetails = [
  { id: '1', businessName: 'Store A', time: '10:00 AM', totalAmount: '$50.00' },
  { id: '2', businessName: 'Store B', time: '11:30 AM', totalAmount: '$75.00' },
  { id: '3', businessName: 'Store C', time: '1:45 PM', totalAmount: '$30.00' },
  // Add more bill details here
];

export default function BillScreen({ navigation }) {

    const [isModalVisible , setModalVisible] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);

    const handleRowPress = (item) => {
        setSelectedBill(item);
        setModalVisible(true);
      };
  return (
    <View style={styles.container}>
      {/* <Text
        onPress={() => {
          alert('this is the home page');
        }}
        style={styles.headerText}
      >
        Shops Screen
      </Text> */}
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Bill ID</Text>
          <Text style={styles.tableHeaderText}>Business Name</Text>
          <Text style={styles.tableHeaderText}>Time</Text>
          <Text style={styles.tableHeaderText}>Total Amount</Text>
        </View>
        <FlatList
          data={billDetails}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleRowPress(item)} >
            <View style={styles.tableRow} >
              <Text style={styles.tableCell}>{item.id}</Text>
              <Text style={styles.tableCell}>{item.businessName}</Text>
              <Text style={styles.tableCell}>{item.time}</Text>
              <Text style={styles.tableCell}>{item.totalAmount}</Text>
            </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {selectedBill && (
         <BillModel selectedBill={selectedBill} isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'top',
    },
    headerText: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    tableContainer: {
      width: '90%',
    },
    tableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      backgroundColor: '#f0f0f0',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    tableHeaderText: {
      flex: 1,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    tableCell: {
      flex: 1,
      fontSize: 14,
      textAlign: 'center',
    },
   
  });