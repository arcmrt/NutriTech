import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  HomeStackScreen  from  "./screens/Home";
import  ProfileScreen  from  "./screens/ProfileScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Mode } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Size } from 'aws-cdk-lib';
import WelcomeScreen from './screens/WelcomeScreen';
// import  fonts  from "./config/fonts";

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator


        screenOptions={({ route }) => ({
          
          tabBarIcon: ({ focused, color, size }) => {
            let iconTag;
            size = 30;

            if(route.name === "Welcome"){
              iconTag = focused ? "earth": "earth-outline"; 
            }

            else if (route.name === 'Home') {
              iconTag = focused ? 'home' : 'home-outline';
              
            } 
            else if (route.name === 'Profile') {
              iconTag = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconTag} size={size} color={color} />;
          },

          // tabBar styling
          tabBarActiveTintColor: 'lightblue',
          tabBarInactiveTintColor: 'orange',
          tabBarLabelStyle: {
            fontSize: 12,
            color: "green",
            borderTopWidth: 1,
            borderTopColor: "lightgray",
            height: 15,
            fontWeight: "bold",
          },
          headerShown: false,
          animation:"fade",

        })}
      >

        <Tab.Screen name="Welcome" component={WelcomeScreen}/>
        <Tab.Screen name="Home"  component={HomeStackScreen} 
        listeners={() => ({
          tabPress: e => {
            // Prevent default action
            // e.preventDefault();
            // Do something with the `navigation` object
          }
        })} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
