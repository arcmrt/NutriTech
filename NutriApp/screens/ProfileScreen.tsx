import React, { useEffect, useState } from "react";
import { View, Dimensions, ImageBackground, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Spacing from "@/constants/Spacing";
import { RootStackParamList } from "@/types";
import Colors from "@/constants/colors/Colors";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";  // Correct import

const { height } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const ProfileScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [username, setUsername] = useState('');

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

  return (
    <SafeAreaView>
      <View style={{ padding: Spacing * 2 }}>
        <View 
          style={{
            borderWidth: 1,
            width: height / 2.3,
            height: height / 4,
            borderRadius: 20,
            borderColor: Colors.gray,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // for android
            backgroundColor: 'white',
            justifyContent: 'center', 
            alignItems: 'center', 
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <ImageBackground
              style={{
                height: height / 8,
                width: height / 8,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                overflow: 'hidden',
              }}
              resizeMode="cover"
              source={require('../assets/images/profile1.png')}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: Spacing * 1,
              }}
            >
              {username}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigate("Settings")} 
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
              resizeMode="cover" 
              source={require('../assets/images/profile2.png')}
            />
            <Text 
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: Spacing,
              }}>
              Settings
            </Text>
            <Text 
              style={{
                fontSize: 20,
                marginLeft: 'auto',  
              }}>
              {">"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("VitalsForm",{username: username})} 
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
              resizeMode="cover" 
              source={require('../assets/images/profile2.png')}
            />
            <Text 
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: Spacing,
              }}>
              User Vitals
            </Text>
            <Text 
              style={{
                fontSize: 20,
                marginLeft: 'auto',  
              }}>
              {">"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
