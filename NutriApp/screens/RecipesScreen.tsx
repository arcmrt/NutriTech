import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spacing from '@/constants/Spacing'
import FontSize from '@/constants/FontSize'
import Colors from '@/constants/colors/Colors'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'
import { Color } from 'aws-cdk-lib/aws-cloudwatch'
import axios from 'axios'
import { fetchUserAttributes } from '@aws-amplify/auth'


const {height} = Dimensions.get("window");
type Props = NativeStackScreenProps<RootStackParamList, "Recipes">;


const RecipeShort = ({ onPress, title, img }: { onPress: () => void; title: string; img: string }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.recipeShortContainer}>
      <Text style={{ color: Colors.text, fontSize: FontSize.medium }}>{title}</Text>
      <ImageBackground 
        style={{
          height: height / 8,
          right: 0,
        }}
        resizeMode="contain"
        source={{ uri: img }}
      />
    </View>
  </TouchableOpacity>
);

const styles = {
  recipeShortContainer: {
    flex: 2,
    padding: Spacing * 2,
    backgroundColor: Colors.gray,
    borderRadius: 10,
    marginVertical: Spacing * 2,
    
    elevation: 5,
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: Spacing },
    shadowOpacity: 0.5,
    shadowRadius: Spacing,
  },
};

const RecipesScreen: React.FC<Props> = ({route, navigation: { navigate } }) => {
  const { username: initialUsername} = route.params || {};
  const [userName, setUsername] = useState(initialUsername || '');
  const [info, setInfo] = useState<any>(null);
  
  const [recipes, setRecipes] = useState<any[]>([]);


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

  return (
    <SafeAreaView style={{ flex: 1, padding: Spacing }}>
      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: FontSize.medium }}>
        Recipes that are suitable for your diet
      </Text>
      <Text style={{ textAlign: "center", fontSize: FontSize.small, marginTop: 5, color: Colors.textGray }}>
        You can choose various delicious options from various amount of recipes that lies below.
      </Text>
      <TouchableOpacity 
        onPress={() => navigate('Recipe')}
        style={{marginTop:Spacing, backgroundColor:Colors.textGray, borderRadius:30,}}>
        
        <Text style={{textAlign:"center"}}>
          Go to recipes
        </Text>
      </TouchableOpacity>
      
      <ScrollView style={{ flex: 1, marginTop: Spacing, marginHorizontal:Spacing, }}>
        {Array.from({ length: 10 }, (_, i) => (
          <RecipeShort
            key={i}
            onPress={() => navigate('Recipe')}
            title={recipes[i]?.title || 'Recipe'}
            img={recipes[i]?.image || 'https://via.placeholder.com/150'}
          />
        ))}


      </ScrollView>
    </SafeAreaView>
  )
}

export default RecipesScreen
