import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import * as ImagePicker from "expo-image-picker"; // Expo Image Picker
import * as FileSystem from "expo-file-system";    // Expo File System for Base64
import DateTimePicker from '@react-native-community/datetimepicker'; // DateTimePicker
import Icon from 'react-native-vector-icons/FontAwesome'; // Import vector icons

export default function EditProfile({ route, navigation }) {
  const [name, setName] = useState(route.params.name);
  const [email, setEmail] = useState(route.params.email);
  const [dateOfBirth, setDateOfBirth] = useState(new Date(route.params.dob)); // Use Date object
  const [phone, setPhone] = useState(route.params.phone);
  const [gender, setGender] = useState(route.params.gender);
  const [profileImage, setProfileImage] = useState(route.params.profileImage);
  const [profileImageBase64, setProfileImageBase64] = useState(null); // Base64 encoded image
  const [showDatePicker, setShowDatePicker] = useState(false); // State for showing date picker

  // Function to handle image picking
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri); // Set selected image URI
      
      // Convert image to Base64
      const base64Image = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setProfileImageBase64(base64Image);  // Store Base64 string in state
    }
  };

  const handleUpdateProfile = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");

    try {
      const response = await axios.put(
        "http://localhost:3004/customer",
        {
          customer_name: name,
          customer_mail: email,
          customer_phone: phone,
          birthday: dateOfBirth.toISOString().split("T")[0], // Format to YYYY-MM-DD
          gender: gender,
          profile_image_base64: profileImageBase64,  // Send Base64 encoded image
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      navigation.goBack();
    } catch (error) {
      showMessage({
        message: "Error",
        description: error.message,
        type: "danger",
      });
    }
  };

  // Function to handle date change
  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setShowDatePicker(false); // Hide date picker
      setDateOfBirth(selectedDate); // Set selected date
    } 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Profile Photo</Text>
      <View style={styles.profileImageContainer}>
      <TouchableOpacity onPress={pickImage}>
        <Image 
          source={{ uri: "https://img.freepik.com/free-photo/bearded-man-with-striped-shirt_273609-7180.jpg" }}
          style={styles.profileImage}
        />
        <Text style={styles.editPhotoText}>Edit Profile Photo</Text>
      </TouchableOpacity>
      </View>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Date of Birth</Text>
      <View style={styles.datePickerContainer}>
      <DateTimePicker 
          value={dateOfBirth}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      </View>
        <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
        {/* <Icon name="calendar" size={20} color="#433D8B" style={styles.icon} /> */}
      </TouchableOpacity>

       
     

      <Text style={styles.label}>Gender</Text>
      <TextInput style={styles.input} value={gender} onChangeText={setGender} />

      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  datePickerContainer: {
    flexDirection: 'row', // Aligns input and icon horizontally
    alignItems: 'center', // Centers vertically

    // backgroundColor: "#c8acd6",
    borderRadius: 5,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  editPhotoText: {
    textAlign: "center",
    color: "#2E236C",
    marginBottom: 20,
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
  datePicker: {
    flexDirection: 'row', // Aligns input and icon horizontally
    alignItems: 'center', // Centers vertically
  },
  icon: {
    marginLeft: 10, // Add some space between input and icon
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
