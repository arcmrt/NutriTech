import * as React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";

import DetailsScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { useNavigation } from '@react-navigation/native';
import RecipesScreen from '../screens/RecipesScreen';
import Colors from '@/constants/colors/Colors';
import FontSize from '@/constants/FontSize';
import { useEffect, useState } from "react";
import axios from "axios";
import { RootStackParamList } from "@/types";
import { fetchUserAttributes, signOut } from '@aws-amplify/auth';
import Spacing from '@/constants/Spacing';
import RenderHtml from "react-native-render-html"

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home: React.FC<Props> = ({ route, navigation: { navigate } }) => {
    const [recipe, setRecipe] = useState<any>(null);
    const { username: initialUsername } = route.params || {};
    const [userName, setUsername] = useState(initialUsername || '');

    useEffect(() => {
      currentAuthenticatedUser();
    }, []);

    const currentAuthenticatedUser = async () => {
      try {
        const user = await fetchUserAttributes();
        const username = user.name;
        setUsername(username);
        console.log(`The username: ${username}`);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
        const fetchRecipe = async () => {
            const lambdaApiUrl = 'https://hhrq9za8y9.execute-api.eu-west-1.amazonaws.com/SearchRecipeAPIStage/search';
            try {
                const response = await axios.post(lambdaApiUrl, { userName });
                console.log('API response:', response.data);   
   
   
                if (response.data) {
                    setRecipe(response.data);
                    console.log("The API username: ", userName);
                } else {
                    console.error('API response is empty:', response.data);
                    setRecipe(null);
                }
            } catch (error) {
                console.error('Error fetching recipe:', error);
                setRecipe(null);
            }
        };

        if (userName) {
            fetchRecipe();
        }
    }, [userName]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                {recipe ? (
                    <View style={{ padding: Spacing }}>
                        <Text style={{ padding: Spacing * 4, marginVertical: Spacing, textAlign: "center", justifyContent: "center", fontSize: FontSize.medium }}>{recipe.title}</Text>
                        <RenderHtml contentWidth={100} source={{ html: recipe.instructions }} />
                    </View>
                ) : (
                    <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: FontSize.medium }}>No recipe available</Text>
                )}
            </ScrollView>
            <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: FontSize.medium }}>Coming Soon..</Text>
        </SafeAreaView>
    );
}

function HomeTabs() {
    const navigation = useNavigation();

    async function handleSignOut() {
        try {
            await signOut();
            console.log('sign out success');
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    const handleLogoutPress = (e: any) => {
        handleSignOut();
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

                        if (route.name === "Recipes") {
                            iconTag = focused ? "pizza" : "pizza-outline";
                        } else if (route.name === 'Home') {
                            iconTag = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Profile') {
                            iconTag = focused ? 'person' : 'person-outline';
                        } else if (route.name === 'Logout') {
                            iconTag = focused ? 'log-out' : 'log-out-outline';
                        }

                        return <Ionicons name={iconTag} size={size} color={color} />;
                    },

                    tabBarActiveTintColor: Colors.blue,
                    tabBarInactiveTintColor: Colors.darkText,
                    tabBarLabelStyle: ({ focused }: { focused: boolean }) => ({
                        color: focused ? Colors.blue : Colors.darkText,
                        fontSize: 12,
                        height: 15,
                        fontWeight: "bold",
                    }),
                    headerShown: false,
                    animation: "fade",
                })}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Recipes" component={RecipesScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
                <Tab.Screen name="Logout" component={BlankScreen} listeners={{ tabPress: handleLogoutPress }} />
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
