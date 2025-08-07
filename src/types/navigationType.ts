import { NavigatorScreenParams } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

export type LoginScreenProps = StackScreenProps<RootStackParamList, "Login">;
export type SignupScreenProps = StackScreenProps<RootStackParamList, "Signup">;
export type HomeScreenProps = StackScreenProps<RootStackParamList, "Home">;
