import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spacing from '@/constants/Spacing'
import FontSize from '@/constants/FontSize'
import Colors from '@/constants/colors/Colors'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'
import { Color } from 'aws-cdk-lib/aws-cloudwatch'

const {height} = Dimensions.get("window");
type Props = NativeStackScreenProps<RootStackParamList, "Recipes">;


const RecipeShort = ({ onPress, title }: { onPress: () => void; title: string }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.recipeShortContainer}>
      <Text style={{ color: Colors.text, fontSize: FontSize.medium }}>{title}</Text>
      <ImageBackground 
              style={{
                  height: height / 8,
                  right: 0,
              }}
              resizeMode="contain"
              
              source={require("../assets/images/adaptive-icon.png")}
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

const RecipesScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
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
            title={`Recipe ${i + 1}`}
          />
        ))}

      </ScrollView>
    </SafeAreaView>
  )
}

export default RecipesScreen
