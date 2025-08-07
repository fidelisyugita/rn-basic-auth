import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { LoginScreenProps } from "../types/navigationType";
import { Feather } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const authContext = useContext(AuthContext);
  const login = authContext?.login;

  const handleLogin = async () => {
    if (!login) {
      setError("Authentication service unavailable");
      return;
    }
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error || "Login failed");
    } else {
      navigation.dispatch(StackActions.replace("Home"));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Feather name={showPassword ? "eye-off" : "eye"} size={20} />
        </TouchableOpacity>
      </View>

      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  error: {
    color: "red",
    marginBottom: 15,
    textAlign: "center",
  },
  link: {
    color: "blue",
    marginTop: 15,
    textAlign: "center",
  },
});

export default LoginScreen;
