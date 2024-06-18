import { View,
         Text,
         TextInput,
         TouchableOpacity,
         ImageBackground,
         Dimensions,
         
            } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import Spacing from '@/constants/Spacing';
import FontSize from '@/constants/FontSize';
import Colors from '@/constants/colors/Colors';
import InputText from '@/components/InputText';

const {height} = Dimensions.get("window");
type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen:React.FC<Props> = ({navigation: {navigate}}) => {
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
              marginVertical: Spacing * 3,
              color: Colors.blue,
              borderRadius: 10,
              
            }}>Login Below</Text>
            <Text style={{
              fontSize: FontSize.large,
              fontWeight: "bold",
              width: "85%",
              textAlign: "center",
            }}>
              Welcome Back! Please login to your account
            </Text>
          </View>
          <View style={{
            marginVertical: Spacing * 3,
          }}>
            <InputText placeholder='example@example.com' />
            <InputText placeholder='Password' secureTextEntry/>
            
          </View>
          <View>
            <Text style={{
              fontFamily: "Roboto",
              fontSize: FontSize.small,
              color: Colors.darkblue,
              alignSelf: "flex-end",

            }}>
              Forgot password?
            </Text>
          </View>
            <TouchableOpacity
              onPress={() => navigate("Home")} 
              
              style={{
                padding: Spacing * 2,
                backgroundColor: Colors.blue,
                borderRadius: 10,
                marginVertical: Spacing * 2,

                shadowColor: Colors.blue,
                shadowOffset: { width: 0, height: Spacing },
                shadowOpacity: 0.5,
                shadowRadius: Spacing,
            }}>
              <Text style={{
                color: Colors.light,
                textAlign: "center",
                fontSize: FontSize.large,
                fontWeight: "bold",
              }}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => navigate("Register")}
              style={{
              padding: Spacing,
              borderRadius: 10,
              marginVertical: Spacing,

              shadowColor: Colors.blue,
              shadowOffset: { width: 0, height: Spacing },
              shadowOpacity: 0.5,
              shadowRadius: Spacing,
            }}>
              <Text style={{
                color: Colors.text,
                textAlign: "center",
                fontSize: FontSize.small,
                fontWeight: "bold",
              }}>
                Create new account
              </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default LoginScreen