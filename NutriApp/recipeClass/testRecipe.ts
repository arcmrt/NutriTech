import { getRecipeById } from './recipe';

async function testGetRecipeById() {
    const recipeId: number = 991010;  // Replace with the recipe ID you want to test
    const recipe = await getRecipeById(recipeId);

    if (recipe) {
        recipe.displayRecipeDetails();
    } else {
        console.log('Failed to fetch recipe details.');
    }
}

testGetRecipeById();
