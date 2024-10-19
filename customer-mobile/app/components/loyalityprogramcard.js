import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoyaltyProgramCard = ({ program }) => {
  // ----------------- Loyalty Program Card -----------------
  return (
    <View style={styles.card}>
      <Text style={styles.programName}>{program.name}</Text>
      <Text style={styles.programDetails}>{program.details}</Text>
    </View>
  );
};

//styles for loyalty program card
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  programName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
  },
  programDetails: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
});

export default LoyaltyProgramCard;
