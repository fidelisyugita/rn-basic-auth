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
import { SignupScreenProps } from "../types/navigationType";
import { Feather } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../helpers/validation";

const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { signup } = useContext(AuthContext);

  const validateForm = () => {
    const nameValidation = validateName(name);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    setNameError(nameValidation.message || "");
    setEmailError(emailValidation.message || "");
    setPasswordError(passwordValidation.message || "");

    return (
      nameValidation.valid && emailValidation.valid && passwordValidation.valid
    );
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    const result = await signup(name, email, password);
    if (!result.success) {
      setError(result.error || "Signup failed");
    } else {
      navigation.dispatch(StackActions.replace("Home"));
    }
  };

  // Add real-time validation
  const handleNameChange = (text: string) => {
    setName(text);
    if (nameError) setNameError(validateName(text).message || "");
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) setEmailError(validateEmail(text).message || "");
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) setPasswordError(validatePassword(text).message || "");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={[styles.input, nameError ? styles.inputError : null]}
        placeholder="Name"
        value={name}
        onChangeText={handleNameChange}
      />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <View
        style={[
          styles.passwordContainer,
          passwordError ? styles.inputError : null,
        ]}
      >
        <TextInput
          style={styles.passwordInput}
          placeholder="Password (min 8 characters)"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Feather name={showPassword ? "eye-off" : "eye"} size={20} />
        </TouchableOpacity>
      </View>
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <Button title="Sign Up" onPress={handleSignup} />

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
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
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    marginTop: -5,
  },
});

export default SignupScreen;
