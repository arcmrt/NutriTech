import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";

import DetailsScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { TableSummaryColumn } from 'aws-cdk-lib/aws-cloudwatch';
import WelcomeScreen from '../screens/WelcomeScreen';
import { useNavigation } from '@react-navigation/native';
import RecipesScreen from '../screens/RecipesScreen';
import Colors from '@/constants/colors/Colors';
import FontSize from '@/constants/FontSize';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function Home() {
  return (
    <SafeAreaView style={{}}>
      <Text style={{textAlign:"center", fontWeight:"bold", fontSize:FontSize.medium}}>Coming Soon..</Text>
      </SafeAreaView>
  );
}

function HomeTabs() {

  /** Work on logic */
  const navigation = useNavigation();

  const handleLogoutPress = (e:any) => {
    e.preventDefault();
    navigation.navigate('Welcome');
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            
            tabBarIcon: ({ focused, color, size }) => {
              let iconTag;
              size = 32;

              if(route.name === "Recipes"){
                iconTag = focused ? "pizza": "pizza-outline"; 
              }

              else if (route.name === 'Home') {
                iconTag = focused ? 'home' : 'home-outline';
                
              } 
              else if (route.name === 'Profile') {
                iconTag = focused ? 'person' : 'person-outline';
              }
              else if (route.name === 'Logout') {
                iconTag = focused ? 'log-out' : 'log-out-outline';
              }

              return <Ionicons name={iconTag} size={size} color={color} />;
            },

            // tabBar styling
            tabBarActiveTintColor: Colors.blue,
            tabBarInactiveTintColor: Colors.darkText,
            tabBarLabelStyle: ({focused}: {focused:boolean}) => ({
              color: focused ? Colors.blue : Colors.darkText,
              fontSize: 12,
              height: 15,
              fontWeight: "bold",
            }),
            headerShown: false,
            animation:"fade",

          })}
        >
          <Tab.Screen name="Home"  component={Home} 
          listeners={() => ({
            tabPress: e => {
              // Prevent default action
              // e.preventDefault();
              // Do something with the `navigation` object
            }
          })} />
          <Tab.Screen name="Recipes" component={RecipesScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
         
          <Tab.Screen 
            name="Logout" 
            component={BlankScreen}
            listeners={{

              tabPress: handleLogoutPress
            }}
          />

        </Tab.Navigator>
    </SafeAreaView>
  );
}

function BlankScreen() {
  return null; // This component is just a placeholder
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeTabs" options={{ headerShown: false }} component={HomeTabs} />
      <HomeStack.Screen name="Details" options={{ headerTransparent: true }} component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
