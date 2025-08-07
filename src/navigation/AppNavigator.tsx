import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import { RootStackParamList } from "../types/navigationType";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: "Create Account" }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerBackVisible: false }}
      />
    </Stack.Navigator>
  );
};
