import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spacing from '@/constants/Spacing'
import FontSize from '@/constants/FontSize'
import Colors from '@/constants/colors/Colors'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'
import { Color } from 'aws-cdk-lib/aws-cloudwatch'

type Props = NativeStackScreenProps<RootStackParamList, "Recipes">;

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
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dapibus nunc quis ullamcorper tincidunt. Phasellus elementum quis urna non finibus. Aenean eu facilisis turpis, ac varius nibh. Suspendisse quam purus, facilisis in ultricies molestie, consequat sit amet justo. Cras eu iaculis elit. Aliquam est eros, egestas in sagittis eget, pharetra sit amet felis. Aliquam nunc nulla, fermentum quis vehicula luctus, eleifend in libero. Nullam lacus nulla, pulvinar nec eleifend ut, congue iaculis justo. Vestibulum vehicula luctus justo, et tincidunt arcu elementum a.

          Nunc et nisl finibus, auctor eros nec, semper massa. Donec dapibus nibh sit amet ultrices auctor. Proin in gravida nisl. Ut tristique, dui ut suscipit posuere, tellus odio viverra justo, id fermentum erat metus et nisi. Quisque eros ipsum, dapibus in vulputate in, lobortis ac diam. Nulla porttitor tellus sed leo feugiat, quis tristique felis tristique. Donec accumsan turpis elit, in feugiat enim placerat eu. Mauris leo leo, lobortis eu felis vitae, egestas suscipit nulla. Sed mattis ultrices odio. Fusce pretium commodo cursus. Cras blandit, leo vitae lobortis elementum, enim urna rutrum urna, nec sagittis nunc turpis pretium erat.

          Vivamus tempor magna lectus. Aenean ac neque vel nunc ultrices vestibulum. Nulla facilisi. Morbi ornare, nunc at malesuada gravida, neque sem malesuada nisi, eleifend laoreet sem tellus eget odio. Integer dapibus, quam at imperdiet blandit, ex magna tristique tortor, ut egestas est dui id est. Fusce a tellus eros. Nunc fermentum lacus ac posuere molestie. Sed vel dui egestas, venenatis mi ac, hendrerit erat.

          Mauris congue feugiat risus at rutrum. Donec aliquam dignissim odio, eu pulvinar nibh pretium in. In hac habitasse platea dictumst. Nunc nec nisi ut risus aliquam iaculis. Donec sed ligula sapien. Nunc sit amet cursus urna, ut aliquam felis. Nulla a cursus massa. Morbi rutrum ipsum sit amet ex semper, sit amet convallis odio tincidunt. Duis nec urna at erat congue finibus eget porta velit. Curabitur nec ipsum hendrerit metus pulvinar ultricies. Vivamus sollicitudin mauris magna, vel lobortis mauris feugiat ut. Nulla eu dui tincidunt, ultrices diam sit amet, posuere libero. Donec ante lectus, tempor eu gravida eget, ullamcorper sit amet nisl. Vestibulum mi ipsum, aliquet non aliquam vitae, egestas et ante. Vivamus varius justo metus. Mauris elit sem, hendrerit sit amet sagittis id, elementum sodales erat.

          Aenean sagittis, diam in venenatis dictum, sapien libero convallis nibh, eu ornare mi urna in neque. Praesent at mattis eros. Suspendisse quis accumsan metus. Quisque lacinia porttitor purus mollis gravida. Duis at felis quam. Donec dapibus, massa ac lobortis hendrerit, est urna mollis urna, a tincidunt justo arcu vel lectus. Nulla mattis aliquam bibendum.
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RecipesScreen
