import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Colors from "../../constants/colors/Colors";

import WelcomeScreen from "../../screens/WelcomeScreen";

import { RootStackParamList } from "@/types";
import LoginScreen from "@/screens/LoginScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import Home from "@/screens/Home";
import ProfileScreen from "@/screens/ProfileScreen";
import DetailsScreen from "@/screens/DetailsScreen";
import RecipeScreen from "@/screens/RecipeScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import RecipesScreen from "@/screens/RecipesScreen";
import VerifyScreen from "@/screens/VerifyScreen";
import VitalsFormScreen from "@/screens/VitalsFormScreen";


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.light,
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Updating Vitals" component={VitalsFormScreen} options={{headerShown: true}} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: true}} />
      <Stack.Screen name="Recipes" component={RecipesScreen}/>
      <Stack.Screen name="Recipe" component={RecipeScreen}/>
    </Stack.Navigator>
  );
}