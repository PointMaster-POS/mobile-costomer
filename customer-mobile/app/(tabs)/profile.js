import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CustomerProfile({ navigation }) {
    //fetch customer details from server or maybe from async storage
    const customer = {
        name: 'Himindu Kularathne',
        email: 'himindukularathne@gmail.com',
        dateOfBirth: '2001-11-07',
        profileImage: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg', 
    };

    return (
        <View style={styles.container}>
            <Image 
                style={styles.profileImage}
                source={{ uri: customer.profileImage }}
            />
            <Text style={styles.name}>{customer.name}</Text>
            <Text style={styles.email}>{customer.email}</Text>
            <Text style={styles.dob}>Date of Birth: {customer.dateOfBirth}</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.navigate('EditProfile');
                }}>
                    <FontAwesome name='edit' size={20} color='#C8ACD6' />
                    <Text style={styles.buttonText}> Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View style =  {styles.logoutContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.replace('Login');
                }}>
                    <FontAwesome name='sign-out' size={20} color='#C8ACD6' />
                    <Text style={styles.buttonText}> Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'top',
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        color: '#6c757d',
        marginBottom: 10,
    },
    dob: {
        fontSize: 18,
        color: '#6c757d',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        flexDirection: 'row', 
        backgroundColor: '#2E236C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center', 
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 18,
        color: '#C8ACD6',
        fontWeight: 'bold',
    },
    logoutContainer: {
        flexDirection: 'row',
        justifyContent: 'bottom',
        alignItems: 'bottom',
        marginTop: 20,
    },

});
