import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView, // For scrolling avatars if too many
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import * as ImagePicker from "expo-image-picker"; 
import DateTimePicker from "@react-native-community/datetimepicker";

export default function EditProfile({ route, navigation }) {
  const [name, setName] = useState(route.params.name);
  const [email, setEmail] = useState(route.params.email);
  const [dateOfBirth, setDateOfBirth] = useState(new Date(route.params.dob));
  const [phone, setPhone] = useState(route.params.phone);
  const [gender, setGender] = useState(route.params.gender);
  const [profileImage, setProfileImage] = useState(route.params.profileImage);
  const [newProfileImage, setNewProfileImage] = useState(null); 
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [modalVisible, setModalVisible] = useState(false); // Modal for avatar selection

  const customerAvatarLinks = [
    'https://firebasestorage.googleapis.com/v0/b/pointmaster-79d9a.appspot.com/o/profileImages%2F3d-illustration-human-avatar-profile_23-2150671126.avif?alt=media&token=88368021-5432-4e7d-8188-a2f86ce6e93b',
    'https://firebasestorage.googleapis.com/v0/b/pointmaster-79d9a.appspot.com/o/profileImages%2F3d-illustration-with-online-avatar_23-2151303097.avif?alt=media&token=1de48dc4-8322-4910-85f4-59350b77f635',
    'https://firebasestorage.googleapis.com/v0/b/pointmaster-79d9a.appspot.com/o/profileImages%2Fcat.avif?alt=media&token=9db88f5f-e567-4f35-8bd3-6febff06317e',
    'https://firebasestorage.googleapis.com/v0/b/pointmaster-79d9a.appspot.com/o/profileImages%2Fjack.avif?alt=media&token=8dd56939-2e91-4978-bbe0-c952e29e7e91',
    'https://firebasestorage.googleapis.com/v0/b/pointmaster-79d9a.appspot.com/o/profileImages%2Ftom.avif?alt=media&token=0f363a35-89e9-4416-a971-90cc530c9220',
  ];

  const handleUpdateProfile = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");

      const data = {
        customer_name: name,
        customer_mail: email,
        customer_phone: phone,
        birthday: dateOfBirth.toISOString().split("T")[0],
        gender: gender,
        photo_url: newProfileImage ? newProfileImage : profileImage,
      };
      console.log("Data:", data);

      const response = await axios.put(
        "http://localhost:3004/customer",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      showMessage({
        message: "Profile Updated!",
        description: "Your profile has been updated successfully.",
        type: "success",
        color: "#fff",
        backgroundColor : "#FF6500",
      });

      navigation.goBack();
    } catch (error) {
      showMessage({
        message: "Error",
        description: error.message || "Failed to update profile",
        type: "danger",
      });
    }
  };

  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setShowDatePicker(false);
      setDateOfBirth(selectedDate);
    }
  };

  const selectProfileImage = (uri) => {
    setNewProfileImage(uri); 
    setModalVisible(false); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Profile Photo</Text>
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={{ uri: newProfileImage || profileImage }} style={styles.profileImage} />
          <Text style={styles.editPhotoText}>Edit Profile Photo</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Date of Birth</Text>
      <View style={styles.datePickerContainer}>
        <DateTimePicker value={dateOfBirth} mode="date" display="default" onChange={onDateChange} />
      </View>

      <Text style={styles.label}>Gender</Text>
      <TextInput style={styles.input} value={gender} onChangeText={setGender} />

      <TouchableOpacity style={styles.button} onPress={() => handleUpdateProfile()}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      {/* Modal for avatar selection */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.avatarGrid}>
            {customerAvatarLinks.map((link, index) => (
              <TouchableOpacity key={index} onPress={() => selectProfileImage(link)}>
                <Image source={{ uri: link }} style={styles.avatarImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingTop: 60,
  },
  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 20,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
  },
  closeButton: {
    backgroundColor: "#2E236C",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
