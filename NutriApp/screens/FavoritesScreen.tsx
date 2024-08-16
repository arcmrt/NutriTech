import { View, Text, FlatList, ActivityIndicator, StyleSheet, Animated, TouchableOpacity, ImageBackground, Dimensions, Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import AnimatedBoxes from '../components/animationTest';
import axios from 'axios';
import {RouteProp, useRoute} from '@react-navigation/native';
import { fetchUserAttributes } from '@aws-amplify/auth';
import { UserProfile } from '@/profileClass/profile';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontSize from '@/constants/FontSize';
const { height } = Dimensions.get("window");

import gradient from "@/assets/images/gradient_red.png";
import Spacing from '@/constants/Spacing';
import Colors from '@/constants/colors/Colors';
import { RootStackParamList } from '@/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type Props = NativeStackScreenProps<RootStackParamList, "Recipes">;

const FavoritesScreen:React.FC<Props> = ({ route, navigation: { navigate } }) =>{
  const [info, setInfo] = useState<any>(null);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUsername] = useState( '');


  useEffect(() => {
    currentAuthenticatedUser();
}, []);

const ITEM_SIZE = 150 + Spacing * 3;


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
    const fetchData = async () => {
        if (userName) {
            const userProfile = new UserProfile();
            await userProfile.fetchProfile(userName);
            const profile = await userProfile.getProfile();
            setInfo(profile);
            console.log('User  m profile:', profile);
        }
    };
    fetchData();
}, [userName]);


  if (error) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }


  useEffect(() => {
    const fetchRecipe = async () => {
      const lambdaApiUrl = 'https://to3a92d3x3.execute-api.eu-west-1.amazonaws.com/default/bulkRecipwDisplay';
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
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
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



export default FavoritesScreen;
