import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './DetailsScreen';


const HomeStack = createNativeStackNavigator();

//??? navigation: any ???
function HomeScreen({ navigation }: { navigation: any }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }
  
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" options={{headerShown: false}} component={HomeScreen} />
      <HomeStack.Screen name="Details" options={{headerTransparent: true}} component={DetailsScreen} />
    </HomeStack.Navigator>
  );
  }

export default HomeStackScreen;