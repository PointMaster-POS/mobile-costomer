// AboutShop.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import LoyaltyProgramCard from '../components/loyalityprogramcard';

const AboutShop = () => {
  const shop = {
    name: 'Example Shop',
    description: 'This is an example shop description.',
    registeredSince: '2020-01-01',
    email: 'example@shop.com',
    telephone: '+1234567890',
  };

  const loyaltyPrograms = [
    {
      id: '1',
      name: 'Gold Membership',
      details: '10% off on all products for Gold members.',
    },
    {
      id: '2',
      name: 'Silver Membership',
      details: '5% off on all products for Silver members.',
    },
    {
      id: '3',
      name: 'Bronze Membership',
      details: '2% off on all products for Bronze members.',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.shopInfo}>
        <Text style={styles.shopName}>{shop.name}</Text>
        <Text style={styles.shopDescription}>{shop.description}</Text>
        <Text style={styles.shopDetails}>Registered Since: {shop.registeredSince}</Text>
        <Text style={styles.shopDetails}>Email: {shop.email}</Text>
        <Text style={styles.shopDetails}>Telephone: {shop.telephone}</Text>
      </View>
      <View style={styles.loyaltyPrograms}>
        <Text style={styles.sectionTitle}>All Loyalty Programs</Text>
        <FlatList
          data={loyaltyPrograms}
          renderItem={({ item }) => <LoyaltyProgramCard program={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  shopInfo: {
    marginBottom: 30,
  },
  shopName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
  },
  shopDescription: {
    fontSize: 16,
    color: '#6c757d',
    marginVertical: 10,
  },
  shopDetails: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 5,
  },
  loyaltyPrograms: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default AboutShop;
