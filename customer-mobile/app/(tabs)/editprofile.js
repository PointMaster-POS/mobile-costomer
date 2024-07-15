import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function EditProfile({ navigation }) {
    
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [dateOfBirth, setDateOfBirth] = useState('1990-01-01');

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name</Text>
            <TextInput 
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput 
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Date of Birth</Text>
            <TextInput 
                style={styles.input}
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
            />

            <TouchableOpacity style={styles.button} onPress={() => {
                // Save the changes and navigate back
                alert('Profile updated');
                navigation.goBack();
            }}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    label: {
        fontSize: 18,
        color: '#2E236C',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#433D8B',
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        marginBottom: 20,
        color: '#C8ACD6',
    },
    button: {
        backgroundColor: '#2E236C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#C8ACD6',
        fontWeight: 'bold',
    },
});
