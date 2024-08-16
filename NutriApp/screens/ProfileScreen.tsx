import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Spacing from "@/constants/Spacing";
import { RootStackParamList } from "@/types";
import Colors from "@/constants/colors/Colors";
import { getCurrentUser, fetchUserAttributes, signOut } from "aws-amplify/auth";  // Correct import
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
;

import { UserProfile } from "@/profileClass/profile";

const { height } = Dimensions.get("window");


type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const ProfileScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [username, setUsername] = useState('');
  const [info, setInfo] = useState<any>(null);

  const navigation = useNavigation();

  const BG_IMAGE= "https://images.pexels.com/photos/5745754/pexels-photo-5745754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

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
    const fetchData = async () => {
        if (username) {
            const userProfile = new UserProfile();
            await userProfile.fetchProfile(username);
            const profile = await userProfile.getProfile();
            setInfo(profile);
            console.log('User profile in profile page:', profile);
        }
    };
    fetchData();
  }, [username]);
  

  async function handleSignOut() {
    try {
      await signOut();
      console.log('sign out success');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  const handleLogoutPress = (e: any) => {
    handleSignOut();
    e.preventDefault();
    navigation.navigate('Welcome');
  };

  const renderDietaryPins = () => {
    if (info && info.diet && Array.isArray(info.diet)) {
      const dietaryPreferences = info.diet.flat().filter((preference: any) => preference);
      return dietaryPreferences.map((preference: string, index: number) => (
        <View key={index} style={styles.dietaryPin}>
          {getDietaryIcon(preference)}
          <Text style={styles.dietaryPinText}>{preference}</Text>
        </View>
      ));
    }
    return null;
  };
  

  const getDietaryIcon = (preference: string) => {
    switch (preference.toLowerCase()) {
      case 'vegan':
        return <MaterialCommunityIcons name="leaf" size={20} color="white" />;
      case 'gluten-free':
        return <MaterialCommunityIcons name="wheat" size={20} color="white" />;
      default:
        return <Ionicons name="help-circle-outline" size={20} color="white" />;
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
          <View>
            <Ionicons
              name="person-circle-outline"
              size={height / 8}
              color={Colors.textGray}
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
            <View style={styles.dietaryPinsContainer}>
              {renderDietaryPins()}
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigate("Updating Vitals", { username: username })}
            style={{
              flexDirection: "row",
              marginTop: Spacing * 2,
              borderColor: Colors.gray,
            }}
          >
            <Ionicons
              name="pulse-outline"
              size={25}
              color={Colors.textGray}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: Spacing,
              }}
            >
              User Vitals
            </Text>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 'auto',
              }}
            >
              {">"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogoutPress}
            style={{
              flexDirection: "row",
              marginTop: Spacing * 2,
              borderColor: Colors.gray,
            }}
          >
            <Ionicons
              name="log-out-outline"
              size={25}
              color={Colors.textGray}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: Spacing,
              }}
            >
              Log Out
            </Text>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 'auto',
              }}
            >
              {">"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = {
  container: {
    paddingTop: Spacing * 2,
    flex: 1,
    padding: Spacing * 1.2,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing * 2,
  },
  dietaryPinsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: Spacing * 2,
    marginBottom: Spacing * 3,
  },
  dietaryPin: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing,
    borderRadius: 20,
    backgroundColor: Colors.textGray,
    margin:Spacing / 100,
    
  },
  dietaryPinText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: Spacing / 2,
  },
};





export default ProfileScreen;
