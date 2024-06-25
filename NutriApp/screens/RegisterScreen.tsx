import { View, Text, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spacing from '@/constants/Spacing'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import Colors from '@/constants/colors/Colors';
import FontSize from '@/constants/FontSize';
import InputText from '@/components/InputText';

const {height} = Dimensions.get("window");
type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen:React.FC<Props> = ({navigation: {navigate}}) => {
  return (
    <SafeAreaView>
        <View style={{
            padding: Spacing * 2,
        }}>
          <ImageBackground 
              style={{
                  height: height / 7,
                  marginVertical: Spacing * 2,
              }}
              resizeMode="center"
              
              source={require("../assets/images/adaptive-icon.png")}
          /> 
          <View className='items-center justify-center'> 
            <Text className='text-5xl' style={{
              paddingVertical: Spacing * 1.2,
              paddingHorizontal: Spacing * 1.2,
              fontWeight: "bold",
              marginVertical: Spacing ,
              color: Colors.blue,
              borderRadius: 10,
              
            }}>Register</Text>
            <Text style={{
              fontSize: FontSize.large,
              fontWeight: "bold",
              width: "85%",
              textAlign: "center",
            }}>
              Welcome! Please register to create an account
            </Text>
          </View>
          <View style={{
            marginVertical: Spacing * 3,
          }}>
            <InputText placeholder='example@example.com' />
            <InputText placeholder='Username' />
            <InputText placeholder='Password' secureTextEntry/>
            
          </View>
          <TouchableOpacity
            onPress={() => navigate("Home")} 
            
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.blue,
              borderRadius: 10,
              marginVertical: Spacing,

              shadowColor: Colors.blue,
              shadowOffset: { width: 0, height: Spacing },
              shadowOpacity: 0.5,
              shadowRadius: Spacing,

              elevation: 5, // For Android
          }}>
            <Text style={{
              color: Colors.light,
              textAlign: "center",
              fontSize: FontSize.large,
              fontWeight: "bold",
            }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default RegisterScreen