import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import { customerUrl } from '../../url';

export default function LoyaltyCard({ businessID }) {
    const [loyaltyDetails, setLoyaltyDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch loyalty details of the business
    const fetchLoyaltyDetails = async () => {
        
        const url = customerUrl;
        try {
            // Fetch loyalty details of the business
            const response = await axios.get(`${url}/loyalty/loyalty-program/${businessID}`);
            console.log('Loyalty Details:', response.data);
            setLoyaltyDetails(response.data);
        } catch (error) {
            // Log error message if fetching data fails
            console.error('Error fetching loyalty details:', error.message);
        } finally {
            // Set loading to false after fetching data
            setLoading(false);
        }
    };

    //----------------- Fetch Loyalty Details -----------------
    useEffect(() => {
        fetchLoyaltyDetails();
    }, []);

    const { user } = React.useContext(UserContext);

    // Display loading indicator while fetching data
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    // Display error message if loyalty details are not available
    if (!loyaltyDetails) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No loyalty program details available.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>🎁 Loyalty Program</Text> */}
            <View style={styles.card}>
                {/* Program Header with Gift Icon */}
                <View style={styles.header}>
                    
                    <Text style={styles.programName}>🎁 {loyaltyDetails.loyalty_program_name}</Text>
                </View>

                {/* Detailed Loyalty Information */}
                <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                        {/* <Image source={require('../assets/points.png')} style={styles.icon} /> */}
                        <Text style={styles.programDetail}>
                            <Text style={styles.label}>Points per $100:</Text> {loyaltyDetails.points_per_hundred}
                        </Text>
                    </View>

                    <View style={styles.detailItem}>
                        {/* <Image source={require('../assets/redeem.png')} style={styles.icon} /> */}
                        <Text style={styles.programDetail}>
                            <Text style={styles.label}>Redeem Value:</Text> ${loyaltyDetails.redeem_value} per point
                        </Text>
                    </View>

                    <View style={styles.detailItem}>
                        {/* <Image source={require('../assets/eligibility.png')} style={styles.icon} /> */}
                        <Text style={styles.programDetail}>
                            <Text style={styles.label}>Eligibility Spend:</Text> ${loyaltyDetails.minimum_eligibility_value}
                        </Text>
                    </View>

                    <View style={styles.detailItem}>
                        {/* <Image source={require('../assets/calendar.png')} style={styles.icon} /> */}
                        <Text style={styles.programDetail}>
                            <Text style={styles.label}>Start Date:</Text> {new Date(loyaltyDetails.start_date).toLocaleDateString()}
                        </Text>
                    </View>
                </View>

                {/* Action or Status (e.g. View Points) */}
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>⭐ You have earned {Math.floor(loyaltyDetails.points_per_hundred * (loyaltyDetails.minimum_eligibility_value / 100))} points!</Text>
                    <Text style={styles.statusText}>💸 Redeem your rewards now!</Text>
                </View>
            </View>
        </View>
    );
}

// Styles for Loyalty Card
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 13,
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    giftIcon: {
        width: 50,
        height: 50,
        marginRight: 15,
    },
    programName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#555',
    },
    detailsContainer: {
        marginBottom: 20,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    programDetail: {
        fontSize: 16,
        color: '#666',
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
    },
    statusContainer: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#e3f6f5',
        borderRadius: 10,
        alignItems: 'center',
    },
    statusText: {
        fontSize: 18,
        color: '#2c7873',
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});
