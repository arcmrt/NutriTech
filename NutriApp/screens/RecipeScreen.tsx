import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const recipes = [
    { title: 'Recipe 1', description: 'This is recipe 1' },
    { title: 'Recipe 2', description: 'This is recipe 2' },
    // Add more recipes as needed
];

const RecipeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
                <Text style={styles.header}>Recipes</Text>
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) => (
                        <View style={styles.recipeItem}>
                            <Text style={styles.recipeTitle}>{item.title}</Text>
                            <Text style={styles.recipeDescription}>{item.description}</Text>
                        </View>
                    )}
                />

        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 24,
        color: 'blue',
        textAlign: 'center',
        marginBottom: 16,
    },
    recipeItem: {
        marginBottom: 8,
        padding: 8,
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 10,
    },
    recipeTitle: {
        fontSize: 18,
        color: 'blue',
    },
    recipeDescription: {
        fontSize: 14,
        color: 'black',
    },
});

export default RecipeScreen;