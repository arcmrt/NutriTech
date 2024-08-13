import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import Spacing from '@/constants/Spacing';
import FontSize from '@/constants/FontSize';
import Colors from '@/constants/colors/Colors';
import axios from 'axios';
import RenderHtml from "react-native-render-html";
import { useHeaderHeight } from '@react-navigation/elements';

import AnimatedBoxes from './animationTest';

import gradient from "@/assets/images/gradient_1080_1920(blue).png";

type RecipeScreenRouteProp = RouteProp<{ params: { userName: string, recipeId: string } }, 'params'>;

const RecipeScreen: React.FC = () => {
    const [recipe, setRecipe] = useState<any>(null);
    const route = useRoute<RecipeScreenRouteProp>();
    const { recipeId } = route.params || {};
    const { userName } = route.params || {};

    const { height, width } = Dimensions.get("window");
    const headerHeight = useHeaderHeight(); 

    const BG_IMAGE = "https://images.pexels.com/photos/4041327/pexels-photo-4041327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            const lambdaApiUrl = 'https://hhrq9za8y9.execute-api.eu-west-1.amazonaws.com/SearchRecipeAPIStage/display';
            try {
                console.log('Fetching recipe:', recipeId);
                const response = await axios.post(lambdaApiUrl, { recipeId, userName });
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

        if (recipeId) {
            fetchRecipeDetails();
        }
    }, [recipeId]);

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
        <SafeAreaView style={[styles.container, { paddingTop: headerHeight / 1.2 }]}>
            <Image
                source={gradient}
                style={StyleSheet.absoluteFillObject}
                blurRadius={20}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Image source={{ uri: recipe.image }} style={styles.image} />
                    <Text style={styles.title}>{recipe.title}</Text>
                </View>
                
                <View style={styles.nutritionContainer}>
                    <Text style={styles.nutritionTitle}>Nutrition Details</Text>
                    <Text style={[styles.nutritionText,{fontWeight:"bold"}]}>Macro</Text>
                    <View style={styles.nutritionRow}>
                        <Text style={[styles.nutritionText]}>{"\t\t"}Types: </Text>   
                        <Text style={styles.nutritionType}>Protein - {recipe.protein}</Text>
                        <Text style={styles.nutritionType}>Fat - {recipe.fat}</Text>
                        <Text style={styles.nutritionType}>Carbohydrate - {recipe.carbs}</Text>
                    </View>
                    <Text style={[styles.nutritionText,{fontWeight:"bold"}]}>Calories</Text>
                    <View style={styles.nutritionRow}>
                        <Text style={styles.nutritionText}>{"\t\t"}Total Calories: {recipe.calories}</Text>
                    </View>
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
    loadingContainer: {
        flex: 1,
        padding: Spacing,
    },
});

export default RecipeScreen;
