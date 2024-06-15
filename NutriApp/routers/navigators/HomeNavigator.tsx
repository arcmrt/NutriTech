import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/Home';
import DetailsScreen from '../../screens/DetailsScreen';

const HomeNavigator = () => {

    const HomeStack = createNativeStackNavigator();

    return (
        <HomeStack.Navigator>
          <HomeStack.Screen name="HomeScreen" options={{headerShown: false}} component={HomeScreen} />
          <HomeStack.Screen name="Details" options={{headerTransparent: true}} component={DetailsScreen} />
        </HomeStack.Navigator>
      );
}

export default HomeNavigator