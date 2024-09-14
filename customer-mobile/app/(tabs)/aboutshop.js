import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function AboutShop({ route }) {
  console.log(route.params.shopData);
  const {
    business_id,
    business_mail,
    business_url,
    business_hotline,
    business_description,
    business_address,
    business_owner_name,
    business_owner_mail,
    business_password,
    logo_location,
    business_hours,
    business_registration_number,
    business_type,
    business_registration_date,
    status,
  } = route.params.shopData; // Assuming the shop data is passed through the route
  console.log({busin :business_hours});

  const statusText = status === 1 ? 'Active' : 'Inactive';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={{ uri: logo_location }} style={styles.logo} />
      </View>

      {/* Business Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Business Details</Text>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{business_owner_name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{business_mail}</Text>

        <Text style={styles.label}>Website:</Text>
        <Text style={styles.value}>{business_url}</Text>

        <Text style={styles.label}>Hotline:</Text>
        <Text style={styles.value}>{business_hotline}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{business_address}</Text>

        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{business_description}</Text>
      </View>

      {/* Business Hours */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Business Hours</Text>

        {/* {Object.entries(route.params.shopData.business_hours).map(([day, hours]) => (
        <View key={day} style={styles.row}>
          <Text style={styles.dayLabel}>
            {day.charAt(0).toUpperCase() + day.slice(1)}:
          </Text>
          <Text style={styles.hoursValue}>{hours}</Text>
        </View>
      ))} */}

        
      </View>

      {/* Registration and Type */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Other Information</Text>
        <Text style={styles.label}>Registration Number:</Text>
        <Text style={styles.value}>{business_registration_number}</Text>

        <Text style={styles.label}>Type:</Text>
        <Text style={styles.value}>{business_type}</Text>

        <Text style={styles.label}>Registration Date:</Text>
        <Text style={styles.value}>
          {new Date(business_registration_date).toLocaleDateString()}
        </Text>

        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{statusText}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E236C',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
