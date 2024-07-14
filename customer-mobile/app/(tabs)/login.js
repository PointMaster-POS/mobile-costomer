import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import AuthenticateUser from "../../lib/authuser";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _handlePressButtonAsync = async () => {
    navigation.navigate("Register");
  };

  const handleLogin = () => {
    if (AuthenticateUser({ email, password })) {
      console.log("User authenticated");
      navigation.replace("Home");
    } else {
      console.log("User not authenticated");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>PointMaster</Text>
      <Input
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button
        title="Login"
        onPress={handleLogin}
        buttonStyle={styles.loginButton}
      />

      <Text style={styles.registerText}>
        Don't have an account
        <Text
          style={styles.registerLinkText}
          onPress={() => {
            _handlePressButtonAsync();
          }}
        >
        register
        </Text>
      </Text>
    </SafeAreaView>
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
    color: '#433D8B',
    textDecorationLine: "underline",
  },
  registerText: {
    marginTop: 100,
    justifyContent: "center",
  },
  loginButton: {
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
  },
});

export default LoginScreen;
