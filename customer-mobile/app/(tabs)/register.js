import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, ScrollView, View, Image, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { showMessage } from "react-native-flash-message";
import axios from "axios";


const RegisterScreen = () => {
  //initialize navigation
  const navigation = useNavigation();

  //states to handle user input
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState("");

  const customerAvatarLinks = [
    "https://firebasestorage.googleapis.com/v0/b/pointmaster-79d9a.appspot.com/o/profileImages%2F3d-illustration-human-avatar-profile_23-2150671126.avif?alt=media&token=88368021-5432-4e7d-8188-a2f86ce6e93b",
    "https://firebasestorage.googleapis.com/v0/b/pointmaster-79d9a.appspot.com/o/profileImages%2F3d-illustration-with-online-avatar_23-2151303097.avif?alt=media&token=1de48dc4-8322-4910-85f4-59350b77f635",
    "https://firebasestorage.googleapis.com/v0/b/pointmaster-79d9a.appspot.com/o/profileImages%2Fcat.avif?alt=media&token=9db88f5f-e567-4f35-8bd3-6febff06317e",
    "https://firebasestorage.googleapis.com/v0/b/pointmaster-79d9a.appspot.com/o/profileImages%2Fjack.avif?alt=media&token=8dd56939-2e91-4978-bbe0-c952e29e7e91",
    "https://firebasestorage.googleapis.com/v0/b/pointmaster-79d9a.appspot.com/o/profileImages%2Ftom.avif?alt=media&token=0f363a35-89e9-4416-a971-90cc530c9220",
  ];

  //function to handle register button press
  const handleRegister = () => {
    if (password !== confirmPassword) {
      console.log("Passwords do not match!");
      showMessage({
        message: "Passwords do not match!",
        type: "danger",
        color: "#fff",
        backgroundColor: "#FF6500",
        icon: "info",
        duration: 3000,
      });
      return;
    }
    const userData = {
      customer_name: firstName + " " + lastName,
      customer_mail: email,
      password,
      gender,
      customer_phone: phoneNumber,
      birthday: date.toISOString().split("T")[0],
      photo_url: selectedImage,
    };
    console.log("User Data: ", userData);

    //send data to backend
    axios
      .post("http://localhost:3004/customer/register", userData)
      .then((response) => {
        console.log("Response: ", response.data);
        showMessage({
          message: "Registration Successful",
          type: "success",
          color: "#fff",
          backgroundColor: "#FF6500",
          icon: "info",
          duration: 3000,
        });
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error: ", error.message);
        showMessage({
          message: "Error: " + error.message,
          type: "danger",
          color: "#fff",
          backgroundColor: "#FF6500",
          icon: "info",
          duration: 3000,
        });
      }
      );
    





   
   
      
   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>PointMaster</Text>
      <ScrollView style={{ height: "100%" }}>
        <Text style={styles.label}>Choose Profile Image</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageSelectorContainer}>
          {customerAvatarLinks.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedImage(image)}>
              <Image
                source={{ uri: image }}
                style={[styles.image, selectedImage === image && styles.selectedImage]}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Input
          style={styles.input}
          placeholder="First Name"
          onChangeText={setFirstName}
          value={firstName}
          autoCapitalize="none"
          inputStyle={styles.inputStyle}
          placeholderTextColor="#808080"
        />
        <Input
          style={styles.input}
          placeholder="Last Name"
          onChangeText={setLastName}
          value={lastName}
          autoCapitalize="none"
          inputStyle={styles.inputStyle}
          placeholderTextColor="#808080"
        />
        <Input
          placeholder="e-mail"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          inputStyle={styles.inputStyle}
          placeholderTextColor="#808080"
        />
        <Input
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          autoCapitalize="none"
          keyboardType="phone-pad"
          inputStyle={styles.inputStyle}
          placeholderTextColor="#808080"
        />
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          autoCapitalize="none"
          inputStyle={styles.inputStyle}
          placeholderTextColor="#808080"
        />
        <Input
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          autoCapitalize="none"
          inputStyle={styles.inputStyle}
          placeholderTextColor="#808080"
        />
        <Text style={styles.label}>Select Gender</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Gender" value="" color="#808080" />
            <Picker.Item label="Male" value="male" color="#808080" />
            <Picker.Item label="Female" value="female" color="#808080" />
          </Picker>
        </View>
        <Text style={styles.label}>Select Birthday</Text>
        <DateTimePicker mode="date" display="spinner" value={date} onChange={(event, date) => setDate(date || new Date())} />
      </ScrollView>
      <View style={{ height: 100, padding: 10 }}>
        <Button
          title="Register"
          onPress={handleRegister}
          buttonStyle={styles.registerButton}
        />
      </View>
    </View>
  );
};

//styles for register screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E3E62",
  },
  registerLinkText: {
    color: "#FFFFFF",
    textDecorationLine: "underline",
  },
  registerText: {
    marginTop: 100,
    justifyContent: "center",
  },
  registerButton: {
    marginTop: 10,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#FF6500",
  },
  input: {
    width: "100%",
  },
  inputStyle: {
    color: "#FFFFFF",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    color: "#FF6500",
  },
  picker: {
    height: 200,
    width: "100%",
    color: "#FFFFFF",
  },
  label: {
    fontSize: 20,
    marginTop: 20,
    color: "gray",
  },
  pickerContainer: {
    margin: 10,
    alignItems: "center",
  },
  imageSelectorContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedImage: {
    borderColor: "#FF6500",
  },
});

export default RegisterScreen;
