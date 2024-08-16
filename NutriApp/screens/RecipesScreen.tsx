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

import SearchBar from '@/components/searchBar';
import AnimatedBoxes from '../components/animationTest';
import { LinearGradient } from 'react-native-svg';

import gradient from "@/assets/images/gradient_1080_1920.png";


const { height } = Dimensions.get("window");
type Props = NativeStackScreenProps<RootStackParamList, "Recipes">;

const RecipeShort = ({ onPress, title, img, scale, opacity }: {
  onPress: () => void;
  title: string;
  img: string;
  scale: any;
  opacity: any;
}) => (
  <TouchableOpacity onPress={onPress}>
    <Animated.View style={[styles.recipeShortContainer, { transform: [{ scale }], opacity }]}>
      <View style={styles.imageContainer}>
        <ImageBackground 
          style={styles.image}
          resizeMode="cover"
          source={{ uri: img }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Animated.View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  recipeShortContainer: {
    flexDirection: 'row',
    padding: 16, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 15,
    marginVertical: 16, 
    elevation: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    marginRight: 12, 
  },
  image: {
    height: height / 8,
    width: '100%',
    borderRadius: 10, 
  },
  textContainer: {
    flex: 2,
  },
  title: {
    color: '#333',
    fontSize: 16, 
    fontWeight: 'bold', 
  },
});

const RecipesScreen: React.FC<Props> = ({ route, navigation: { navigate } }) => {
  const { username: initialUsername } = route.params || {};
  const [userName, setUsername] = useState(initialUsername || '');
  const [recipes, setRecipes] = useState<any[]>([]);
  const [query, setSearchText] = useState('');

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

  const searchRecipe = async () => {
    const lambdaApiUrl = 'https://hhrq9za8y9.execute-api.eu-west-1.amazonaws.com/SearchRecipeAPIStage/search/searchBar';
    try {

      const response = await axios.post(lambdaApiUrl, {userName, query});

      console.log('API response:', response.data);

      if (response.data) {
        setRecipes(response.data);
        console.log("The API search text: ", query);
        console.log("The API data: ", response.data);
      } else {
        console.error('API response is empty:', response.data);
      }
    }catch (error) {
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if(query) searchRecipe();
    }, 500); 
  
    return () => clearTimeout(delayDebounceFn);
  }, [query]);
  
  if(!recipes) {
    return (
      <SafeAreaView style={{ padding: Spacing, flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <AnimatedBoxes/>
        </View>
      </SafeAreaView>
    );
  }
  


  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
      <SafeAreaView style={{ marginTop: 0 ,flex: 1, padding: Spacing }}>

      <Image
        source={gradient}
        style={StyleSheet.absoluteFillObject}
        blurRadius={10}
      />
      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: FontSize.medium }}>
        Recipes that are suitable for your diet
      </Text>
      <Text style={{ textAlign: "center", fontSize: FontSize.small, marginTop: 5, color: Colors.textGray }}>
        You can choose various delicious options from various amounts of recipes that lie below.
      </Text>
    
      <SearchBar onSearch={setSearchText} query={query} />
    
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
              onPress={() => navigate('Recipe', { userName: userName, recipeId: item.id })}
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
