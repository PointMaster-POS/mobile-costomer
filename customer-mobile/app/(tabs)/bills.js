import React, {useState} from 'react';
import { View, Text, FlatList, StyleSheet, Touchable, TouchableOpacity,Modal } from 'react-native';

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
        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Bill Details</Text>
              <Text style={styles.modalText}>Bill ID: {selectedBill.id}</Text>
              <Text style={styles.modalText}>Business Name: {selectedBill.businessName}</Text>
              <Text style={styles.modalText}>Time: {selectedBill.time}</Text>
              <Text style={styles.modalText}>Total Amount: {selectedBill.totalAmount}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    
    },
    modalContent: {
      width: '80%',
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
        shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color : '#2E236C'
    },
    modalText: {
      fontSize: 16,
      marginBottom: 10,
    },
    closeButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#433D8B',
      borderRadius: 5,
    },
    closeButtonText: {
      color: 'white',
      fontSize: 16,
    },
  });