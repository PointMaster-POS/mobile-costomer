import React,{useState, useContext,useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../context/userContext';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CustomerProfile({ navigation }) {
    // const customer = {
    //     name: 'Himindu Kularathne',
    //     email: 'himindukularathne@gmail.com',
    //     dateOfBirth: '2001-11-07',
    //     profileImage: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg', 
    // };

    //state to hold customer
    const [customer, setCustomer] = useState({});
    const { setUser} = useContext(UserContext);
    //fetch customer details from the server
    const getCustomerDetails = async () => {
        //get access token from async storage
        const accessToken = await AsyncStorage.getItem('accessToken');
        console.log('Access Token:', accessToken);
        try {
            const response = await axios.get('http://localhost:3004/customer', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            setCustomer(response.data);
            console.log('Customer:', response.data);
            setUser(response.data);

            
        } catch (error) {
            console.error('Error:', error.message);

        }
    };

    //get customer details from the server
    useEffect(() => {
        getCustomerDetails();
    }, []);




    return (
        <View style={styles.container}>
            <Image 
                style={styles.profileImage}
                source={{ uri: customer.profileImage }}
            />
            <Text style={styles.name}>{customer.customer_name}</Text>
            <Text style={styles.email}>{customer.customer_mail}</Text>
            <Text style={styles.dob}>Date of Birth: {customer.birthday}</Text>
            <Text style={styles.dob}>Phone Number: {customer.customer_phone}</Text>
            <Text style={styles.dob}>Gender: {customer.gender}</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {

                    //navigate with form parameters
                    navigation.navigate('EditProfile', {
                        name: customer.customer_name,
                        email: customer.customer_mail,
                        phone : customer.customer_phone,
                        dob: customer.birthday,
                        profileImage: customer.profileImage,
                        gender: customer.gender,

                    });
                }}>
                    <FontAwesome name='edit' size={20} color='#C8ACD6' />
                    <Text style={styles.buttonText}> Edit Profile</Text>
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
});
