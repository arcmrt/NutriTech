import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, Image, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacing from '@/constants/Spacing';
import FontSize from '@/constants/FontSize';
import Colors from '@/constants/colors/Colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import axios from 'axios';
import { fetchUserAttributes } from '@aws-amplify/auth';

const { height } = Dimensions.get("window");
type Props = NativeStackScreenProps<RootStackParamList, "Recipes">;

const RecipeShort = ({ onPress, title, img, scale, opacity }: { onPress: () => void; title: string; img: string, scale: any, opacity:any }) => (
  <TouchableOpacity onPress={onPress}>
    <Animated.View style={[styles.recipeShortContainer, { transform: [{ scale }], opacity }]}>
      <Text style={{ color: Colors.text, fontSize: FontSize.medium}}>{title}</Text>
      <ImageBackground 
        style={{
          height: height / 8,
          right: 0,
        }}
        resizeMode="contain"
        source={{ uri: img }}
      />
    </Animated.View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  recipeShortContainer: {
    flex: 2,
    padding: Spacing * 2,
    backgroundColor: Colors.gray,
    borderRadius: 15,
    marginVertical: Spacing * 2,
    elevation: 5,
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: Spacing },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
});

const RecipesScreen: React.FC<Props> = ({ route, navigation: { navigate } }) => {
  const { username: initialUsername } = route.params || {};
  const [userName, setUsername] = useState(initialUsername || '');
  const [recipes, setRecipes] = useState<any[]>([]);

  const BG_IMAGE = "https://images.pexels.com/photos/7135000/pexels-photo-7135000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  const ITEM_SIZE = 150 + Spacing * 3;

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
    const fetchRecipe = async () => {
      const lambdaApiUrl = 'https://hhrq9za8y9.execute-api.eu-west-1.amazonaws.com/SearchRecipeAPIStage/search';
      try {
        const response = await axios.post(lambdaApiUrl, { userName });
        console.log('API response:', response.data);

        if (response.data) {
          setRecipes(response.data);
          console.log("The API username: ", userName);
          console.log("The API data: ", response.data);
        } else {
          console.error('API response is empty:', response.data);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    if (userName) {
      fetchRecipe();
    }
  }, [userName]);

  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={{ flex: 1, padding: Spacing }}>
      <Image
        source={{ uri: BG_IMAGE }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={10}
        />
      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: FontSize.medium }}>
        Recipes that are suitable for your diet
      </Text>
      <Text style={{ textAlign: "center", fontSize: FontSize.small, marginTop: 5, color: Colors.textGray }}>
        You can choose various delicious options from various amount of recipes that lie below.
      </Text>
      
      <Animated.FlatList
        showsVerticalScrollIndicator={false}
        data={recipes}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2)
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0]
          });
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1.1)
          ];

          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0]
          });

          return (
            <RecipeShort
              onPress={() => navigate('Recipe', { username: userName, recipeId: item.id })}
              title={item.title || 'Recipe'}
              img={item.image || 'https://via.placeholder.com/150'}
              scale={scale}
              opacity={opacity}
            />
          );
        }}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        contentContainerStyle={{ marginTop: Spacing, marginHorizontal: Spacing }}
      />

    </SafeAreaView>
  );
}

export default RecipesScreen;
