import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import Spacing from '@/constants/Spacing';
import FontSize from '@/constants/FontSize';
import Colors from '@/constants/colors/Colors';
import axios from 'axios';
import RenderHtml from "react-native-render-html";
import { useHeaderHeight } from '@react-navigation/elements';
import AnimatedBoxes from '../components/animationTest';
import IonIcons from 'react-native-vector-icons/Ionicons';
import gradient from "@/assets/images/gradient_1080_1920(blue).png";
import { PieChart } from 'react-native-gifted-charts';

type RecipeScreenRouteProp = RouteProp<{ params: { userName: string, recipeId: string } }, 'params'>;

const RecipeScreen: React.FC = () => {
    const [recipe, setRecipe] = useState<any>(null);
    const route = useRoute<RecipeScreenRouteProp>();
    const { recipeId } = route.params || {};
    const { userName } = route.params || {};
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(recipe?.likes || 0);


    const { height, width } = Dimensions.get("window");
    const headerHeight = useHeaderHeight(); 

    const BG_IMAGE = "https://images.pexels.com/photos/4041327/pexels-photo-4041327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

    useEffect(() => {
        const fetchRecipeSocialDetails = async () => {

            const fetchRecipeComments = ' https://r8dnbeqvcb.execute-api.eu-west-1.amazonaws.com/dev/comment/get';
            try {
                console.log('Fetching recipe:', recipeId);
    
                const likeResponse = await axios.post(fetchRecipeComments, { recipeId });
                console.log(likeResponse.data)
                //const commentResponse = await axios.post(fetchRecipeComments, { recipeId });
    
                if (likeResponse) {

                    setLikesCount(likeResponse.data.likes);

                } else {
                    console.error('API likeResponse is empty:', likeResponse.data);
                }

                //console.log('API commentResponse:', commentResponse.data);
    
            } catch (error) {
                console.error('Error fetching recipeLikeCount:', error);
            }
        };
    
        if (recipeId) {
            fetchRecipeSocialDetails();
        }
    }, [recipeId]);


    useEffect(() => {
        const fetchRecipeDetails = async () => {
            const fetchFromID_api = 'https://hhrq9za8y9.execute-api.eu-west-1.amazonaws.com/SearchRecipeAPIStage/display';
            const fetchSimilarRecipes_api = 'https://hhrq9za8y9.execute-api.eu-west-1.amazonaws.com/SearchRecipeAPIStage/similar';
            try {
                console.log('Fetching recipe:', recipeId);

                const IdResponse = await axios.post(fetchFromID_api, { recipeId, userName });

                await new Promise(resolve => setTimeout(resolve, 3000));

                // const SimilarResponse = await axios.post(fetchSimilarRecipes_api, { recipeId, userName });

                if (IdResponse.data) {
                    setRecipe(IdResponse.data);
                    console.log('API IdResponse:', IdResponse.data);
                } else {
                    console.error('API IdResponse is empty:', IdResponse.data);
                }

    
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
    
        if (recipeId) {
            fetchRecipeDetails();
        }
    }, [recipeId]);
    
    useEffect(() => {
        const fetchRecipeDetails = async () => {
            const checkLikedRecipe_api = 'https://mllvzslr65.execute-api.eu-west-1.amazonaws.com/default/checkLikedRecipe';
            try {
                console.log('Fetching recipe:', recipeId);
                console.log('Fetching recipe:', userName);
    
                const checkLikedResponse = await axios.post(checkLikedRecipe_api, { userName, recipeId });
    
                if (checkLikedResponse.data) {
                    setIsLiked(checkLikedResponse.data.liked)
                    console.log('API checkLiked:', checkLikedResponse.data);
                } else {
                    console.error('API IdResponse is empty:', checkLikedResponse.data);
                }

    
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
    
        if (userName && recipeId) {
            fetchRecipeDetails();
        }
    }, [userName, recipeId]);

    if (!recipe) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <View style={{ flex: 1, justifyContent: "flex-start" }}>
                    <AnimatedBoxes/>                
                </View>

            </SafeAreaView>
        );
    }

    const handleLikePress = async () => {
        const likeRecipeCheck = 'https://mllvzslr65.execute-api.eu-west-1.amazonaws.com/default/checkLikedRecipe'
        const likeResponse = await axios.post(likeRecipeCheck, {recipeId, userName});
        if (likeResponse) {
            likeRecipeFunction();
            setIsLiked(true);
            setLikesCount((prevCount: number) => prevCount + 1);
        } else {
            dislikeRecipeFunction();
            setIsLiked(false);
            setLikesCount((prevCount: number) => prevCount - 1);
        }
    };
    
    const likeRecipeFunction = async () => {
        const likeRecipe_api = 'https://r8dnbeqvcb.execute-api.eu-west-1.amazonaws.com/dev/like/likeRecipe';
        try {
            console.log('Liking recipe:', userName, recipeId);
            const likeResponse = await axios.post(likeRecipe_api, { userName, recipeId });
            if (likeResponse.data) {
                console.log('API likeResponse:', likeResponse.data);
            } else {
                console.error('API likeResponse is empty:', likeResponse.data);
            }
        } catch (error) {
            console.error('Error liking recipe:', error.response ? error.response.data : error.message);
        }
    };
    
    const dislikeRecipeFunction = async () => {
        const unlikeRecipe_api = 'https://r8dnbeqvcb.execute-api.eu-west-1.amazonaws.com/dev/like/unlikeRecipe';
        try {
            console.log('Disliking recipe:', userName, recipeId);
            const dislikeResponse = await axios.post(unlikeRecipe_api, { userName, recipeId });
            if (dislikeResponse.data) {
                console.log('API dislikeResponse:', dislikeResponse.data);
            } else {
                console.error('API dislikeResponse is empty:', dislikeResponse.data);
            }
        } catch (error) {
            console.error('Error disliking recipe:', error.response ? error.response.data : error.message);
        }
    };

    const pieData = [
        { value: parseFloat(recipe?.protein), color: '#d55607' },
        { value: parseFloat(recipe?.fat), color: '#d1c107' },
        { value: parseFloat(recipe?.carbs), color: '#064eea' },
    ];

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
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.title}>{recipe.title}</Text>
                        <View style={styles.likeContainer}>
                            <TouchableOpacity onPress={handleLikePress} style={styles.likeButton}>
                                <IonIcons name={isLiked ? "heart" : "heart-outline"} size={25} color={isLiked ? "red" : "gray"} />
                                <Text style={styles.likesCount}>{likesCount}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                
                <View style={styles.nutritionContainer}>
                    <Text style={styles.nutritionTitle}>Nutrition Details</Text>
                    <Text style={[styles.nutritionText,{fontWeight:"bold"}]}>Macro</Text>
                    <View style={styles.nutritionRow}>
                        <PieChart
                            data={pieData}
                            radius={80}
                            donut
                            textColor="white"
                            textSize={15}
                            fontWeight="bold"
                        />

                        <View style={styles.legendContainer}>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendColorBox, { backgroundColor: '#d55607' }]} />
                                <Text style={styles.legendLabel}>Protein: {recipe.protein}</Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendColorBox, { backgroundColor: '#d1c107' }]} />
                                <Text style={styles.legendLabel}>Fat: {recipe.fat}</Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendColorBox, { backgroundColor: '#064eea' }]} />
                                <Text style={styles.legendLabel}>Carbohydrates: {recipe.carbs}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.nutritionText,{fontWeight:"bold"}]}>Calories</Text>
                    <View style={styles.nutritionRow}>
                        <Text style={styles.nutritionText}>Total Calories: {recipe.calories}</Text>
                    </View>
                </View>
                <View style={styles.nutritionContainer}>
                    <Text style={[styles.nutritionTitle,{fontWeight:"bold"}]}>Ingredients</Text>
                    {recipe.ingredients.map((ingredient: { id: any; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; amount: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; unit: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: any) => (
                        <Text key={`${ingredient.id}-${index}`} style={styles.nutritionText}>
                            {ingredient.name} - {ingredient.amount} {ingredient.unit}
                        </Text>
                    ))}
                </View>
                <View style={styles.instructionsContainer}>
                    <Text style={styles.instructionsTitle}>Recipe</Text>
                    <RenderHtml contentWidth={width - Spacing * 4} source={{ html: recipe.instructions || "<p>Not available</p>" }} />

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
    pieChartContainer: {
        flex: 1,
        alignItems: 'flex-start',  // Aligns the PieChart to the left
    },
    nutritionType: {
        fontSize: FontSize.xSmall,
        color: Colors.text,
        paddingHorizontal: Spacing / 2,
        paddingVertical: Spacing / 4,
        backgroundColor: Colors.gray,
        borderRadius: Spacing,
    },
    legendContainer: {
        marginLeft: 16,
        justifyContent: 'center',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    legendColorBox: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 8,
    },
    legendLabel: {
        fontSize: 16,
        color: '#333',
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
    headerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    likeButton: {
        padding: Spacing / 2,
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likesCount: {
        marginLeft: 8, // spacing between heart icon and count
        fontSize: FontSize.medium,
        color: Colors.text,
    },
});

export default RecipeScreen;
