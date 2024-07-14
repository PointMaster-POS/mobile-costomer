import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, ScrollView, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import AuthenticateUser from "../../lib/authuser";

import DateTimePicker from "@react-native-community/datetimepicker";
const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleLogin = () => {
    if (AuthenticateUser({ email, password })) {
      console.log("User authenticated");
      navigation.navigate("RegisterScreen");
    } else {
      console.log("User not authenticated");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>PointMaster</Text>
      <ScrollView style = {{height: "100%"}}>
        <Input
          style={styles.input}
          placeholder="First Name"
          onChangeText={setFirstName}
          value={firstName}
          autoCapitalize="none"
        />
        <Input
          style={styles.input}
          placeholder="First Name"
          onChangeText={setLastName}
          value={lastName}
          autoCapitalize="none"
        />
        <Input
          placeholder="e-mail"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
        />

        <Input
          placeholder="address"
          onChangeText={setAddress}
          value={address}
          autoCapitalize="none"
        />
        <Input
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          autoCapitalize="none"
          keyboardType="phone-pad"
        />
        <Text style={styles.label}>Select Gender</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
        <Text style={styles.label}>Select Birthday</Text>
        <DateTimePicker mode="date" display="spinner" value={date} />
        
       
      </ScrollView>
      <View style ={{height: 100, padding: 10}} >
      <Button
          title="Register"
          onPress={handleLogin}
          buttonStyle={styles.registerButton}
      />

      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C8ACD6",
    
  },
  registerLinkText: {
    color: "blue",
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
    backgroundColor: "#433D8B",
  },
  input: {
    width: "100%",
  },

  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  picker: {
    height: 200,
    width: "100%",
  },
  label: {
    fontSize: 20,
    marginTop: 20,
  },
  pickerContainer: {
    margin: 10,
    alignItems: "center",
  },
});

export default RegisterScreen;
