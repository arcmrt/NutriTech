import React, { useState } from 'react';
import { View, Text, ImageBackground, Dimensions, TouchableOpacity, Alert,ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacing from '@/constants/Spacing';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import Colors from '@/constants/colors/Colors';
import FontSize from '@/constants/FontSize';
import InputText from '@/components/InputText';
import { signUp } from 'aws-amplify/auth';

const { height } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !username || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);

    try {
      setError('');
      const { userId, nextStep } = await signUp({
        username: email,
        password,
        options:{
          userAttributes:{
            email,
            name: username,
          },
          
          
        }

      });
      setLoading(false);
      if(nextStep){
        navigate("VerifyScreen", { username:email });
      }

    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <SafeAreaView>
      <View style={{ padding: Spacing * 2 }}>
        <ImageBackground
          style={{
            height: height / 4,
            marginVertical: Spacing * 2,
          }}
          resizeMode="contain"
          source={require("../assets/images/adaptive-icon.png")}
        />
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{
            paddingVertical: Spacing * 1.2,
            paddingHorizontal: Spacing * 1.2,
            fontWeight: "bold",
            marginVertical: Spacing,
            color: Colors.blue,
            borderRadius: 10,
            fontSize: FontSize.xxLarge,
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
        <View style={{ marginVertical: Spacing * 3 }}>
          <InputText value={email} autoCapitalize= "none" onChangeText={setEmail} placeholder='example@example.com'/>
          <InputText value={username} autoCapitalize= "none" onChangeText={setUsername} placeholder='Username' />
          <InputText value={password} autoCapitalize= "none" onChangeText={setPassword} placeholder='Password' secureTextEntry/>
        </View>
        {error ? <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text> : null}
        {loading ? (
          <ActivityIndicator size="large" color={Colors.blue} />
        ) : ( 
          <TouchableOpacity
            onPress={handleSignUp}
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.blue,
              borderRadius: 10,
              marginVertical: Spacing,
              shadowColor: Colors.blue,
              shadowOffset: { width: 0, height: Spacing },
              shadowOpacity: 0.5,
              shadowRadius: Spacing,
              elevation: 5,
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
        )}
      </View>
    </SafeAreaView>
  );
}

export default RegisterScreen;
