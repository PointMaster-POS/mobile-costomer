import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { UserContext } from '../context/userContext';




export default function LoyaltyCard() {

    //get loyalty details of business
    const { user } = React.useContext(UserContext);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Loyalty Card</Text>
            <View style={styles.card}>
                <Image
                    style={styles.profileImage}
                    source={{ uri: user.profileImage }}
                />
                <View style={styles.cardDetails}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                    <Text style={styles.dateOfBirth}>{user.dateOfBirth}</Text>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    cardDetails: {
        marginLeft: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 14,
    },
    dateOfBirth: {
        fontSize: 14,
    },
});
