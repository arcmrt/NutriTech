import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

const RAPIDAPI_KEY = 'ccf1b8cfc0msheebd3296ec8da96p153ab6jsndb7e936a6550';
const RAPIDAPI_HOST = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';

interface Ingredient {
    name: string;
    amount: number;
    unit: string;
}

interface Nutrition {
    calories: string;
    carbs: string;
    fat: string;
    protein: string;
}

interface Instruction {
    number: number;
    step: string;
}

class Recipe {
    id: number;
    title: string;
    image: string;
    imageType: string;
    likes: number;
    usedIngredientCount: number;
    missedIngredientCount: number;
    ingredients: Ingredient[];
    nutrition: Nutrition;
    instructions: Instruction[];

    constructor(
        id: number,
        title: string,
        image: string,
        imageType: string,
        likes: number,
        usedIngredientCount: number,
        missedIngredientCount: number
    ) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.imageType = imageType;
        this.likes = likes;
        this.usedIngredientCount = usedIngredientCount;
        this.missedIngredientCount = missedIngredientCount;
        this.ingredients = [];
        this.nutrition = {} as Nutrition;
        this.instructions = [];
    }

    setIngredients(ingredients: Ingredient[]) {
        this.ingredients = ingredients;
    }

    setNutrition(nutrition: Nutrition) {
        this.nutrition = nutrition;
    }

    setInstructions(instructions: Instruction[]) {
        this.instructions = instructions;
    }

    async saveRecipeDetailsToFile() {
        const recipeDetails = {
            id: this.id,
            title: this.title,
            image: this.image,
            imageType: this.imageType,
            likes: this.likes,
            usedIngredientCount: this.usedIngredientCount,
            missedIngredientCount: this.missedIngredientCount,
            ingredients: this.ingredients,
            nutrition: this.nutrition,
            instructions: this.instructions
        };

        const filePath = `${FileSystem.documentDirectory}recipe_${this.id}.json`;

        try {
            await FileSystem.writeAsStringAsync(filePath, JSON.stringify(recipeDetails, null, 2));
            console.log(`Recipe details saved to ${filePath}`);
        } catch (error) {
            console.error('Error saving file:', error);
            Alert.alert('Error', 'Failed to save recipe details');
        }
    }

    displayRecipeDetails() {
        console.log(`ID: ${this.id}`);
        console.log(`Title: ${this.title}`);
        console.log(`Image: ${this.image}`);
        console.log(`Image Type: ${this.imageType}`);
        console.log(`Likes: ${this.likes}`);
        console.log(`Used Ingredients: ${this.usedIngredientCount}`);
        console.log(`Missed Ingredients: ${this.missedIngredientCount}`);
        console.log('Ingredients:', this.ingredients);
        console.log('Nutrition:', this.nutrition);
        console.log('Instructions:', this.instructions);

        this.saveRecipeDetailsToFile();
    }
}

async function fetchWithRetry(url: string, options: any, retries: number = 3): Promise<any> {
    try {
        return await axios.get(url, options);
    } catch (error: any) {
        if (error.response && error.response.status === 429 && retries > 0) {
            console.log('Rate limit exceeded. Retrying in 1 second...');
            await new Promise(res => setTimeout(res, 1000));
            return fetchWithRetry(url, options, retries - 1);
        } else {
            throw error;
        }
    }
}

export async function getRecipeById(recipeId: number): Promise<Recipe | null> {
    try {
        const options = {
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST
            }
        };

        const recipeResponse = await fetchWithRetry(`https://${RAPIDAPI_HOST}/recipes/${recipeId}/information`, options);
        const recipeData = recipeResponse.data;

        const recipe = new Recipe(
            recipeData.id,
            recipeData.title,
            recipeData.image,
            recipeData.imageType,
            recipeData.aggregateLikes,
            recipeData.usedIngredientCount,
            recipeData.missedIngredientCount
        );

        const ingredientsResponse = await fetchWithRetry(`https://${RAPIDAPI_HOST}/recipes/${recipeId}/ingredientWidget.json`, options);
        recipe.setIngredients(ingredientsResponse.data.ingredients);

        const nutritionResponse = await fetchWithRetry(`https://${RAPIDAPI_HOST}/recipes/${recipeId}/nutritionWidget.json`, options);
        recipe.setNutrition(nutritionResponse.data);

        const instructionsResponse = await fetchWithRetry(`https://${RAPIDAPI_HOST}/recipes/${recipeId}/analyzedInstructions`, options);
        recipe.setInstructions(instructionsResponse.data[0]?.steps || []);

        return recipe;
    } catch (error) {
        console.error('Error fetching recipe data:', error);
        Alert.alert('Error', 'Failed to fetch recipe data');
        return null;
    }
}

export { Recipe, Ingredient, Nutrition, Instruction };
