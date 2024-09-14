import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

export default function EditProfile({ route, navigation }) {
  const [name, setName] = useState(route.params.name);
  const [email, setEmail] = useState(route.params.email);
  const [dateOfBirth, setDateOfBirth] = useState(route.params.dob);
  const [phone, setPhone] = useState(route.params.phone);
  const [gender, setGender] = useState(route.params.gender);

  const handledUpdateProfile = async () => {
    //get token from async storage
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log("Access Token:", accessToken);

    //update profile
    try {
        
      const response  = await axios.put(
        "http://localhost:3004/customer",
        {
          customer_name: name,
          customer_mail: email,
          customer_phone: phone,
          birthday: dateOfBirth,
          gender: gender,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
        console.log("Response:", response.data);    

      navigation.goBack();
    } catch (error) {
        
      showMessage({
        message: "Error",
        description: error.message,
        type: "danger",
      });
      console.error("Error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Phone</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} />

      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
      />

      <Text style={styles.label}>Gender</Text>
      <TextInput style={styles.input} value={gender} onChangeText={setGender} />

      <TouchableOpacity style={styles.button} onPress={handledUpdateProfile}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  label: {
    fontSize: 18,
    color: "#2E236C",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#433D8B",
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
    color: "#C8ACD6",
  },
  button: {
    backgroundColor: "#2E236C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#C8ACD6",
    fontWeight: "bold",
  },
});
