const axios = require('axios');

const RAPIDAPI_KEY = 'ccf1b8cfc0msheebd3296ec8da96p153ab6jsndb7e936a6550';
const RAPIDAPI_HOST = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';

class Recipe {
    constructor(id, title, image, imageType, likes, usedIngredientCount, missedIngredientCount) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.imageType = imageType;
        this.likes = likes;
        this.usedIngredientCount = usedIngredientCount;
        this.missedIngredientCount = missedIngredientCount;
        this.ingredients = [];
        this.nutrition = {};
        this.instructions = [];
    }

    setIngredients(ingredients) {
        this.ingredients = ingredients;
    }

    setNutrition(nutrition) {
        this.nutrition = nutrition;
    }

    setInstructions(instructions) {
        this.instructions = instructions;
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
    }
}

async function fetchWithRetry(url, options, retries = 3) {
    try {
        return await axios.get(url, options);
    } catch (error) {
        if (error.response && error.response.status === 429 && retries > 0) {
            console.log('Rate limit exceeded. Retrying in 1 second...');
            await new Promise(res => setTimeout(res, 1000));
            return fetchWithRetry(url, options, retries - 1);
        } else {
            throw error;
        }
    }
}

async function getRecipeById(recipeId) {
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
        return null;
    }
}

module.exports = { getRecipeById };
