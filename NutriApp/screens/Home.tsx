import * as React from 'react';
import { Button, Dimensions, ScrollView, Text, View, StyleSheet } from 'react-native';
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
import RenderHtml from "react-native-render-html";
import { BarChart, LineChart } from "react-native-gifted-charts";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const { height, width } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home: React.FC<Props> = ({ route, navigation: { navigate } }) => {
    const [recipe, setRecipe] = useState<any>(null);
    const [info, setInfo] = useState<any>(null);
    const { username: initialUsername } = route.params || {};
    const [userName, setUsername] = useState(initialUsername || '');
    const lineData = [{ value: 0 }, { value: 20 }, { value: 18 }, { value: 40 }, { value: 36 }, { value: 60 }, { value: 54 }, { value: 85 }];

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
        const API_URL = 'https://uvz80evw9b.execute-api.eu-west-1.amazonaws.com/prod/getVitals';
        const getUserInfo = async () => {
            try {
                const response = await axios.post(API_URL, { userName });
                console.log('User info: ', response.data);
                setInfo(response.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
                setInfo(null);
            }
        };
        if (userName) {
            getUserInfo();
        }
    }, [userName]);

    return (
        <SafeAreaView style={{ padding: Spacing, flex: 1 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <LineChart
                    initialSpacing={0}
                    data={lineData}
                    spacing={30}
                    hideDataPoints
                    thickness={5}
                    hideRules
                    hideYAxisText
                    yAxisColor="#0BA5A4"
                    showVerticalLines
                    verticalLinesColor="rgba(14,164,164,0.5)"
                    xAxisColor="#0BA5A4"
                    color="#0BA5A4"
                    containerStyle={{ marginBottom: Spacing * 2 }}
                />
                {recipe ? (
                    <View style={styles.recipeContainer}>
                        <Text style={styles.welcomeText}>Welcome {userName} here is a daily recipe:</Text>
                        <Text style={styles.recipeTitle}>{recipe.title}</Text>
                        <RenderHtml contentWidth={width - Spacing * 4} source={{ html: recipe.instructions }} />
                        <Text style={styles.infoText}>{JSON.stringify(info)}</Text>
                    </View>
                ) : (
                    <Text style={styles.noVitalsText}>No vitals found for the user.</Text>
                )}
            </ScrollView>
            <Text style={styles.comingSoonText}>Coming Soon..</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    recipeContainer: {
        padding: Spacing,
        borderWidth: 1,
        width: width - Spacing * 2,
        borderRadius: 20,
        borderColor: Colors.gray,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // for android
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing * 2,
    },
    welcomeText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: FontSize.medium,
        marginBottom: Spacing,
    },
    recipeTitle: {
        padding: Spacing,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: FontSize.medium,
        marginBottom: Spacing,
    },
    infoText: {
        padding: Spacing,
        textAlign: "center",
        fontSize: FontSize.medium,
        marginTop: Spacing,
    },
    noVitalsText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: FontSize.medium,
        marginTop: Spacing * 2,
    },
    comingSoonText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: FontSize.medium,
        marginTop: Spacing * 2,
    },
});

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
