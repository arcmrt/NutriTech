import * as React from 'react';
import { Button, Dimensions, ScrollView, Text, View, StyleSheet, Image } from 'react-native';
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

import gradient from "@/assets/images/gradient_veganGreen.png";
import Linking from "expo";

import {UserProfile} from "@/profileClass/profile";
import FavoritesScreen from './FavoritesScreen';
import AnimatedBoxes from './animationTest';



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

    const handleLinkPress = (href: string) => {
        navigate("Recipes")
    };
    


    useEffect(() => {
        const fetchData = async () => {
            if (userName) {
                const userProfile = new UserProfile();
                await userProfile.fetchProfile(userName);
                const profile = await userProfile.getProfile();
                setInfo(profile);
                //console.log('User profile:', profile);
            }
        };
        fetchData();
    }, [userName]);
    
    
    useEffect(() => {
        const fetchRecipeDetails = async () => {
            const lambdaApiUrl = 'https://hhrq9za8y9.execute-api.eu-west-1.amazonaws.com/SearchRecipeAPIStage/dailyRecipe';
            try {
                const response = await axios.post(lambdaApiUrl, { userName });
                if (response.data) {
                    setRecipe(response.data);
                    console.log('API response:', response.data);
                } else {
                    console.error('API response is empty:', response.data);
                }
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        if (userName) {
            fetchRecipeDetails();
        }
    }, [userName]);

    if (!recipe) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <View style={{ flex: 1, justifyContent: "flex-start" }}>
                    <AnimatedBoxes/>                
                </View>
            </SafeAreaView>
        );
    }




    return (
        <SafeAreaView style={{ padding: Spacing, flex: 1 }}>
            <Image
                source={gradient}
                style={StyleSheet.absoluteFillObject}
                blurRadius={20}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.recipeTitle}>
                    Daily Recipe
                </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Image source={{ uri: recipe.image }} style={styles.image} />
                    <Text style={styles.title}>{recipe.title}</Text>
                </View>
                
                <View style={styles.nutritionContainer}>
                    <Text style={styles.nutritionTitle}>Recipe Summary</Text>
                        <RenderHtml contentWidth={width - Spacing * 4} source={{ html: recipe.summary }} onlinkPress={{handleLinkPress}}  />
                </View>
                <View style={styles.nutritionContainer}>
                    <Text style={[styles.nutritionTitle,{fontWeight:"bold"}]}>Ingredients</Text>
                    {recipe.ingredients.map((ingredient: any) => (
                        <Text key={ingredient.id} style={styles.nutritionText}>
                            {ingredient.name} - {ingredient.amount} {ingredient.unit}
                        </Text>
                    ))}
                </View>
                <View style={styles.instructionsContainer}>
                    <Text style={styles.instructionsTitle}>Recipe</Text>
                    <RenderHtml contentWidth={width - Spacing * 4} source={{ html: recipe.instructions }} />
                </View>
                <View style={styles.similarRecipesContainer}>
                    <Text style={styles.similarRecipesTitle}>Similar to this..</Text>

                </View>

            </ScrollView>
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
    titleContainer: {
        padding: Spacing / 50,
        borderWidth: 1,
        width: width - Spacing * 2,
        borderRadius: 20,
        borderColor: Colors.gray,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing * 1.2,
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
    loadingContainer: {
        flex: 1,
        padding: Spacing,
    },
    container: {
        paddingTop: Spacing * 2,
        flex: 1,
        padding: Spacing * 1.2,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing * 2,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: Spacing,
        marginRight: Spacing,
    },
    title: {
        fontSize: FontSize.large,
        fontWeight: 'bold',
        flex: 1,
        color: Colors.text,
    },
    nutritionContainer: {
        padding: Spacing,
        borderRadius: Spacing,
        backgroundColor: Colors.card,
        marginBottom: Spacing * 2,
    },
    nutritionTitle: {
        fontSize: FontSize.medium,
        fontWeight: 'bold',
        marginBottom: Spacing,
        color: Colors.text,
    },
    nutritionText: {
        fontSize: FontSize.small,
        marginBottom: Spacing / 2,
        color: Colors.text,
    },
    nutritionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing,
    },
    nutritionType: {
        fontSize: FontSize.xSmall,
        color: Colors.text,
        paddingHorizontal: Spacing / 2,
        paddingVertical: Spacing / 4,
        backgroundColor: Colors.gray,
        borderRadius: Spacing,
    },
    instructionsContainer: {
        padding: Spacing,
        marginBottom: Spacing * 2,
        borderRadius: Spacing,
        backgroundColor: Colors.card,
    },
    instructionsTitle: {
        fontSize: FontSize.medium,
        fontWeight: 'bold',
        marginBottom: Spacing,
        color: Colors.text,
    },
    similarRecipesContainer: {
        padding: Spacing,
        borderRadius: Spacing,
        backgroundColor: Colors.card,
    },
    similarRecipesTitle: {
        fontSize: FontSize.medium,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: Spacing,
        color: Colors.text,
    },
    instructionText: {
        fontSize: FontSize.small,
        marginBottom: Spacing / 2,
        color: Colors.text,
    },
    loadingText: {
        fontSize: FontSize.medium,
        textAlign: 'center',
        color: Colors.text,
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
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconTag;
                        size = 28; 

                        if (route.name === 'Recipes') {
                            iconTag = focused ? 'pizza' : 'pizza-outline';
                        } else if (route.name === 'Home') {
                            iconTag = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Profile') {
                            iconTag = focused ? 'person' : 'person-outline';
                        } else if (route.name === 'Logout') {
                            iconTag = focused ? 'log-out' : 'log-out-outline';
                        } else if (route.name === 'Favorites') {
                            iconTag = focused ? 'heart' : 'heart-outline';
                        }

                        return <Ionicons name={iconTag} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: Colors.blue,
                    tabBarInactiveTintColor: Colors.darkText,
                    tabBarLabelStyle: {
                        fontSize: 11,  
                        fontWeight: 'bold',
                    },
                    tabBarStyle: homeStyles.tabBarStyle,  
                    headerShown: false,
                    animation: 'fade',
                })}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Recipes" component={RecipesScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
                <Tab.Screen name="Favorites" component={FavoritesScreen} />
                <Tab.Screen name="Logout" component={BlankScreen} listeners={{ tabPress: handleLogoutPress }} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

const homeStyles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        backgroundColor: Colors.tabBarBackground, 
        borderTopWidth: 0, 
        elevation: 0, 
        height: 50,  
        borderRadius: 15, 
        marginBottom: 5,  
        marginHorizontal: 8,  
        shadowColor: Colors.blackShadow, 
        shadowOffset: { width: 0, height: 10 },  
        shadowOpacity: 0.1, 
        shadowRadius: 6,  
    },
});

function BlankScreen() {
    return null; 
}



export default HomeTabs;
