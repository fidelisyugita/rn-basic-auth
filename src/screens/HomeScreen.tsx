import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { HomeScreenProps } from "../types/navigationType";
import { StackActions } from "@react-navigation/native";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const auth = useContext(AuthContext);
  const { user, logout } = auth;

  const handleLogout = async () => {
    await logout();
    navigation.dispatch(StackActions.replace("Login"));
  };

  if (!user) return navigation.dispatch(StackActions.replace("Login"));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.userInfo}>Name: {user?.name}</Text>
      <Text style={styles.userInfo}>Email: {user?.email}</Text>

      <Button title="Logout" onPress={handleLogout} />
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
  userInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default HomeScreen;
