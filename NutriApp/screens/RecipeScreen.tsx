import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import Spacing from '@/constants/Spacing';
import FontSize from '@/constants/FontSize';
import Colors from '@/constants/colors/Colors';
import axios from 'axios';

type RecipeScreenRouteProp = RouteProp<{ params: { recipeId: string } }, 'params'>;

const RecipeScreen: React.FC = () => {
    const [recipe, setRecipe] = useState<any>(null);
    const route = useRoute<RecipeScreenRouteProp>();
    const { recipeId } = route.params || {};




    useEffect(() => {
        const fetchRecipeDetails = async () => {
            const lambdaApiUrl = 'https://rut5nz58qa.execute-api.eu-west-1.amazonaws.com/dev/simpleRecipe';
            try {
                console.log('Fetching recipe:', recipeId);
                const response = await axios.post(lambdaApiUrl, { recipeId });
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
    

        if(recipeId) {
          fetchRecipeDetails()
        }
    }, [recipeId])
    

    if (!recipe) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {recipe.image && (
                    <Image source={{ uri: recipe.image }} style={styles.image} />
                )}
                <Text style={styles.title}>{recipe.title}</Text>
                <View style={styles.nutritionContainer}>
                    <Text style={styles.nutritionTitle}>Nutrition Facts</Text>
                    {recipe.nutrition && (
                        <>
                            <Text style={styles.nutritionText}>Calories: {recipe.nutrition.calories}</Text>
                            <Text style={styles.nutritionText}>Protein: {recipe.nutrition.protein}g</Text>
                            <Text style={styles.nutritionText}>Carbs: {recipe.nutrition.carbs}g</Text>
                            <Text style={styles.nutritionText}>Fat: {recipe.nutrition.fat}g</Text>
                        </>
                    )}
                </View>
                <View style={styles.ingredientsContainer}>
                    <Text style={styles.ingredientsTitle}>Ingredients</Text>
                    {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                        <Text key={index} style={styles.ingredientText}>{ingredient.name} - {ingredient.amount} {ingredient.unit}</Text>
                    ))}
                </View>
                <View style={styles.instructionsContainer}>
                    <Text style={styles.instructionsTitle}>Instructions</Text>
                    {recipe.instructions && recipe.instructions.map((instruction, index) => (
                        <Text key={index} style={styles.instructionText}>{index + 1}. {instruction.step}</Text>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Spacing * 2,
        backgroundColor: Colors.background,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: Spacing,
        marginBottom: Spacing * 2,
    },
    title: {
        fontSize: FontSize.large,
        fontWeight: 'bold',
        marginBottom: Spacing,
        textAlign: 'center',
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
    ingredientsContainer: {
        padding: Spacing,
        borderRadius: Spacing,
        backgroundColor: Colors.card,
        marginBottom: Spacing * 2,
    },
    ingredientsTitle: {
        fontSize: FontSize.medium,
        fontWeight: 'bold',
        marginBottom: Spacing,
        color: Colors.text,
    },
    ingredientText: {
        fontSize: FontSize.small,
        marginBottom: Spacing / 2,
        color: Colors.text,
    },
    instructionsContainer: {
        padding: Spacing,
        borderRadius: Spacing,
        backgroundColor: Colors.card,
    },
    instructionsTitle: {
        fontSize: FontSize.medium,
        fontWeight: 'bold',
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

export default RecipeScreen;
