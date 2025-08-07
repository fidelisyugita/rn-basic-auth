import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, AuthContextType } from "../types/authType";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.log("Error retrieving user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        return { success: false, error: "Please fill in all fields" };
      }
      // Simulate API call
      if (email === "user@example.com" && password === "password") {
        const userData = { name: "Test User", email };
        setUser(userData);
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        return { success: true };
      } else {
        return {
          success: false,
          error: `Invalid credentials`,
        };
      }
    } catch (error) {
      console.log("Login error:", error);
      return { success: false, error: "Login failed" };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      if (!name || !email || !password) {
        return { success: false, error: "All fields are required" };
      }
      if (password.length < 6) {
        return {
          success: false,
          error: "Password must be at least 6 characters",
        };
      }
      if (!email.includes("@")) {
        return { success: false, error: "Invalid email format" };
      }

      const userData = { name, email };
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.log("Signup error:", error);
      return { success: false, error: "Signup failed" };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
