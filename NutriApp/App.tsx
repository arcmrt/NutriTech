import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  HomeStackScreen  from  "./screens/HomeScreen";
import  ProfileScreen  from  "./screens/ProfileScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconTag;

            if (route.name === 'Home') {
              iconTag = focused ? 'home' : 'home-outline';
            } 
            else if (route.name === 'Profile') {
              iconTag = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconTag} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'lightblue',
          tabBarInactiveTintColor: 'orange',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
