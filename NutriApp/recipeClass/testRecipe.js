const { getRecipeById } = require('./recipe');

async function testGetRecipeById() {
    const recipeId = 716429;  // Replace with the recipe ID you want to test
    const recipe = await getRecipeById(recipeId);

    if (recipe) {
        recipe.displayRecipeDetails();
    } else {
        console.log('Failed to fetch recipe details.');
    }
}

testGetRecipeById();