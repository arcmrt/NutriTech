import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spacing from '@/constants/Spacing'
import { Colors } from '@/constants/colors/Colors'

const SettingsScreen = () => {
  return (
    <SafeAreaView style={{padding:Spacing * 2}}>
      <View>
        <TouchableOpacity
          style={{
            flexDirection:"row",
            marginTop: Spacing * 2,
            borderColor: Colors.gray,
          }}>
          <ImageBackground 
            style={{
              height: 25,
              width: 25,
              justifyContent: 'center',
              alignItems: 'center',

            }}          
            resizeMode="cover" source={require('../assets/images/profile2.png')}/>
            <Text 
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: Spacing,
              }}>
              Username
            </Text>

            <Text 
              style={{
                fontSize: 20,
                marginLeft: 'auto',  
              }}>
                {"edit"}
            </Text>

        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SettingsScreen