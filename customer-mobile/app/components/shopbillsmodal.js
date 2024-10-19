import React from 'react';
import { Modal,View,Text,TouchableOpacity,StyleSheet } from 'react-native';

export default function ShopBillsModal ({selectedBill,isModalVisible,setModalVisible}) {
  // ----------------- Shop Bills Modal -----------------
  console.log("Selected Bill:", selectedBill);
    return (
        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Bill Details</Text>
              <Text style={styles.modalText}>Bill ID: {selectedBill.bill_id}</Text>
              <Text style={styles.modalText}>Date : {selectedBill.date_time}</Text>
              <Text style={styles.modalText}>Total Amount: {selectedBill.total_price}</Text>
              {/* <Text style={styles.modalText}>Total Amount: {selectedBill.totalAmount}</Text> */}
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    )
}

// ----------------- Styles -----------------
const styles = StyleSheet.create({
    
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
      backgroundColor: '#FF6500',
      borderRadius: 5,
    },
    closeButtonText: {
      color: 'white',
      fontSize: 16,
    },
  });